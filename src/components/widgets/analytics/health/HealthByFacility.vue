<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">{{ title }}</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            <stacked-bar-chart
              ref="chart"
              :labels="labels"
              yAxisLabel=""
              :datasets="datasets"
              colorScheme="office.Apex6"
              :chartOptions="chartOptions"
            ></stacked-bar-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import {
  startOfMonth,
  getDaysInMonth,
  format,
  addDays,
  getISODay,
  subDays,
  getYear,
  isBefore,
  parse,
} from 'date-fns';
import MutationTypes from '@/state/mutation-types';
import StackedBarChart from '@/components/widgets/charts/StackedBarChart';
import colors from 'vuetify/es5/util/colors';
import _ from 'lodash';

export default {
  name: 'health-by-facility',
  props: {
    title: {
      type: String,
      required: false,
      default: 'SUMMARY',
    },
  },
  components: {
    StackedBarChart,
  },
  data() {
    return {
      noFloors: 5,
      floorTemplate: {
        label: 'Floor ',
        data: [],
        type: 'bar',
        pointRadius: 1,
        fill: false,
        lineTension: 0.4,
        borderWidth: 2,
      },
      labels: [],
      datasets: [],
      chartOptions: {
        // legend: {
        //   labels: {
        //     generateLabels: function(a,b,c) {
        //       console.dir(a);
        //       console.dir(b);
        //       console.dir(c);
        //     },
        //   },
        // },
      },
    };
  },
  mounted() {
    this.refreshData();
  },
  watch: {
    range(newRange, oldRange) {
      this.$refs.chart.refresh({
        labels: this.labels,
        datasets: this.datasets,
      });
    },
  },
  computed: {
    range: {
      get() {
        return this.$store.getters.analyticsDateRange;
      },
      set(range) {
        this.$store.commit(MutationTypes.SET_ANALYTICS_DATE_RANGE, range);
      },
    },
  },
  methods: {
    refreshData() {
      // Change labels
      this.labels = this.generateLabels();
      // Change data
      this.datasets = this.generateDataSets();
      this.$refs.chart.refresh({
        labels: this.labels,
        datasets: this.datasets,
      });
    },
    onDateRangeChange(range) {
      this.range = range;
      this.refreshData();
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomBar(date, lastClose) {
      const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
      const close = this.randomNumber(open * 0.95, open * 1.05).toFixed(2);
      return {
        t: date.getTime(),
        y: close,
      };
    },
    generateLabels() {
      const start = parse(this.range.start);
      const end = parse(this.range.end);
      let currentDate = start;
      const data = [format(currentDate, 'MM/DD/YYYY')];
      while (isBefore(currentDate, end)) {
        currentDate = addDays(currentDate, 1);
        data.push(format(currentDate, 'MM/DD/YYYY'));
      }

      return data;
    },
    generateDataSets() {
      const types = [
        { label: 'Functioning', median: '360', color: colors.green },
        { label: 'Failed', median: '10', color: colors.red },
      ];
      const data = [];
      for (const type of types) {
        const lbl = type.label;
        const { median } = type;
        for (let index = 0; index < this.noFloors; index += 1) {
          const floor = `Floor ${index + 1}`;
          const clrKey = `lighten${index + 1}`;
          const clr = type.color[clrKey];
          const op = _.assign({}, this.floorTemplate);
          op.label = `${lbl}: ${floor}`;
          op.data = this.generateData(median);
          op.backgroundColor = clr;
          op.stack = floor;
          data.push(op);
        }
      }
      return data;
    },
    generateData(median) {
      const start = parse(this.range.start);
      const end = parse(this.range.end);
      let currentDate = start;
      const data = [this.randomBar(currentDate, median)];
      while (isBefore(currentDate, end)) {
        currentDate = addDays(currentDate, 1);
        data.push(this.randomBar(currentDate, data[data.length - 1].y));
      }

      return data;
    },
  },
};
</script>

<style lang="css" scoped></style>

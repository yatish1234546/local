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
            <line-chart
              ref="chart"
              :labels="labels"
              yAxisLabel="kWH"
              :datasets="datasets"
              colorScheme="office.Headlines6"
            ></line-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';
import _ from 'lodash';
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
import LineChart from '@/components/widgets/charts/LineChart';

export default {
  name: 'savings-by-facility',
  components: {
    LineChart,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'SUMMARY',
    },
  },
  data() {
    return {
      noFloors: 5,
      floorTemplate: {
        label: 'Floor 3',
        data: [],
        type: 'line',
        pointRadius: 1,
        fill: false,
        lineTension: 0.4,
        borderWidth: 2,
      },
      labels: [],
      datasets: [],
    };
  },
  watch: {
    range(newRange, oldRange) {
      this.onDateRangeChange(newRange);
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
  mounted() {
    // get labels
    this.labels = this.generateLabels();
    // get data
    this.datasets = this.generateDataSets();
    this.$refs.chart.refresh({
      labels: this.labels,
      datasets: this.datasets,
    });
  },
  methods: {
    onDateRangeChange(range) {
      this.range = range;
      // Change labels
      this.labels = this.generateLabels();
      // Change data
      this.datasets = this.generateDataSets();
      this.$refs.chart.refresh({
        labels: this.labels,
        datasets: this.datasets,
      });
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
      const data = [];
      for (let index = 0; index < this.noFloors; index += 1) {
        const val = _.assign({}, this.floorTemplate);
        val.label = `Floor ${index + 1}`;
        val.data = this.generateData();

        data.push(val);
      }
      return data;
    },
    generateData() {
      const start = parse(this.range.start);
      const end = parse(this.range.end);
      let currentDate = start;
      const data = [this.randomBar(currentDate, 800)];
      while (isBefore(currentDate, end)) {
        currentDate = addDays(currentDate, 1);
        data.push(this.randomBar(currentDate, data[data.length - 1].y));
      }

      return data;
    },
  },
};
</script>

<style lang="stylus" scoped>
.active
  color: var(--v-secondary-base)
.v-text-field input
  font-size: 0.8em
</style>

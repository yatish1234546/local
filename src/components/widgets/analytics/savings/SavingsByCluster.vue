<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-icon class="pr-2" @click="switchType('pie')" v-bind:class="{ active: isPieChart }">
            fas fa-chart-pie
          </v-icon>
          <v-icon @click="switchType('bar')" v-bind:class="{ active: isBarChart }">
            fas fa-chart-bar
          </v-icon>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            <pie-chart
              ref="pie"
              v-if="isPieChart"
              :labels="labels"
              :datasets="datasets"
              colorScheme="office.Grid6"
            ></pie-chart>
            <bar-chart
              ref="bar"
              v-if="isBarChart"
              :labels="labels"
              :datasets="datasets"
              :yTicks="yTicks"
              colorScheme="office.Grid6"
            ></bar-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';
import { format, subDays } from 'date-fns';
import PieChart from '@/components/widgets/charts/PieChart';
import BarChart from '@/components/widgets/charts/BarChart';

export default {
  name: 'savings-by-cluster',
  props: {
    title: {
      type: String,
      required: false,
      default: 'BY CLUSTER',
    },
    chartType: {
      type: String,
      required: false,
      default: 'bar',
    },
  },
  components: {
    PieChart,
    BarChart,
  },
  data() {
    return {
      currentChartType: this.chartType,
      clusters: ['C0', 'C1', 'C2'],
    };
  },
  watch: {
    range(newRange, oldRange) {
      this.$refs[this.currentChartType].refresh({
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
    isBarChart() {
      return this.currentChartType === 'bar';
    },
    isPieChart() {
      return this.currentChartType === 'pie';
    },
    labels() {
      return ['C0', 'C1', 'C2'];
    },
    datasets() {
      const df = 'MM-DD-YYYY';
      const startDate = format(subDays(new Date(), 7), df);
      const endDate = format(subDays(new Date(), 1), df);
      const lbl = `Savings (kWH, ${startDate} - ${endDate})`;
      return [
        {
          borderWidth: 2,
          data: [40, 20, 80],
          label: lbl,
        },
      ];
    },
    yTicks() {
      let min = Number.NEGATIVE_INFINITY;
      let max = Number.POSITIVE_INFINITY;
      for (const dataset of this.datasets) {
        min = this.min(dataset.data);
        max = this.max(dataset.data);
      }

      const step = 10;
      const minVal = min - step;
      const maxVal = max - step;
      // TODO Need to figure out a way to calculate step size
      return { min: minVal, max: maxVal, stepSize: step };
    },
  },
  methods: {
    switchType(ct) {
      this.currentChartType = ct;
    },
    min(data) {
      return data.reduce((min, v) => (v < min ? v : min), data[0]);
    },
    max(data) {
      return data.reduce((max, v) => (v > max ? v : max), data[0]);
    },
  },
};
</script>

<style lang="stylus" scoped>
.active
  color: var(--v-secondary-base)
</style>

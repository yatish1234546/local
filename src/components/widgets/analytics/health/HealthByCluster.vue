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
            <stacked-bar-chart
              ref="bar"
              v-if="isBarChart"
              :labels="labels"
              :datasets="datasets"
              colorScheme="office.Integral6"
            ></stacked-bar-chart>
            <doughnut-chart
              ref="pie"
              v-if="isPieChart"
              :labels="labels"
              :datasets="datasets"
              colorScheme="office.Integral6"
            ></doughnut-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';
import StackedBarChart from '@/components/widgets/charts/StackedBarChart';
import DoughnutChart from '@/components/widgets/charts/DoughnutChart';

export default {
  name: 'health-by-floor',
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
  data() {
    return {
      currentChartType: this.chartType,
    };
  },
  components: {
    StackedBarChart,
    DoughnutChart,
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
      return ['C1', 'C2', 'C3'];
    },
    datasets() {
      return [
        {
          label: 'Functioning',
          data: [243, 231, 240],
        },
        {
          label: 'Failed',
          data: [15, 18, 10],
        },
      ];
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

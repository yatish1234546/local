<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-icon class="pr-2" @click="switchType('line')" v-bind:class="{ active: isLineChart }">
            fas fa-chart-area
          </v-icon>
          <v-icon class="pr-2" @click="switchType('pie')" v-bind:class="{ active: isPieChart }">
            fas fa-chart-pie
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
              colorScheme="office.Organic6"
            ></pie-chart>
            <line-chart
              ref="line"
              v-if="isLineChart"
              :labels="labels"
              :datasets="datasets"
              colorScheme="office.Organic6"
            ></line-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';
import PieChart from '@/components/widgets/charts/PieChart';
import LineChart from '@/components/widgets/charts/LineChart';

export default {
  name: 'consumption-by-floor',
  props: {
    title: {
      type: String,
      required: false,
      default: 'BY FLOOR',
    },
    chartType: {
      type: String,
      required: false,
      default: 'line',
    },
  },
  components: {
    PieChart,
    LineChart,
  },
  data() {
    return {
      currentChartType: this.chartType,
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
    isPieChart() {
      return this.currentChartType === 'pie';
    },
    isLineChart() {
      return this.currentChartType === 'line';
    },
    labels() {
      return ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];
    },
    datasets() {
      return [
        {
          label: 'Consumption',
          data: [243, 231, 240, 220, 245],
        },
      ];
    },
  },
  methods: {
    switchType(ct) {
      this.currentChartType = ct;
    },
  },
};
</script>

<style lang="stylus" scoped>
.active
  color: var(--v-secondary-base)
</style>

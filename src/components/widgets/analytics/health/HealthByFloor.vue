<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">{{title}}</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            <bar-chart :labels="labels" :datasets="datasets"></bar-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import BarChart from '@/components/widgets/charts/BarChart';

export default {
  name: 'health-by-floor',
  props: {
    title: {
      type: String,
      required: false,
      default: 'BY FLOOR',
    },
  },
  components: {
    BarChart,
  },
  computed: {
    labels() {
      return ['Floor 1', 'Floor 2', 'Floor 3'];
    },
    datasets() {
      return [
        {
          label: 'Savings',
          backgroundColor: '#00CCFF',
          data: [243, 231, 240],
        },
      ];
    },
  },
};
</script>

<style lang="css" scoped></style>

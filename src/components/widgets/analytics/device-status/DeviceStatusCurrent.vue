<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">CURRENT DEVICE STATUS</span>
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
import BarChart from '@/components/widgets/charts/StackedBarChart';

export default {
  name: 'current-device-status',
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
          label: 'Functioning',
          backgroundColor: 'rgb(75, 192, 192)',
          data: [243, 231, 240],
        },
        {
          label: 'Failed LED',
          backgroundColor: 'rgb(255, 99, 132)',
          data: [10, 7, 12],
        },
        {
          label: 'Failed Motion Sensors',
          backgroundColor: 'rgb(220, 30, 130)',
          data: [0, 5, 0],
        },
      ];
    },
  },
};
</script>

<style lang="css" scoped></style>

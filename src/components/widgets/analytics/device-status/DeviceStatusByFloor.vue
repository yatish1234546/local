<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">DEVICE STATUS BY FLOOR</span>
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
  name: 'device-status-by-floor',
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
          backgroundColor: '#00CCFF',
          data: [243, 231, 240],
        },
        {
          label: 'Failed',
          backgroundColor: '#CC00FF',
          data: [10, 7, 12],
        },
        {
          label: 'No. Devices',
          backgroundColor: '#FFC0C0',
          data: [253, 238, 252],
        },
      ];
    },
  },
};
</script>

<style lang="css" scoped></style>

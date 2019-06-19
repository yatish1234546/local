<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">CONSUMPTION</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            <line-chart :labels="labels" :datasets="datasets"></line-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import LineChart from './charts/LineChart';

export default {
  name: 'widget-energy-consumption',
  components: {
    LineChart,
  },
  computed: {
    labels() {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    },
    datasets() {
      return [
        {
          label: 'Data One',
          borderColor: '#FC2525',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: [40, 39, 10, 40, 39, 80, 40],
        }, {
          label: 'Data Two',
          borderColor: '#05CBE1',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [60, 55, 32, 10, 2, 12, 53],
        },
      ];
    },
  },
};
</script>

<style lang="stylus"></style>

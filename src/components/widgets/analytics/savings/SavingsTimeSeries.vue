<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">SAVINGS</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            <time-series-chart
              ref="chart"
              :labels="labels"
              :datasets="datasets"
              yAxisLabel="Savings (kWH)"
              colorScheme="office.Badge6"
            ></time-series-chart>
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import {
  startOfMonth, getDaysInMonth, format, addDays, getISODay, subDays, getYear, isBefore,
} from 'date-fns';
import TimeSeriesChart from '@/components/widgets/charts/TimeSeriesChart';

export default {
  name: 'widget-savings-timeseries',
  components: {
    TimeSeriesChart,
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null,
      dateFormat: 'MMMM DD YYYY',
    };
  },
  created() {},
  mounted() {},
  methods: {
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
    generateData() {
      const today = new Date();
      const year = getYear(today);
      const firstDay = new Date(year, 1, 1);
      const yesterday = subDays(today, 1);
      let currentDate = firstDay;
      const data = [this.randomBar(currentDate, 1500)];
      while (isBefore(currentDate, yesterday)) {
        const isoDay = getISODay(currentDate);
        if (isoDay <= 5) {
          data.push(this.randomBar(currentDate, data[data.length - 1].y));
        }
        currentDate = addDays(currentDate, 1);
      }

      return data;
    },
  },
  computed: {
    labels() {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    },
    datasets() {
      return [
        {
          label: 'Floor 1',
          // backgroundColor: '#FC2525',
          // borderColor: '#FC2525',
          data: this.generateData(),
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0.4,
          borderWidth: 2,
        },
        {
          label: 'Floor 2',
          // backgroundColor: '#05CBE1',
          // borderColor: '#05CBE1',
          data: this.generateData(),
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0.4,
          borderWidth: 2,
        },
        {
          label: 'Floor 3',
          // backgroundColor: '#FFA726',
          // borderColor: '#FFA726',
          data: this.generateData(),
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0.4,
          borderWidth: 2,
        },
      ];
    },
  },
};
</script>

<style lang="stylus"></style>

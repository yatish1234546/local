<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">THREADS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <span><span>Runnable</span> {{ threadStats.threadDumpRunnable }}</span>
        <v-progress-linear color="success" v-model="runnableStats"></v-progress-linear>

        <span><span>Timed Waiting</span> ({{ threadStats.threadDumpTimedWaiting }})</span>
        <v-progress-linear color="success" v-model="timedWaitingStats"></v-progress-linear>

        <span><span>Waiting</span> ({{ threadStats.threadDumpWaiting }})</span>
        <v-progress-linear color="success" v-model="dumpWaitingStats"></v-progress-linear>

        <span><span>Blocked</span> ({{ threadStats.threadDumpBlocked }})</span>
        <v-progress-linear color="success" v-model="dumpBlockedStats"></v-progress-linear>

        <span
          >Total: {{ threadStats.threadDumpAll }}
          <a class="hand" data-toggle="modal" v-on:click="openModal()" data-target="#threadDump">
            <v-icon>fas fa-eye</v-icon>
          </a>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-threads',
  props: {
    updatingMetrics: {
      type: Boolean,
      required: false,
      default: false,
    },
    threadStats: Object,
  },
  computed: {
    runnableStats() {
      return (this.threadStats.threadDumpRunnable * 100) / this.threadStats.threadDumpAll;
    },
    timedWaitingStats() {
      return (this.threadStats.threadDumpTimedWaiting * 100) / this.threadStats.threadDumpAll;
    },
    dumpWaitingStats() {
      return this.formatNumber1(
        (this.threadStats.threadDumpWaiting * 100) / this.threadStats.threadDumpAll,
      );
    },
    dumpBlockedStats() {
      return this.formatNumber1(
        (this.threadStats.threadDumpBlocked * 100) / this.threadStats.threadDumpAll,
      );
    },
  },
  methods: {
    isObjectExisting(metrics, key) {
      return metrics && metrics[key];
    },
    isObjectExistingAndNotEmpty(metrics, key) {
      return this.isObjectExisting(metrics, key) && JSON.stringify(metrics[key]) !== '{}';
    },
    convertMillisecondsToDuration(ms) {
      const times = {
        year: 31557600000,
        month: 2629746000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000,
      };
      let timeString = '';
      let plural = '';
      for (const key in times) {
        if (Math.floor(ms / times[key]) > 0) {
          if (Math.floor(ms / times[key]) > 1) {
            plural = 's';
          } else {
            plural = '';
          }
          timeString += `${Math.floor(ms / times[key]).toString()} ${key.toString()}${plural} `;
          ms -= times[key] * Math.floor(ms / times[key]);
        }
      }
      return timeString;
    },
    filterNaN(input) {
      if (Number.isNaN(input)) {
        return 0;
      }
      return input;
    },
    formatNumber1(value) {
      return numeral(value).format('0,0');
    },
    formatNumber2(value) {
      return numeral(value).format('0,00');
    },
  },
};
</script>

<style lang="css" scoped></style>

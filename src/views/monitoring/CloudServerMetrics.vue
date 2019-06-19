<template lang="html">
  <v-container fluid class="pa-2">
    <v-layout row wrap>
      <v-flex xs1 sm4 md4 lg4 xl4>
        <memory
          v-if="!updatingMetrics"
          :metrics="metrics"
          :updatingMetrics="updatingMetrics"
        ></memory>
      </v-flex>
      <v-flex xs1 sm4 md4 lg4 xl4>
        <threads
          v-if="!updatingMetrics"
          :threadStats="threadStats"
          :updatingMetrics="updatingMetrics"
        ></threads>
      </v-flex>
      <v-flex xs1 sm4 md4 lg4 xl4>
        <system
          v-if="!updatingMetrics"
          :metrics="metrics"
          :updatingMetrics="updatingMetrics"
        ></system>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <gc-stats
          v-if="!updatingMetrics && isObjectExisting(metrics, 'garbageCollector')"
          :metrics="metrics"
          :updatingMetrics="updatingMetrics"
        ></gc-stats>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <http-requests :metrics="metrics" :updatingMetrics="updatingMetrics"></http-requests>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <endpoint-requests
          :metrics="metrics"
          :updatingMetrics="updatingMetrics"
        ></endpoint-requests>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <cache-stats :metrics="metrics" :updatingMetrics="updatingMetrics"></cache-stats>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <data-source-stats
          :metrics="metrics"
          :updatingMetrics="updatingMetrics"
        ></data-source-stats>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import numeral from 'numeral';
import MutationTypes from '@/state/mutation-types';
import Memory from '@/components/jvm-metrics/Memory.vue';
import Threads from '@/components/jvm-metrics/Threads.vue';
import System from '@/components/jvm-metrics/System.vue';
import GcStats from '@/components/jvm-metrics/GarbageCollectorStats.vue';
import HttpRequests from '@/components/jvm-metrics/HttpRequests.vue';
import EndpointRequests from '@/components/jvm-metrics/EndpointRequests.vue';
import CacheStats from '@/components/jvm-metrics/CacheStats.vue';
import DataSourceStats from '@/components/jvm-metrics/DataSourceStats.vue';

export default {
  name: 'cloud-server-metrics',
  components: {
    Memory,
    Threads,
    System,
    GcStats,
    HttpRequests,
    EndpointRequests,
    CacheStats,
    DataSourceStats,
  },
  data() {
    return {
      updatingMetrics: false,
    };
  },
  computed: {
    metrics() {
      return this.$store.getters.metrics.metrics;
    },
    threadStats() {
      return this.$store.getters.metrics.threadDump;
    },
  },
  mounted() {
    this.$store.dispatch(MutationTypes.RETRIEVE_JVM_METRICS);
    this.$store.dispatch(MutationTypes.RETRIEVE_THREAD_DUMP);
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

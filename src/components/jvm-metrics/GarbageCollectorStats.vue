<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">GARBAGE COLLECTOR STATS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <div class="row" v-if="!updatingMetrics && isObjectExisting(metrics, 'garbageCollector')">
          <div class="col-md-4">
            <div>
              <span>
                GC Live Data Size/GC Max Data Size ({{
                  formatNumber1(metrics.garbageCollector['jvm.gc.live.data.size'] / 1048576)
                }}M /
                {{ formatNumber1(metrics.garbageCollector['jvm.gc.max.data.size'] / 1048576) }}M)
              </span>
              <v-progress-linear :value="gcLiveData"></v-progress-linear>
            </div>
          </div>
          <div class="col-md-4">
            <div>
              <span>
                GC Memory Promoted/GC Memory Allocated ({{
                  formatNumber1(metrics.garbageCollector['jvm.gc.memory.promoted'] / 1048576)
                }}M /
                {{ formatNumber1(metrics.garbageCollector['jvm.gc.memory.allocated'] / 1048576) }}M)
              </span>
              <v-progress-linear :value="gcPromoted"></v-progress-linear>
            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-9">Classes loaded</div>
              <div class="col-md-3 text-right">{{ metrics.garbageCollector.classesLoaded }}</div>
            </div>
            <div class="row">
              <div class="col-md-9">Classes unloaded</div>
              <div class="col-md-3 text-right">{{ metrics.garbageCollector.classesUnloaded }}</div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped" width="100%">
              <thead>
                <tr>
                  <th></th>
                  <th align="left">Count</th>
                  <th align="left">Mean</th>
                  <th align="left">Mean</th>
                  <th align="left">Min</th>
                  <th align="left">p50</th>
                  <th align="left">p75</th>
                  <th align="left">p95</th>
                  <th align="left">p99</th>
                  <th align="left">Max</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>jvm.gc.pause</td>
                  <td>{{ metrics.garbageCollector['jvm.gc.pause'].count }}</td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause'].mean) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause']['0.0']) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause']['0.5']) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause']['0.75']) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause']['0.95']) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause']['0.99']) }}
                  </td>
                  <td>
                    {{ formatNumber2(metrics.garbageCollector['jvm.gc.pause'].max) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-gc-stats',
  props: {
    updatingMetrics: {
      type: Boolean,
      required: false,
      default: false,
    },
    metrics: Object,
  },
  computed: {
    gcLiveData() {
      return (
        (this.metrics.garbageCollector['jvm.gc.live.data.size'] * 100)
        / this.metrics.garbageCollector['jvm.gc.max.data.size']
      );
    },
    gcPromoted() {
      return (
        (100 * this.metrics.garbageCollector['jvm.gc.memory.promoted'])
        / this.metrics.garbageCollector['jvm.gc.memory.allocated']
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

<style lang="css" scoped>
.table-responsive, .table .table-striped {
  width: 100%;
}
</style>

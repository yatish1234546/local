<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">SYSTEM</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text v-if="loaded">
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-4">Uptime</div>
          <div class="col-md-8 text-right">
            {{ processUptime }}
          </div>
        </div>
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-4">Start time</div>
          <div class="col-md-8 text-right">
            {{ metrics.processMetrics['process.start.time'] | formatDate }}
          </div>
        </div>
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">Process CPU usage</div>
          <div class="col-md-3 text-right">
            {{ formatNumber2(100 * metrics.processMetrics['process.cpu.usage']) }} %
          </div>
        </div>
        <v-progress-linear
          value="100 * metrics.processMetrics['process.cpu.usage']"
        ></v-progress-linear>

        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">System CPU usage</div>
          <div class="col-md-3 text-right">
            {{ formatNumber2(100 * metrics.processMetrics['system.cpu.usage']) }} %
          </div>
        </div>
        <v-progress-linear
          value="100 * metrics.processMetrics['system.cpu.usage']"
        ></v-progress-linear>

        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">System CPU count</div>
          <div class="col-md-3 text-right">{{ metrics.processMetrics['system.cpu.count'] }}</div>
        </div>
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">System 1m Load average</div>
          <div class="col-md-3 text-right">
            {{ formatNumber2(metrics.processMetrics['system.load.average.1m']) }}
          </div>
        </div>
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">Process files max</div>
          <div class="col-md-3 text-right">
            {{ formatNumber1(metrics.processMetrics['process.files.max']) }}
          </div>
        </div>
        <div class="row" v-if="!updatingMetrics">
          <div class="col-md-9">Process files open</div>
          <div class="col-md-3 text-right">
            {{ formatNumber1(metrics.processMetrics['process.files.open']) }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-system',
  props: {
    updatingMetrics: {
      type: Boolean,
      required: false,
      default: false,
    },
    metrics: Object,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    setTimeout(this.setLoaded, 1000);
  },
  computed: {
    processUptime() {
      const ms = this.metrics.processMetrics['process.uptime'];
      const millis = this.convertMillisecondsToDuration(ms);
      return millis;
    },
  },
  methods: {
    setLoaded() {
      this.loaded = true;
    },
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

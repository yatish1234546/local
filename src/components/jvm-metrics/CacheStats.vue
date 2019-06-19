<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">CACHE STATS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="cacheData" hide-actions>
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.key }}</td>
              <td>{{ props.item.hits }}</td>
              <td>{{ props.item.misses }}</td>
              <td>{{ props.item.gets }}</td>
              <td>{{ props.item.puts }}</td>
              <td>{{ props.item.removals }}</td>
              <td>{{ props.item.evictions }}</td>
              <td>{{ props.item.hitPercent }}</td>
              <td>{{ props.item.missPercent }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-cache-stats',
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
      headers: [
        { text: 'Cache Name', sortable: false, value: '' },
        { text: 'Cache Hits', sortable: false, value: '' },
        { text: 'Cache Misses', sortable: false, value: '' },
        { text: 'Cache Gets', sortable: false, value: '' },
        { text: 'Cache Puts', sortable: false, value: '' },
        { text: 'Cache Removals', sortable: false, value: '' },
        { text: 'Cache Evictions', sortable: false, value: '' },
        { text: 'Cache Hit %', sortable: false, value: '' },
        { text: 'Cache Miss %', sortable: false, value: '' },
      ],
    };
  },
  computed: {
    cacheData() {
      const rows = [];
      if (this.metrics.cache) {
        Object.entries(this.metrics.cache).forEach((entry) => {
          const key = entry[0];
          const val = entry[1];
          const o = {};
          o.key = key;
          o.hits = val['cache.gets.hit'];
          o.misses = val['cache.gets.miss'];
          o.gets = val['cache.gets.hit'] + val['cache.gets.miss'];
          o.puts = val['cache.puts'];
          o.removals = val['cache.removals'];
          o.evictions = val['cache.evictions'];
          o.hitPercent = this.formatNumber2(
            this.filterNaN(
              (100 * val['cache.gets.hit']) / (val['cache.gets.hit'] + val['cache.gets.miss']),
            ),
          );
          o.missPercent = this.formatNumber2(
            this.filterNaN(
              (100 * val['cache.gets.miss']) / (val['cache.gets.hit'] + val['cache.gets.miss']),
            ),
          );
          rows.push(o);
        });
      }
      return rows;
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

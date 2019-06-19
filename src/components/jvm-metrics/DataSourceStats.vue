<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl v-if="metrics.databases && metrics.databases.length > 0">
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">DATASOURCE STATS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <div
          class="table-responsive"
          v-if="!updatingMetrics && isObjectExistingAndNotEmpty(metrics, 'databases')"
        >
          <table class="table table-striped">
            <thead>
              <tr>
                <th>
                  <span>Connection Pool Usage</span> (active: {{ metrics.databases.active.value }},
                  min: {{ metrics.databases.min.value }}, max: {{ metrics.databases.max.value }},
                  idle: {{ metrics.databases.idle.value }})
                </th>
                <th class="text-right">Count</th>
                <th class="text-right">Mean</th>
                <th class="text-right">Min</th>
                <th class="text-right">p50</th>
                <th class="text-right">p75</th>
                <th class="text-right">p95</th>
                <th class="text-right">p99</th>
                <th class="text-right">Max</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acquire</td>
                <td class="text-right">{{ metrics.databases.acquire.count }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.acquire.mean)) }}
                </td>
                <td class="text-right">{{ formatNumber2(metrics.databases.acquire['0.0']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.acquire['0.5']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.acquire['0.75']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.acquire['0.95']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.acquire['0.99']) }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.acquire.max)) }}
                </td>
              </tr>
              <tr>
                <td>Creation</td>
                <td class="text-right">{{ metrics.databases.creation.count }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.creation.mean)) }}
                </td>
                <td class="text-right">{{ formatNumber2(metrics.databases.creation['0.0']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.creation['0.5']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.creation['0.75']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.creation['0.95']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.creation['0.99']) }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.creation.max)) }}
                </td>
              </tr>
              <tr>
                <td>Usage</td>
                <td class="text-right">{{ metrics.databases.usage.count }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.usage.mean)) }}
                </td>
                <td class="text-right">{{ formatNumber2(metrics.databases.usage['0.0']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.usage['0.5']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.usage['0.75']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.usage['0.95']) }}</td>
                <td class="text-right">{{ formatNumber2(metrics.databases.usage['0.99']) }}</td>
                <td class="text-right">
                  {{ formatNumber2(filterNaN(metrics.databases.usage.max)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-datasource-stats',
  props: {
    updatingMetrics: {
      type: Boolean,
      required: false,
      default: false,
    },
    metrics: Object,
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

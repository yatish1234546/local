<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">HTTP REQUESTS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="requestsData" hide-actions>
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>
                <v-progress-linear color="success" :value="props.item.count"></v-progress-linear>
              </td>
              <td>{{ props.item.mean }}</td>
              <td>{{ props.item.max }}</td>
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
  name: 'widget-http-requests',
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
        { text: 'Code', align: 'left', value: '' },
        { text: 'Count', align: 'left', value: '' },
        { text: 'Mean', align: 'left', value: '' },
        { text: 'Max', align: 'left', value: '' },
      ],
    };
  },
  computed: {
    requestsData() {
      const requestsData = [];
      let count = 0;
      if (this.metrics['http.server.requests'] && this.metrics['http.server.requests'].percode) {
        Object.entries(this.metrics['http.server.requests'].percode).forEach((entry) => {
          count += 1;
          const key = entry[0];
          const val = entry[1];
          const o = {};
          o.code = key;
          o.count = val.count / this.metrics['http.server.requests'].all.count;
          o.mean = this.formatNumber2(this.filterNaN(val.mean));
          o.max = this.formatNumber2(val.max);
          requestsData.push(o);
        });
      }
      return requestsData;
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

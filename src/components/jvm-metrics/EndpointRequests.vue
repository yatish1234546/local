<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">ENDPOINT REQUESTS</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="rowData" hide-actions>
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.method }}</td>
              <td>{{ props.item.endpoint }}</td>
              <td>{{ props.item.count }}</td>
              <td>{{ props.item.mean }}</td>
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
  name: 'widget-endpoint-requests',
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
        { text: 'Method', sortable: false },
        { text: 'Endpoint', sortable: false },
        { text: 'Count', sortable: false },
        { text: 'Mean', sortable: false },
      ],
    };
  },
  computed: {
    rowData() {
      const rows = [];
      if (this.metrics.endpointsRequests) {
        Object.entries(this.metrics.endpointsRequests).forEach((entry) => {
          const key = entry[0];
          const val = entry[1];
          const o = {};
          Object.entries(val).forEach((methodEntry) => {
            const methodKey = methodEntry[0];
            const methodVal = methodEntry[1];
            o.method = methodKey;
            o.endpoint = key;
            o.count = methodVal.count;
            o.mean = this.formatNumber2(methodVal.mean);
          });
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

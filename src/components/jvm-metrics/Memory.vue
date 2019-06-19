<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-card color="grey lighten-4" width="100%">
      <v-toolbar flat>
        <span class="title secondary--text">MEMORY</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <div v-for="(entry, key) of metrics.jvm" :key="key">
            <span v-if="entry.max !== -1">
              <span>{{ key }}</span> ({{ formatNumber1(entry.used / 1048576) }}M /
              {{ formatNumber1(entry.max / 1048576) }}M)
            </span>
            <span v-else>
              <span>{{ key }}</span> {{ formatNumber1(entry.used / 1048576) }}M
            </span>
            <div>Committed : {{ formatNumber1(entry.committed / 1048576) }}M</div>
            <v-progress-linear color="success" v-model="entry.used"></v-progress-linear>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'widget-memory',
  props: {
    updatingMetrics: {
      type: Boolean,
      required: false,
      default: false,
    },
    metrics: Object,
  },
  methods: {
    formatNumber1(value) {
      return numeral(value).format('0,0');
    },
  },
};
</script>

<style lang="css" scoped></style>

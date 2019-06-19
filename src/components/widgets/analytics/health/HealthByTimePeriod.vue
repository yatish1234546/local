<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">{{title}}</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">

          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'health-by-time-period',
  props: {
    title: {
      type: String,
      required: false,
      default: 'BY TIME PERIOD',
    },
  },
};
</script>

<style lang="css" scoped>
</style>

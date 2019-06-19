<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-data-table :headers="headers" :items="healthData" class="elevation-1">
          <template v-slot:items="props">
            <td>
              <span class="text-capitalize">{{ baseName(props.item.name) }}</span>
              {{ subSystemName(props.item.name) }}
            </td>
            <td>
              <span class="badge" :class="badgeClass(props.item.status)">
                {{ props.item.status }}
              </span>
            </td>
            <td>
              <a v-on:click="showHealth(props.item)" v-if="props.item.details || props.item.error">
                <v-icon>fas fa-eye</v-icon>
              </a>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title color="primary">
          <span class="text-capitalize subheading">{{ currentHealth.name }}</span>
        </v-card-title>
        <v-card-text v-for="(value, key) in currentHealth.details" v-bind:key="key">
          <span class="text-capitalize mr-3">{{ key }}</span>
          <span>{{ value }}</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// Service Call to 'management/health'
/*
Response Format:

{
  "status":"UP",
  "details":{
    "diskSpace":{
      "status":"UP",
      "details":{
        "total":570693775360,
        "free":72485416960,
        "threshold":10485760
      }
    },
    "mongo":{
      "status":"UP",
      "details":{
        "version":"3.4.13"
      }
    }
  }
}

*/
import numeral from 'numeral';
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'health',
  data() {
    return {
      dialog: false,
      updatingHealth: false,
      currentHealth: { name: '', details: {} },
      headers: [
        { text: 'Service Name', value: '', sortable: true },
        { text: 'Status', value: '', sortable: true },
        { text: 'Details', value: '', sortable: false },
      ],
    };
  },
  computed: {
    healthData() {
      return [
        {
          name: 'Disk Space',
          status: 'UP',
          details: {
            total: 570693775360,
            free: 72485416960,
            threshold: 10485760,
          },
        },
        {
          name: 'Mongo DB',
          status: 'UP',
          details: {
            version: '3.4.13',
          },
        },
        {},
      ];
    },
  },
  methods: {
    refresh() {
      this.updatingHealth = true;
      this.$store
        .dispatch(MutationTypes.UPDATE_HEALTH)
        .then((response) => {
          this.healthData = response.data;
          this.updatingHealth = false;
        })
        .catch((error) => {
          if (error.status === 503) {
            this.healthData = error.error;
          }
          this.updatingHealth = false;
        });
    },
    baseName(name) {
      if (name) {
        const split = name.split('.');
        return split[0];
      }

      return '';
    },
    badgeClass(statusState) {
      if (statusState === 'UP') {
        return 'badge-success';
      }
      return 'badge-danger';
    },
    showHealth(health) {
      this.currentHealth = health;
      this.dialog = true;
    },
    subSystemName(name) {
      if (name) {
        const split = name.split('.');
        split.splice(0, 1);
        const remainder = split.join('.');
        return remainder ? ` - ${remainder}` : '';
      }

      return '';
    },
  },
};
</script>

<style lang="css" scoped></style>

<template lang="html">
  <v-container fluid class="pa-2">
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2">
        <v-card color="grey lighten-4">
          <v-card-title>
            <span class="title secondary--text">Clusters</span>
            <v-spacer></v-spacer>
            <v-btn> <v-icon>fas fa-file-export</v-icon> &nbsp;Export as Excel </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            light
            :headers="headers"
            :items="clusters"
            :expand="expand"
            item-key="email"
            class="custom"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.devices }}</td>
                <td class="text-xs-left">{{ props.item.floors }}</td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <v-card-text>
                  <div class="">
                    Location ID:
                  </div>
                  <div class="">
                    Location Name:
                  </div>
                  <div class="">
                    Location Path
                  </div>
                  <div class="">
                    Floor:
                  </div>
                  <div class="">
                    Room:
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'cluster-list-view',
  data() {
    return {
      valid: true,
      expand: false,
      saveLoading: false,
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20,
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Devices',
          align: 'left',
          sortable: false,
          value: 'devices',
        },
        {
          text: 'Floors',
          align: 'left',
          sortable: false,
          value: 'floors',
        },
      ],
    };
  },
  mounted() {
    // this.$store.dispatch(MutationTypes.RETRIEVE_USERS);
  },
  methods: {
    exportUsers() {},
    stringifyRoles(roles) {
      return roles.join(', ');
    },
  },

  computed: {
    clusters() {
      return [
        {
          name: 'cluster-1',
          devices: ['d1', 'd2', 'd5', 'd7'],
          floors: ['Floor 1'],
        },
        {
          name: 'cluster-2',
          devices: ['d3', 'd4', 'd8', 'd9'],
          floors: ['Floor 1', 'Floor 2'],
        },
      ];
    },
    roles() {
      return this.$store.getters.roles;
    },
    deviceStats() {
      const { users } = this;
      return {
        total: 0,
        rolesCount: {
          'System Admin': 0,
          'Facility Admin': 0,
          'Field Engg.': 0,
          'Support Engg.': 0,
          Executive: 0,
        },
      };
    },
  },
};
</script>

<style lang="css" scoped></style>

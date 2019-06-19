<template lang="html">
  <v-container fluid class="pa-2">
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <consumption-by-device></consumption-by-device>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <device-status-by-cluster></device-status-by-cluster>
      </v-flex>
      <!-- <v-flex xs12 sm4 md4 lg4 xl4>
        <devices-by-status></devices-by-status>
      </v-flex> -->
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2">
        <v-card color="grey lighten-4">
          <v-card-title>
            <span class="title secondary--text">Devices</span>
            <v-spacer></v-spacer>
            <v-btn>
              <v-icon>fas fa-file-export</v-icon> &nbsp;Export as Excel
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            light
            :headers="headers"
            :items="devices"
            :expand="expand"
            item-key="email"
            class="custom"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.model }}</td>
                <td class="text-xs-left">{{ props.item.type }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
                <td class="text-xs-left">{{ props.item.serialNo }}</td>
                <td class="text-xs-left">{{ props.item.vendor }}</td>
                <td class="text-xs-left">{{ props.item.hwVersion }}</td>
                <td class="text-xs-left">{{ props.item.swVersion }}</td>
                <td class="text-xs-left">{{ props.item.location }}</td>
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
import ConsumptionByDevice from '@/components/widgets/analytics/consumption/ConsumptionByDeviceType.vue';
import DeviceStatusByCluster from '@/components/widgets/analytics/device-status/DeviceStatusByCluster.vue';

export default {
  name: 'devices-list-view',
  components: {
    ConsumptionByDevice,
    DeviceStatusByCluster,
  },
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
          value: 'deviceName',
        },
        {
          text: 'Model',
          align: 'left',
          sortable: false,
          value: 'model',
        },
        {
          text: 'Type',
          align: 'left',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status',
        },
        {
          text: 'Serial No.',
          align: 'left',
          sortable: false,
          value: 'serialNo',
        },
        {
          text: 'Vendor',
          align: 'left',
          sortable: false,
          value: 'vendor',
        },
        {
          text: 'HW Version',
          align: 'left',
          sortable: false,
          value: 'hwVersion',
        },
        {
          text: 'SW Version',
          align: 'left',
          sortable: false,
          value: 'swVersion',
        },
        {
          text: 'Location',
          align: 'left',
          sortable: false,
          value: 'location',
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
    devices() {
      return [];
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

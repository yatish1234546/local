<template lang="html">
  <v-container fluid grid-list-xl>
    <v-layout row wrap class="pa-0">
      <v-flex xs12 class="pa-0">
        <p class="secondary--text caption">
          Refine your view. Displaying all by default.
        </p>
      </v-flex>
      <v-flex xs12 sm4 class="pa-1">
        <v-select
          v-model="selectedFloor"
          :items="floors"
          label="Floors"
          item-text="label"
          item-value="index"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 class="pa-1">
        <v-select
          v-model="selectedLocation"
          :items="filteredLocations"
          label="Locations"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 class="pa-1">
        <v-select
          v-model="selectedSwitch"
          :items="switches"
          label="PoE Switches"
          item-text="serialNo"
          item-value="serialNo"
        ></v-select>
      </v-flex>
    </v-layout>
    <p class="secondary--text caption">
      {{ this.selectedFloor }}
      Click on any switch to display its ports and properties. Click on any port to know its
      properties.
    </p>
    <div>
      <v-data-table
        :headers="headers"
        :items="switches"
        :expand="expand"
        item-key="serialNo"
        hide-actions
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.vendor }} {{ props.item.model }} {{ props.item.modelType }}</td>
            <td>{{ props.item.location.floorIndex }}</td>
            <td>{{ props.item.location.name }}</td>
            <td>{{ props.item.serialNo }}</td>
            <td>{{ getActivePorts(props.item.custom.portData) }}</td>
            <td>{{ getTotalConsumption(props.item.custom.portData) }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>
              <switch-view :portData="props.item.custom.portData"> </switch-view>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import _ from 'lodash';
import SwitchView from '@/components/PoESwitch.vue';
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'power-manager-view',
  data() {
    return {
      selectedFloor: -1,
      selectedLocation: -1,
      selectedSwitch: 'All Switches',
      locations: {},
      expand: false,
      headers: [
        { text: 'Switch', value: '' },
        { text: 'Floor', value: '' },
        { text: 'Location', value: '' },
        { text: 'Serial No.', value: '' },
        { text: 'Active Ports', value: '' },
        { text: 'Consumption by Ports', value: '' },
      ],
    };
  },
  components: {
    SwitchView,
  },
  mounted() {
    this.$store.dispatch(MutationTypes.RETRIEVE_FACILITY_INFO);
    this.$store.dispatch(MutationTypes.RETRIEVE_DEVICES).then((dvcs) => {
      this.locations = {};
      const devices = dvcs;
      devices.forEach((d) => {
        if (d.type === 'POE-Switch') {
          const { floorIndex } = d.location;
          const floorLocations = this.locations[floorIndex] || [];
          floorLocations.push(d.location);
          this.locations[floorIndex] = floorLocations;
        }
      });
    });
  },
  computed: {
    devices() {
      return this.$store.getters.devices;
    },
    floors() {
      return _.union([{ label: 'All Floors', index: -1 }], this.$store.getters.facility.floors);
    },
    filteredLocations() {
      let allLocations = [];
      if (this.selectedFloor === -1) {
        allLocations.push({ name: 'All Locations', id: -1 });
        for (const key of Object.keys(this.locations)) {
          const floorLocs = this.locations[key];
          allLocations = _.union(allLocations, floorLocs);
        }
        return allLocations;
      }
      allLocations.push({ name: 'All Locations', id: -1 });
      allLocations = _.union(allLocations, this.locations[this.selectedFloor]);
      console.dir(allLocations);
      return allLocations;
    },
    switches() {
      const that = this;

      // filter out switches
      let sws = _.filter(this.devices, d => d.type === 'POE-Switch');
      // filter out switches on same floor
      sws = _.filter(sws, (s) => {
        if (that.selectedFloor === -1) {
          return true;
        }
        return s.location.floorIndex === that.selectedFloor;
      });
      // filter out switches matching location
      sws = _.filter(sws, (s) => {
        if (that.selectedLocation === -1) {
          return true;
        }
        return s.location.id === that.selectedLocation;
      });
      // filter out selected switch
      sws = _.filter(sws, (s) => {
        if (that.selectedSwitch === 'All Switches') {
          return true;
        }
        return that.selectedSwitch === s.serialNo;
      });

      // sws = sws.unshift({serialNo: "All Switches", custom: {portData: {}}});
      console.dir(sws);
      return sws;
    },
  },
  methods: {
    getActivePorts(portData) {
      let activePorts = 0;
      for (const portIndex of Object.keys(portData)) {
        const port = portData[portIndex];
        if (port.status() === 'active') {
          activePorts += 1;
        }
      }
      return activePorts;
    },
    getTotalConsumption(portData) {
      let total = 0;
      for (const portIndex of Object.keys(portData)) {
        const port = portData[portIndex];
        total += port.powerConsumption;
      }
      return total;
    },
  },
};
</script>

<style lang="css" scoped>
.header {
  font-size: 14px;
  font-weight: 500;
}
.device-description {
  margin: -15px 0px 0px 0px;
  font-size: 15px;
}
</style>

<!--

DEFECTS/ISSUES

Need 'All Switches' Option for the Switches select box

-->

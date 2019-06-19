<template lang="html">
<v-container grid-list-xs,sm,md,lg,xl>
    <v-stepper non-linear v-model="step">
        <v-stepper-header>
            <v-stepper-step editable step="1">
                Initiate New Plan
            </v-stepper-step>

            <v-stepper-step editable step="2">
                Upload Floor Plans
            </v-stepper-step>

            <v-stepper-step step="3">
                Location and Cluster Mappings
            </v-stepper-step>

            <v-stepper-step step="4">
                Preview and Finish
            </v-stepper-step>

        </v-stepper-header>
        <v-divider></v-divider>
        <v-stepper-items style="background: transparent">
            <v-stepper-content step="3">
                <v-layout row wrap class="pa-0">

                    <v-flex xs12 ma-0 pa-0>
                        <v-layout row wrap class="ma-0 pa-0">
                            <v-flex xs12 sm4 class="pa-1" style="margin-top:5px">
                                <v-select
                                label="Floors"
                                v-model="selectedFloor"
                                :items="floors"
                                item-text="label"
                                item-value="index"></v-select>
                            </v-flex>
                            <v-flex xs12 sm4 class="pa-1"></v-flex>
                            <v-flex xs12 sm4 class="pa-1" style="margin-top:45px">
                                <span class="title secondary--text">Devices and Clusters</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <div style="">
                        <v-icon
                          @click="zoom"
                          class="icon"
                          v-bind:class="{ 'icon-active': zoomClicked }">
                            fas fa-search-plus
                        </v-icon><br>
                        <v-icon
                          @click="save"
                          class="icon"
                          v-bind:class="{ 'icon-active': !zoomClicked }">>
                            fas fa-map-marked-alt
                        </v-icon>
                    </div>
                    <v-flex pa-0>
                        <v-card>
                            <div class="mapped-devices-container">
                                <div class="plan" ref="plan">
                                  <!-- vuedraggable Library -->
                                    <draggable
                                      v-model="mappedDevices"
                                      :options="{group:'people'}"
                                      style="height: 400px">
                                        <template v-for="device in mappedDevices">
                                            <div :key="device.id" avatar>
                                            <!-- vue-drag-resize library  -->
                                                <VueDragResize
                                                class="drag-class"
                                                :x="device.left"
                                                :y="device.top"
                                                :z="999"
                                                @clicked="containerRefresh"
                                                @dragstop="dragStop($event, device.id)"
                                                v-if="!zoomClicked">
                                                    <div style="text-align:center">
                                                        <v-icon
                                                        small
                                                        style="margin-left:20px"
                                                        color="red"
                                                        @click="cancel(device)">
                                                            fas fa-times-circle
                                                        </v-icon> <br>
                                                        <v-tooltip top>
                                                            <template v-slot:activator="{ on }">
                                                                <img
                                                                v-on="on"
                                                                class="pin"
                                                                src="../../../../public/img/pin.jpg"
                                                                width="30"
                                                                height="30"
                                                                alt="">
                                                            </template>
                                                                <div>
                                                                  <span>
                                                                    {{device.type}}
                                                                  </span> <br>
                                                                  <span>
                                                                    {{device.modelType}}
                                                                  </span><br>
                                                                    <span>
                                                                      {{device.model}}
                                                                    </span><br>
                                                                    <span>
                                                                      MAC: {{device.macAddress}}
                                                                    </span><br>
                                                                    <span>
                                                                      IP: {{device.ipAddress}}
                                                                    </span>
                                                                  </div>
                                                        </v-tooltip>
                                                    </div>
                                                </VueDragResize>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex xs4 grow pa-0 @mouseover="containerRefresh">
                        <v-subheader style="background:grey">
                            DEVICES LIST
                        </v-subheader>
                        <v-layout row wrap class="ma-0 pa-0">
                            <v-flex xs12 sm12 class="ma-0 align">
                                <v-text-field
                                  label="Search Device"
                                  v-model="searchInput"
                                  v-on:keyup="search">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 class="ma-0 align">
                                <v-select
                                  label="Type"
                                  @change="filterDevices"
                                  v-model="selectedType"
                                  :items="deviceTypes"
                                  item-text="label"
                                  item-value="index">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6 class="ma-0 align">
                                <v-select
                                  label="Assignment"
                                  @change="filterDevices"
                                  v-model="selectedAssignment"
                                  :items="locations"
                                  item-text="name"
                                  item-value="id">
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-list style="overflow-y:scroll; height:150px" class="ma-0 pa-0">

                            <draggable
                              @change="popElement"
                              :move="mousePosition"
                              :value="deviceList"
                              :options="{ group: 'people' }">
                                <template v-for="device in deviceList">
                                    <v-list-tile :key="device.id" avatar class="ma-0 pa-0">
                                        <v-list-tile-avatar>
                                            <img
                                              src="../../../../public/img/device-image.png">
                                        </v-list-tile-avatar>
                                        <div style="font-size:12px">
                                            <span> {{device.type}}</span> |
                                            <span> {{device.modelType}}</span> |
                                            <span>{{device.model}}</span> |
                                            <span>MAC: {{device.macAddress}}</span> |
                                            <span>IP: {{device.ipAddress}}</span>
                                        </div>
                                    </v-list-tile>
                                </template>
                            </draggable>
                        </v-list>

                        <v-subheader style="background:grey">
                            CLUSTERS
                        </v-subheader>
                        <v-layout row wrap class="ma-0 pa-0">
                            <v-flex xs12 sm4 class="ma-0 align">
                                <v-text-field
                                  label="Search Cluster">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 class="ma-1 pa-1">
                                <v-btn depressed>
                                    <v-icon small class="ma-1 pa-0">
                                        fas fa-plus-circle
                                    </v-icon>New
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 sm3 class="ma-1 pa-1">
                                <v-btn depressed>Date Created</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-list style="overflow-y:scroll; height:150px" class="ma-0 pa-0">

                            <draggable
                              @change="popElement"
                              :move="mousePosition"
                              v-model="clusters"
                              :options="{ group: 'people' }">
                                <template v-for="device in clusters ">
                                    <v-list-tile :key="device.id" avatar class="ma-0 pa-0">
                                        <v-list-tile-avatar>
                                            <img src="../../../../public/img/device-image.png">
                                        </v-list-tile-avatar>
                                        <div style="font-size:12px">
                                          <span> {{device.type}}</span> |
                                          <span> {{device.modelType}}</span> |
                                          <span>{{device.model}}</span> |
                                          <span>MAC: {{device.macAddress}}</span> |
                                          <span>IP: {{device.ipAddress}}</span>
                                        </div>
                                    </v-list-tile>
                                </template>
                            </draggable>
                        </v-list>
                    </v-flex>
                     <v-dialog
                        v-model="dialog"
                        width="500"
                        height="400"
                        persistent
                      >

                        <v-card>
                          <v-card-title
                            class="headline green lighten-2"
                            primary-title
                          >
                          {{selectedDevice.modelType}} {{selectedDevice.type}} Strip
                          &times;
                          </v-card-title>

                          <v-layout row wrap class="pa-0"  style="margin-left: 5px;margin-top:5px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                Device type:
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 class="ma-0" style="mrgin-left:-20px">
                                <v-select
                                disabled
                                 style="font-weight: bold"
                                  v-model="selectedDevice.type"
                                  :items="[selectedDevice.type]"
                                  >
                                </v-select>
                            </v-flex>
                            </v-layout>
                           <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                Device Name:
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 class="ma-0" style="mrgin-left:-20px">
                                <v-select
                                  style="font-weight: bold"
                                  v-model="selectedDevice.modelType"
                                  :items="[selectedDevice.modelType]"
                                  >
                                </v-select>
                            </v-flex>
                            </v-layout>
                             <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                Make and Model:
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 style="font-size:15px;margin-top:20px;font-weight: bold" >
                               <p>
                                 {{selectedDevice.name}} {{selectedDevice.model}}
                                </p>
                            </v-flex>
                            </v-layout>
                             <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                MAC Address:
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 style="font-size:15px;margin-top:20px;font-weight: bold">
                               <p>
                                 {{selectedDevice.macAddress}}
                                </p>
                            </v-flex>
                            </v-layout>
                             <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                IP Address:
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 class="ma-0" style="mrgin-left:-20px">
                                <v-select
                                 style="font-weight: bold"
                                  v-model="selectedDevice.ipAddress"
                                  :items="[selectedDevice.ipAddress]"
                                  >
                                </v-select>
                            </v-flex>
                            </v-layout>
                             <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:20px">
                                Cluster
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 class="ma-0" style="mrgin-left:-20px">
                                <v-select
                                 style="font-weight: bold"
                                  v-model="selectedDevice.type"
                                  :items="clusters"
                                  >
                                </v-select>
                            </v-flex>
                            </v-layout>
                             <v-layout row wrap class="pa-0" style="margin-left: 5px;margin-top:-35px">
                            <v-flex xs12 sm4 class="ma-0">
                              <p style="font-size:15px; margin-top:18px">
                                Location
                              </p>
                            </v-flex>
                            <v-flex xs12 sm7 class="ma-0" style="mrgin-left:-20px">
                                <v-select
                                 style="font-weight: bold"
                                  v-model="selectedDevice.type"
                                  :items="[selectedDevice.type]"
                                  >
                                </v-select>
                            </v-flex>
                            </v-layout>
                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                             style="background: #81c784;"
                              flat
                              @click="saveDeviceDetails"
                            >
                              save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                </v-layout>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>

</v-container>
</template>

<script>
import draggable from "vuedraggable";
import VueDragResize from "vue-drag-resize";
import panzoom from "panzoom";
import MutationTypes from "@/state/mutation-types";
import _ from "lodash";

export default {
  name: "floor-plan-editor",
  components: {
    draggable,
    VueDragResize
  },
  data() {
    return {
      step: 3,
      searchInput: "",
      selectedFloor: -1,
      selectedType: "All Types",
      selectedAssignment: "All",
      dialog: false,
      selectedDevice: {
        id: 10202,
        type: "LED",
        serialNo: 19707,
        name: "MHT-124",
        vendor: "MHT",
        model: "MHTi-VOLS-SC-2x2-25",
        modelType: "Luminaire",
        hwVersion: "1.0",
        swVersion: "1.0",
        connectivity: "online",
        location: {
          id: "002",
          name: "005-001-S3-D-F1-079",
          path: "",
          floorIndex: 1
        },
        custom: {
          brightness: 50,
          onStatus: "ON",
          wattage: 10
        },
        macAddress: "FE:C3:A6:73:60:00",
        ipAddress: "241.39.62.108"
      },
      // Mock Data for clusters
      clusters: [
        {
          id: 10202,
          type: "LED",
          serialNo: 19707,
          name: "MHT-124",
          vendor: "MHT",
          model: "MHTi-VOLS-SC-2x2-25",
          modelType: "Luminaire",
          hwVersion: "1.0",
          swVersion: "1.0",
          connectivity: "online",
          location: {
            id: "002",
            name: "005-001-S3-D-F1-079",
            path: "",
            floorIndex: 1
          },
          custom: {
            brightness: 50,
            onStatus: "ON",
            wattage: 10
          },
          macAddress: "FE:C3:A6:73:60:00",
          ipAddress: "241.39.62.108",
          top: 230,
          left: 69
        },

        {
          id: 10203,
          type: "LED",
          serialNo: 19707,
          name: "MHT-124",
          vendor: "MHT",
          model: "MHTi-VOLS-SC-2x2-25",
          modelType: "Luminaire",
          hwVersion: "1.0",
          swVersion: "1.0",
          connectivity: "online",
          location: {
            id: "002",
            name: "005-001-S3-D-F1-079",
            path: "",
            floorIndex: 1
          },
          custom: {
            brightness: 50,
            onStatus: "ON",
            wattage: 10
          },
          macAddress: "FE:C3:A6:73:60:00",
          ipAddress: "241.39.62.108",
          top: 220,
          left: 688
        }
      ],
      mappedDevices: [],
      deviceList: [],
      deviceTypes: [],
      locations: ["All", "Assigned", "Unassigned"],
      data: [],
      zoomPaused: false,
      zoomClicked: false,
      dataLoaded: false
    };
  },
  mounted() {
    this.$store.dispatch(MutationTypes.RETRIEVE_FACILITY_INFO);
    this.$store.dispatch(MutationTypes.RETRIEVE_DEVICES).then(dvcs => {
      this.data = dvcs;
      this.deviceList = this.data;
      this.deviceTypes = [
        "All Types",
        ...this.deviceList.map(device => device.type)
      ];
    });

    // Get the stored location/positions for the devices that are mapped.
    this.mappedDevices.forEach(item => {
      const storedData = JSON.parse(localStorage.getItem(item.id));
      if (storedData) {
        item.width = storedData.width;
        item.height = storedData.height;
        item.left = storedData.left;
        item.top = storedData.top;
        this.dataLoaded = true;
      }
    });
    // Container refresh on load
    if (this.dataLoaded) {
      this.zoom();
      this.dataLoaded = false;
    }
  },
  computed: {
    floors() {
      return _.union(
        [
          {
            label: "All Floors",
            index: -1
          }
        ],
        this.$store.getters.facility.floors
      );
    }
  },
  methods: {
    matcher(regexp) {
      return obj => {
        let found = false;
        Object.keys(obj).forEach(key => {
          if (!found) {
            if (typeof obj[key] === "string" && regexp.exec(obj[key])) {
              found = true;
            }
          }
        });
        return found;
      };
    },

    search() {
      if (this.searchInput !== "") {
        let dvcs = this.data.slice();
        this.searchInput.split(" ").forEach(str => {
          const regexp = new RegExp(`\\b${str}\\b`, "i");
          dvcs = dvcs.filter(this.matcher(regexp));
        });
        this.deviceList = dvcs;
      } else {
        this.filterDevices();
      }
    },

    popElement(event) {
      // Remove element from the Device List when dragged and dropped
      this.selectedDevice = event.removed.element;
      const index = this.data.findIndex(
        device => device.id === event.removed.element.id
      );
      if (index !== undefined) this.data.splice(index, 1);
      this.filterDevices();
      this.dialog = true;
      this.zoomClicked = true;
    },

    filterDevices() {
      let dvcs = this.data.slice();
      // Filter based on device types
      dvcs = dvcs.filter(device => {
        if (this.selectedType === "All Types") {
          return true;
        }
        return this.selectedType === device.type;
      });

      // Filter based on Assignment
      dvcs = dvcs.filter(device => {
        if (this.selectedAssignment === "All") {
          return true;
        }
        if (this.selectedAssignment === "Unassigned") {
          return device.location === this.selectedAssignment;
        }
        return device.location !== "Unassigned";
      });
      dvcs = dvcs.length !== 0 ? dvcs : null;
      this.deviceList = dvcs;
    },
    saveDeviceDetails() {
      this.selectedDevice = {};
      this.zoomClicked = false;
      this.dialog = false;
    },
    zoom() {
      // Zoom and Pan functionality. please check panzoom library documentation for more information
      this.zoomClicked = this.dataLoaded !== true;
      if (this.zoomPaused) {
        this.controller.resume();
      } else {
        this.controller = panzoom(this.$refs.plan, {
          maxZoom: 1.6,
          minZoom: 1
        });
      }
    },
    save() {
      // Save the zoomed in image
      this.zoomPaused = true;
      this.zoomClicked = false;
      this.controller.pause();
    },
    cancel(dvc) {
      const index = this.mappedDevices.findIndex(
        device => device.id === dvc.id
      );

      if (index !== undefined) this.mappedDevices.splice(index, 1);
      this.data.push(dvc);
      this.deviceList = this.data;
    },
    containerRefresh() {
      panzoom(this.$refs.plan, {
        maxZoom: 1.5,
        minZoom: 1
      }).pause();
    },
    dragStop(newPos, id) {
      // Once Drag stop store the pin location
      localStorage.setItem(id, JSON.stringify(newPos));
      this.mappedDevices.forEach(item => {
        const storedData = JSON.parse(localStorage.getItem(item.id));
        if (storedData) {
          item.width = storedData.width;
          item.height = storedData.height;
          item.left = storedData.left;
          item.top = storedData.top;
        }
      });
    },
    mousePosition(event) {
      // Position of Drag pointer
      event.draggedContext.element.left = event.originalEvent.offsetX;
      event.draggedContext.element.top = event.originalEvent.offsetY;
      const pos = {
        left: event.originalEvent.layerX,
        top: event.originalEvent.layerY,
        height: 100,
        width: 100
      };
      this.dragStop(pos, event.draggedContext.element.id);
    }
  }
};
</script>

<style lang="css" scoped>
.mapped-devices-container {
  background: transparent;
  overflow: hidden;
  text-align: center;
}
.icon-active {
  background: #16a085;
  color: white;
}

.icon {
  border: 0.5px solid black;
  border-radius: 25px;
  padding: 8px;
}

.plan {
  margin-top: 30px;
  height: 100%;
  background-image: url("../../../../public/img/floorplan.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: contain;
  overflow: hidden;
}

.drag-class {
  width: auto !important;
  height: auto !important;
  overflow: hidden;
}

.vdr.active:before {
  content: "";
  width: auto;
  height: auto;
  top: auto;
  left: auto;
  outline: none;
}

::-webkit-scrollbar {
  width: 6px;

  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  height: 40px;
  background-color: grey;
}

.pin {
  animation: bounce 1.2s ease-in-out;
}

.align {
  padding: 3px;
}

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: translateY(-100%);
  }

  5% {
    -webkit-transform: translateY(-100%);
  }

  15% {
    -webkit-transform: translateY(0);
    padding: 4px auto;
  }

  20% {
    -webkit-transform: translateY(-80%);
  }

  25% {
    -webkit-transform: translateY(0%);
    padding: 4px auto;
  }

  30% {
    -webkit-transform: translateY(-70%);
  }

  35% {
    -webkit-transform: translateY(0%);
    padding: 5px auto;
  }

  40% {
    -webkit-transform: translateY(-60%);
  }

  45% {
    -webkit-transform: translateY(0%);
    padding: 5px auto;
  }

  50% {
    -webkit-transform: translateY(-50%);
  }

  55% {
    -webkit-transform: translateY(0%);
    padding: 6px auto;
  }

  60% {
    -webkit-transform: translateY(-30%);
  }

  65% {
    -webkit-transform: translateY(0%);
    padding: 6px auto;
  }

  70% {
    -webkit-transform: translateY(-15%);
  }

  75% {
    -webkit-transform: translateY(0);
    padding: 8px auto;
  }

  80% {
    -webkit-transform: translateY(-10%);
  }

  85% {
    -webkit-transform: translateY(0);
    padding: 8px auto;
  }

  90% {
    -webkit-transform: translateY(-5%);
  }

  95% {
    -webkit-transform: translateY(0);
    padding: 10px;
  }

  100% {
    -webkit-transform: translateY(0);
    padding: 10px;
  }
}
</style>

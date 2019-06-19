<template>
  <v-container fluid fill-height class="pa">
    <v-layout row wrap>
      <v-flex xs8>
        <v-layout row wrap>
          <v-flex
            xs1
            sm1
            class="switches-display"
            @click="setPortDetails(index)"
            v-for="(port, index) in portData"
            :key="index"
          >
            <p style="width:100%;text-align:right; font-size:10px; padding-right: 2px">
              {{ port.portId }}
            </p>
            <div style="margin-top: -25px;text-align: center">
              <v-icon v-if="port.status() === 'active'" color="green">fas fa-bolt</v-icon>
              <v-icon v-else color="red">far fa-times-circle</v-icon>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <transition name="fade" appear>
        <v-flex xs4 v-if="switchInfoLoaded" style="border: 0.5px solid grey margin-left: 8px">
          <p class="infor">
            Power Consumption:
            <span class="font-weight-bold">{{ this.currentPort.powerConsumption }} W</span>
          </p>
          <p class="infor">
            IP Address: <span class="font-weight-bold">{{ this.currentPort.ipAddress }}</span>
          </p>
          <p class="infor">
            Connected Device: <span class="font-weight-bold">-Not Available-</span>
          </p>
        </v-flex>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'poe-switch',
  props: ['portData'],
  data() {
    return {
      switchInfoLoaded: false,
      currentPort: {
        powerConsumption: '',
        ipAddress: '',
      },
    };
  },
  methods: {
    setPortDetails(portId) {
      this.switchInfoLoaded = true;
      this.currentPort = this.portData[portId];
    },
  },
};
</script>

<style lang="css">
.infor {
  margin: 0px 0px 0px 15px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
.switches-display {
  border: 0.016px solid #80808066;
  text-align: center;
}
.checkmark {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  display: inline-block;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: scale3d(1.1, 1.1, 1);
  }
  50% {
    transform: scale3d(1.5, 1.5, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}

.cross__svg {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  display: inline-block;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px red;
  animation: fill-red 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.cross__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #e74c3c;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.cross__path {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes fill-red {
  100% {
    box-shadow: inset 0px 0px 0px 30px #e74c3c;
  }
}
</style>

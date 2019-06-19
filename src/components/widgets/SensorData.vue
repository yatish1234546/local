<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">SENSOR DATA</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">ACTIVE SENSORS</div>
          <div>
            <span class="title">1014</span><span> / 1020 installed</span>
          </div>
          <div class="">
            730 LED lights
          </div>
          <div class="">
            150 HVAC
          </div>
          <div class="">
            130 Window Blinds
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            OCCUPANCY
          </div>
          <div class="title">
            65%
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            TEMPERATURE
          </div>
          <div class="title">
            65%
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            DUST
          </div>
          <div class="title">
            65%
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div class="">
            HUMIDITY
          </div>
          <div class="title">
            65%
          </div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'widget-sensor-data',
};
</script>

<style lang="stylus"></style>

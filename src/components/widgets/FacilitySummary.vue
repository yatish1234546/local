<template lang="html">
  <v-container fluid fill-height class="pa-2">
    <v-layout row wrap>
      <v-card color="grey lighten-4" width="100%">
        <v-toolbar flat>
          <span class="title secondary--text">FACILITY SUMMARY</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs12 class="light-green lighten-1 pa-3 ma-1 mt-2 ml-2">
                <div class="">
                  Floor 5
                </div>
                <div class="">
                  Status: OK
                </div>
                <div class=""></div>
              </v-flex>
              <v-flex xs12 class="light-green lighten-1 pa-3 ma-1 ml-2">
                <div class="">
                  Floor 4
                </div>
                <div class="">
                  Status: OK
                </div>
                <div class=""></div>
              </v-flex>
              <v-flex xs12 class="orange lighten-1 pa-3 ma-1 ml-2">
                <div class="">
                  Floor 3
                </div>
                <div class="">
                  Status: Device Failures
                </div>
                <div class=""></div>
              </v-flex>
              <v-flex xs12 class="orange lighten-1 pa-3 ma-1 ml-2">
                <div class="">
                  Floor 2
                </div>
                <div class="">
                  Status: Device Failures
                </div>
                <div class=""></div>
              </v-flex>
              <v-flex xs12 class="light-green lighten-1 pa-3 ma-1 ml-2">
                <div class="">
                  Floor 1
                </div>
                <div class="">
                  Status: OK
                </div>
                <div class=""></div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs12 pa-2 ml-2>
                <v-card-text class="pa-0">
                  <div class="">ACTIVE SENSORS</div>
                  <div><span class="title">1014</span><span> / 1020 installed</span></div>
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
                <v-card-text class="pa-2">
                  <div class="">
                    OCCUPANCY
                  </div>
                  <div class="title">
                    65%
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                  <div class="">
                    TEMPERATURE
                  </div>
                  <div class="title">
                    70&#8457;
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                  <div class="">
                    DUST
                  </div>
                  <div class="title">
                    02 u g/m<sup>3</sup>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                  <div class="">
                    HUMIDITY
                  </div>
                  <div class="title">
                    26%
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'widget-facility-summary',
};
</script>

<style lang="css">
.floor {
  padding: 10px;
  margin:3px;
}
</style>

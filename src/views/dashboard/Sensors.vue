<template lang="html">
  <v-container fluid grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <span class="subheading secondary--text">Data for the period:</span>
        <v-daterange
          color="secondary"
          class="pr-3"
          v-model="range"
          start-label="Start"
          end-label="End"
          separator-label="to"
          display-format="MM-DD-YYYY"
          :presets="dateRangeOptions.presets"
          :max="dateRangeOptions.maxDate"
          :input-props="dateRangeOptions.inputProps"
        ></v-daterange>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <light />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <motion />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <carbon-di-oxide />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <temperature />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <humidity />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <occupancy />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutationTypes from '@/state/mutation-types';
import { format, subDays } from 'date-fns';
import { VDaterange } from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';
import Light from '@/components/widgets/analytics/sensors/Light.vue';
import Motion from '@/components/widgets/analytics/sensors/Motion.vue';
import CarbonDiOxide from '@/components/widgets/analytics/sensors/CO2.vue';
import Temperature from '@/components/widgets/analytics/sensors/Heat.vue';
import Humidity from '@/components/widgets/analytics/sensors/Humidity.vue';
import Occupancy from '@/components/widgets/analytics/sensors/Occupancy.vue';

export default {
  name: 'sensors-view',
  components: {
    VDaterange,
    Light,
    Motion,
    CarbonDiOxide,
    Temperature,
    Humidity,
    Occupancy,
  },
  data() {
    return {
      dateRangeOptions: {
        maxDate: format(subDays(new Date(), 1), 'YYYY-MM-DD'),
        format: 'MM/DD/YYYY',
        inputProps: {
        },
        presets: [
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Last Week',
            range: [
              format(subDays(new Date(), 7), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
        ],
      },
    };
  },
  computed: {
    range: {
      get() {
        return this.$store.getters.analyticsDateRange;
      },
      set(range) {
        this.$store.commit(MutationTypes.SET_ANALYTICS_DATE_RANGE, range);
      },
    },
  },
};
</script>

<style lang="css" scoped></style>

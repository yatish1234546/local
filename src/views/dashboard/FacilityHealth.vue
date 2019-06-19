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
        ></v-daterange>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <health-by-facility></health-by-facility>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <health-by-cluster></health-by-cluster>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <health-by-device-type></health-by-device-type>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutationTypes from '@/state/mutation-types';
import { format, subDays } from 'date-fns';
import { VDaterange } from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';
import HealthByFacility from '@/components/widgets/analytics/health/HealthByFacility.vue';
import HealthByCluster from '@/components/widgets/analytics/health/HealthByCluster.vue';
import HealthByDeviceType from '@/components/widgets/analytics/health/HealthByDeviceType.vue';

export default {
  name: 'facility-health-view',
  components: {
    VDaterange,
    HealthByFacility,
    HealthByCluster,
    HealthByDeviceType,
  },
  data() {
    return {
      dateRangeOptions: {
        maxDate: format(subDays(new Date(), 1), 'YYYY-MM-DD'),
        format: 'MM/DD/YYYY',
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

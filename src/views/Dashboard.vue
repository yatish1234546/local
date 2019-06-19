<template lang="html">
  <v-container fluid class="pa-2">
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
      <v-flex xs12 sm4 md4>
        <facility-summary />
      </v-flex>
      <v-flex xs12 sm4 md4>
        <savings-by-facility title="SAVINGS" />
      </v-flex>
      <v-flex xs12 sm4 md4>
        <current-device-status />
      </v-flex>
      <v-flex xs12 sm12 md12>
        <consumption-time-series  />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MutationTypes from '@/state/mutation-types';
import { format, subDays } from 'date-fns';
import { VDaterange } from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';
import FacilitySummary from '@/components/widgets/FacilitySummary.vue';
import SavingsByFacility from '@/components/widgets/analytics/savings/SavingsByFacility.vue';
import CurrentDeviceStatus from '@/components/widgets/analytics/device-status/DeviceStatusCurrent.vue';
import ConsumptionTimeSeries from '@/components/widgets/analytics/consumption/ConsumptionTimeSeries.vue';

export default {
  name: 'dashboard',
  components: {
    VDaterange,
    FacilitySummary,
    SavingsByFacility,
    CurrentDeviceStatus,
    ConsumptionTimeSeries,
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

<style lang="scss"></style>

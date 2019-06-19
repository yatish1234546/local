import Vue from 'vue';
import Vuex from 'vuex';
import { format, subDays } from 'date-fns';
import ApplicationData from './modules/application-store';
import UsersManager from './modules/users-store';
import AnalyticsData from './modules/analytics-store';
import DevicesManager from './modules/devices-store';
import FacilityManager from './modules/facility-store';
import Metrics from './modules/metrics-store';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    application: ApplicationData,
    usersManager: UsersManager,
    analytics: AnalyticsData,
    devicesManager: DevicesManager,
    facilityManager: FacilityManager,
    metrics: Metrics,
  },
  getters,
});

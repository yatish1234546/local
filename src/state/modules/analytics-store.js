import Cookies from 'js-cookie';
import _ from 'lodash';
import { format, subDays } from 'date-fns';
import MutationTypes from '../mutation-types';

const ns = {
  state: {
    dateRange: {
      start: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
      end: format(subDays(new Date(), 1), 'YYYY-MM-DD'),
    },
  },
  mutations: {
    [MutationTypes.SET_ANALYTICS_DATE_RANGE](state, range) {
      state.dateRange = range;
    },
  },
  actions: {},
  getters: {},
};

export default ns;

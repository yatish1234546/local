
import MutationTypes from '../mutation-types';
import getFacilityInfo from '@/api/mock/facility';

const ns = {
  state: {
    facility: {},
  },
  mutations: {
    [MutationTypes.RETRIEVE_FACILITY_INFO](state, facility) {
      state.facility = facility;
    },
  },
  actions: {
    retrieveFacilityInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getFacilityInfo().then((response) => {
          commit(MutationTypes.RETRIEVE_FACILITY_INFO, response.data);
          resolve();
        });
      });
    },
  },
};

export default ns;

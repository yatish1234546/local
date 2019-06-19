import MutationTypes from '../mutation-types';
import { getDevices } from '@/api/mock/devices';


const ns = {
  state: {
    devices: [],
  },
  mutations: {
    [MutationTypes.RETRIEVE_DEVICES](state, devices) {
      state.devices = devices;
    },
  },
  actions: {
    retrieveDevices({ commit }) {
      return new Promise((resolve, reject) => {
        getDevices().then((response) => {
          commit(MutationTypes.RETRIEVE_DEVICES, response.data);
          resolve(response.data);
        });
      });
    },
  },
};

export default ns;

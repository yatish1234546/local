import _ from 'lodash';
import MutationTypes from '../mutation-types';
import { getJVMMetrics, getThreadDump } from '@/api/mock/metrics';

const ns = {
  state: {
    jvmMetrics: {},
    threadDump: {},
  },
  mutations: {
    [MutationTypes.RETRIEVE_JVM_METRICS](state, metrics) {
      state.jvmMetrics = metrics;
    },
    [MutationTypes.RETRIEVE_THREAD_DUMP](state, threadDump) {
      state.threadDump = threadDump;
    },
  },
  actions: {
    retrieveJVMMetrics({ commit }) {
      return new Promise((resolve, reject) => {
        getJVMMetrics().then((response) => {
          commit(MutationTypes.RETRIEVE_JVM_METRICS, response.data);
          resolve();
        });
      });
    },
    retrieveThreadDump({ commit }) {
      return new Promise((resolve, reject) => {
        getThreadDump().then((response) => {
          commit(MutationTypes.RETRIEVE_THREAD_DUMP, response.data);
          resolve();
        });
      });
    },
  },
  getters: {},
};

export default ns;

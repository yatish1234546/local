import Cookies from 'js-cookie';
import _ from 'lodash';
import MutationTypes from '../mutation-types';
import {
  setLanguage, getLanguage,
} from '@/util/cookie';

const ns = {
  state: {
    language: getLanguage(),
    snackbar: {
      show: false,
      text: '',
      color: '',
    },
    drawer: null,
  },
  mutations: {
    [MutationTypes.SNACKBAR_SHOW](state, { message, color }) {
      state.snackbar.show = true;
      state.snackbar.text = message;
      state.snackbar.color = color;
    },
    [MutationTypes.SNACKBAR_HIDE](state) {
      state.snackbar.show = false;
      state.snackbar.text = '';
      state.snackbar.color = '';
    },
    [MutationTypes.SET_LANGUAGE](state, language) {
      setLanguage(language);
    },
    [MutationTypes.SET_DRAWER_STATE](state, val) {
      state.drawer = val;
    },
  },
  actions: {
    showSnackbar({ commit }, data) {
      commit(MutationTypes.SNACKBAR_SHOW, data);
    },
    setLanguage({ commit }, language) {
      commit(MutationTypes.SET_LANGUAGE, language);
    },
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let accessedRouters;
        if (roles.includes('ROLE_ADMIN')) {
          // accessedRouters = asyncRouterMap;
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        }
        // commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
  getters: {},
};

export default ns;

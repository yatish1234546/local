import _ from 'lodash';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import MutationTypes from '../mutation-types';
import { getToken, setToken, removeToken } from '@/util/cookie';
import {
  getUsers, createUser, updateUser, deleteUser, getRoles,
} from '@/api/mock/users';
import authenticate from '@/api/mock/login';

const ns = {
  state: {
    user: {
      name: '',
      token: getToken(),
      roles: [],
    },
    users: [],
    roles: [],
  },
  mutations: {
    [MutationTypes.SET_TOKEN](state, token) {
      setToken(token);
      state.user.token = token;
    },
    [MutationTypes.REMOVE_TOKEN](state) {
      removeToken();
      state.user.token = '';
      state.user.roles = [];
    },
    [MutationTypes.SET_USER_INFO](state, user) {
      state.user.name = user.name;
      state.user.roles = user.roles;
    },
    [MutationTypes.RETRIEVE_USERS](state, users) {
      state.users = users;
    },
    [MutationTypes.UPDATE_USER_INFO](state, user) {
      const index = _.findIndex(state.users, o => o.id === user.id);
      if (index !== -1) {
        state.users.splice(index, 1, user);
      }
    },
    [MutationTypes.CREATE_USER](state, user) {
      state.users.push(user);
    },
    [MutationTypes.DELETE_USER](state, user) {
      const index = _.findIndex(state.users, o => o.id === user.id);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    [MutationTypes.RETRIEVE_ROLES](state, roles) {
      state.roles = roles;
    },
  },
  actions: {
    login({ commit }, model) {
      const username = model.username.trim();
      const password = model.password.trim();
      return new Promise((resolve, reject) => {
        authenticate(username, password)
          .then((response) => {
            const authorizationHeader = response.headers.authorization;
            commit(MutationTypes.SET_TOKEN, authorizationHeader);
            const { data } = response;
            const decodedData = jwtDecode(data.id_token);
            const user = { name: decodedData.sub, roles: decodedData.auth.split(',') };
            commit(MutationTypes.SET_USER_INFO, user);
            resolve(user.roles);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit(MutationTypes.REMOVE_TOKEN);
        resolve();
      });
    },
    setUserInfo({ commit, state }) {
      const decodedData = jwtDecode(state.user.token);
      const user = { name: decodedData.sub, roles: decodedData.auth.split(',') };
      commit(MutationTypes.SET_USER_INFO, user);
    },
    retrieveUsers({ commit }) {
      return new Promise((resolve, reject) => {
        getUsers()
          .then((response) => {
            commit(MutationTypes.RETRIEVE_USERS, response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    createUser({ commit }, user) {
      const usr = Object.assign({}, user);
      const authorities = user.roles;
      usr.id = null;
      usr.activated = true;
      usr.authorities = authorities;
      return new Promise((resolve, reject) => {
        createUser(usr).then((response) => {
          const u = response.data;
          u.roles = usr.roles;
          commit(MutationTypes.CREATE_USER, u);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    deleteUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        deleteUser(user).then((response) => {
          commit(MutationTypes.DELETE_USER, user);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    retrieveRoles({ commit }) {
      return new Promise((resolve, reject) => {
        getRoles()
          .then((response) => {
            commit(MutationTypes.RETRIEVE_ROLES, response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {},
};

export default ns;

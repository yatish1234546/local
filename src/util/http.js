import axios from 'axios';
import store from '@/state/store';
import { getToken } from '@/util/cookie';
import MutationTypes from '@/state/mutation-types';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      console.log('Adding AUTH header with token');
      config.headers.Authorization = getToken();
    } else {
      console.log('Token not found. Will not be able to add AUTH header');
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => response,
  (error) => {
    console.log(`${error}`); // for debug
    store.dispatch(MutationTypes.SNACKBAR_SHOW, { color: 'red', message: error.message });
    return Promise.reject(error);
  },
);

export default service;

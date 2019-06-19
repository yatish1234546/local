export default {
  ENDPOINT_BASE_URL: process.env.VUE_APP_SERVER_URL,
  // AUTH
  ENDPOINT_LOGIN: '/api/authenticate',
  ENDPOINT_LOGOUT: '/api/logout',
  // USERS
  ENDPOINT_USERS: '/api/users',

  // DEVICES
  ENDPOINT_DEVICES: './api/devices',
  ENDPOINT_PORTDETAILS: '/api/portDetails',
};

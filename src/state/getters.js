const getters = {
  language: state => state.application.language,
  name: state => state.usersManager.user.name,
  token: state => state.usersManager.user.token,
  userRoles: state => state.usersManager.user.roles,
  users: state => state.usersManager.users,
  roles: state => state.usersManager.roles,
  drawer: state => state.application.drawer,
  isAuthenticated: state => state.usersManager.user.token,
  analyticsDateRange: state => state.analytics.dateRange,
  devices: state => state.devicesManager.devices,
  facility: state => state.facilityManager.facility,
  metrics: state => ({
    metrics: state.metrics.jvmMetrics,
    threadDump: state.metrics.threadDump,
  }),
};

export default getters;

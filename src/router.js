import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import MutationTypes from '@/state/mutation-types';
import store from '@/state/store';
import { getToken } from '@/util/cookie';
import { hasPermission } from '@/util/security';
import NotFound from './views/errors/NotFound.vue';
import Landing from './views/Landing.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import DeviceStatus from './views/dashboard/DeviceStatus.vue';
import EnergyConsumption from './views/dashboard/EnergyConsumption.vue';
import EnergySavings from './views/dashboard/EnergySavings.vue';
import FacilityHealth from './views/dashboard/FacilityHealth.vue';
import Sensors from './views/dashboard/Sensors.vue';
import ControlPanel from './views/ControlPanel.vue';
import Report from './views/reports/Report.vue';
import Monitoring from './views/monitoring/Monitoring.vue';
import Alerts from './views/monitoring/Alerts.vue';
import Health from './views/monitoring/Health.vue';
import CloudServerMetrics from './views/monitoring/CloudServerMetrics.vue';
import Tools from './views/support/Tools.vue';
import PolicyEditor from './views/setup/policy/PolicyEditor.vue';
import DevicesList from './views/setup/device/DevicesList.vue';
import ClusterManager from './views/setup/device/ClustersList.vue';
import PolicyMapper from './views/setup/device/PolicyMapper.vue';
import FloorPlanEditor from './views/setup/facility/FloorPlanEditor.vue';
import Commissioning from './views/setup/facility/Commissioning.vue';
import PowerManager from './views/power/PowerManager.vue';
import UsersManager from './views/access/UsersManager.vue';
import Docs from './views/help/Docs.vue';
import FAQs from './views/help/FAQs.vue';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home,
      redirect: '/login',
      meta: { public: true, roles: ['ROLE_ANON'] },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true, roles: ['ROLE_ANON'] },
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound,
      meta: { public: true, roles: ['ROLE_ANON'] },
    },
    {
      path: '/content/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/dashboard/consumption',
      name: 'widget-consumption',
      component: EnergyConsumption,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/dashboard/saving',
      name: 'widget-saving',
      component: EnergySavings,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/dashboard/health',
      name: 'widget-health',
      component: FacilityHealth,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/dashboard/device-status',
      name: 'widget-device-status',
      component: DeviceStatus,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/dashboard/sensors',
      name: 'widget-sensors',
      component: Sensors,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/control',
      name: 'widget-control-panel',
      component: ControlPanel,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/reports',
      name: 'reports',
      component: Report,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/reports/1',
      name: 'reports1',
      component: Report,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/reports/2',
      name: 'reports2',
      component: Report,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/reports/3',
      name: 'reports3',
      component: Report,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/monitoring',
      name: 'monitoring',
      component: Alerts,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/monitoring/alerts',
      name: 'monitoring-alerts',
      component: Alerts,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/monitoring/health',
      name: 'monitoring-health',
      component: Health,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/monitoring/jvm',
      name: 'monitoring-jvm',
      component: CloudServerMetrics,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/support',
      name: 'support',
      component: Tools,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/support/tools',
      name: 'support-tools',
      component: Tools,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup',
      name: 'setup',
      redirect: '/content/setup/policy/editor',
    },
    {
      path: '/content/setup/policy/editor',
      name: 'policy-editor',
      component: PolicyEditor,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup/device',
      name: 'config-devices',
      redirect: '/content/dashboard',
    },
    {
      path: '/content/setup/device/manager',
      name: 'device-manager',
      component: DevicesList,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup/device/cluster',
      name: 'cluster-manager',
      component: ClusterManager,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup/device/policy-mapper',
      name: 'policy-mapper',
      component: PolicyMapper,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup/facility',
      name: 'facility',
      redirect: '/content/setup/facility/floor',
    },
    {
      path: '/content/setup/facility/floor',
      name: 'floor-manager',
      component: FloorPlanEditor,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/setup/facility/commissioning',
      name: 'commissioning',
      component: Commissioning,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/power',
      name: '/content/power',
      component: PowerManager,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/access',
      name: 'access-manager',
      redirect: '/content/access/users',
    },
    {
      path: '/content/access/users',
      name: 'user-manager',
      component: UsersManager,
      meta: {
        public: false,
        breadcrumb: true,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_FACILITY_ADMIN'],
      },
    },
    {
      path: '/content/help',
      name: 'help',
      redirect: '/content/help/docs',
    },
    {
      path: '/content/help/docs',
      name: 'help-docs',
      component: Docs,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '/content/help/faqs',
      name: 'faqs',
      component: FAQs,
      meta: {
        public: false,
        breadcrumb: true,
        roles: [
          'ROLE_SUPER_ADMIN',
          'ROLE_FACILITY_ADMIN',
          'ROLE_FIELD_ENGG',
          'ROLE_SUPPORT_ENGG',
          'ROLE_EXECUTIVE',
        ],
      },
    },
    {
      path: '*',
      redirect: '/not-found',
    },
  ],
});

const whiteList = ['/', '/login', '/not-found'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/content/dashboard' });
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done();
    } else if (store.getters.userRoles.length === 0) {
      store
        .dispatch(MutationTypes.SET_USER_INFO)
        .then((res) => {
          next();
          // NOTE Remove this incase the next statements are enabled
          // const roles = res;
          // store.dispatch(MutationTypes.GENERATE_ROUTES, { roles }).then(() => {
          //   router.addRoutes(store.getters.addRouters);
          //   next({ ...to, replace: true });
          // });
        })
        .catch((err) => {
          store.dispatch(MutationTypes.LOGOUT).then(() => {
            store.dispatch(MutationTypes.SNACKBAR_SHOW, { message: err, color: 'red' });
            next({ path: '/' });
          });
        });
    } else if (hasPermission(store.getters.userRoles, to.meta.roles)) {
      next();
    } else {
      next({ path: '/401', replace: true, query: { noGoBack: true } });
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
    // if current page is login will not trigger afterEach hook, so manually handle it
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

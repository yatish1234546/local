import MutationTypes from '@/state/mutation-types';

export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e);
      }
      this.$router.push({ path: 'dashboard' });
    },
  },
  {
    name: 'APP_LOGOUT',
    callback(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e);
      }
      this.$store.dispatch(MutationTypes.LOGOUT).then(() => {
        this.snackbar = {
          show: true,
          color: 'success',
          message: 'Logged out successfully.',
        };
        this.$router.replace({ path: '/' });
      }).catch((error) => {
        this.snackbar = {
          show: true,
          color: 'error',
          message: 'Error when logging out.',
        };
      });
    },
  },
  {
    name: 'APP_PAGE_LOADED',
    callback(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e);
      }
    },
  },
  {
    name: 'APP_AUTH_FAILED',
    callback(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e);
      }
      this.$router.push('/login');
      this.$message.error('Token has expired');
    },
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback(msg) {
      this.$message.error(msg);
    },
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback(msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    },
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback(msg) {
      this.$message.success(msg);
    },
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback(msg) {
      this.$message.success(msg);
    },
  },
];

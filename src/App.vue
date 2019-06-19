<template>
  <div id="appRoot">
    <!-- Protected Content -->
    <template v-if="!$route.meta.public">
      <v-app  id="dbspoe" class="app">
        <!-- PRIMARY -->
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="pa-3 app--footer justify-center">
            <span class="caption"> &copy; Imperium {{ new Date().getFullYear() }} </span>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
      </v-app>
    </template>
    <!-- Public Content -->
    <template v-else>
      <transition>
        <keep-alive>
          <v-app  id="dbspoe" class="app">
            <app-toolbar class="app--toolbar"></app-toolbar>
            <router-view :key="$route.fullpath"></router-view>
            <!-- App Footer -->
            <v-footer height="auto" class="pa-3 app--footer justify-center">
              <span class="caption"> &copy; Imperium {{ new Date().getFullYear() }} </span>
            </v-footer>
          </v-app>
        </keep-alive>
      </transition>
    </template>
    <!-- Pop-up messages -->
    <v-snackbar :timeout="3000" multi-line top :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppDrawer from '@/components/ApplicationDrawer.vue';
import AppToolbar from '@/components/ApplicationToolbar.vue';
import AppFab from '@/components/ApplicationFab.vue';
import PageHeader from '@/components/PageHeader.vue';
import AppEvents from './event';
import MutationTypes from '@/state/mutation-types';

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
  },

  data: () => ({
    expanded: true,
    rightDrawer: false,
  }),

  computed: {
    snackbar: {
      get() {
        return this.$store.state.application.snackbar;
      },
      set(value) {
        this.$store.dispatch(MutationTypes.SNACKBAR_SHOW, value);
      },
    },
  },

  created() {
    AppEvents.forEach((item) => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
};
</script>

<style lang="stylus" >
.setting-fab
  top:50%!important;
  right:0;
  border-radius:0
.page-wrapper
  min-height:calc(100vh - 64px - 50px - 81px );

.theme--light.v-footer
  background: #fafafa;

#nprogress .bar {
  background: yellow;
}

#nprogress .spinner-icon {
  border-top-color: #CCC;
  border-left-color: #CCC;
}
</style>

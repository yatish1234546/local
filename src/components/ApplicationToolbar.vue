<template lang="html">
  <v-toolbar
    dark
    color="primary"
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
    flat
    class="custom"
  >
    <v-toolbar-title class="ml-0 pl-1">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="authenticated">
      </v-toolbar-side-icon>
      <v-toolbar-side-icon color="amber lighten-2">
        <img src="/img/logo.svg" width="32" height="32" />
      </v-toolbar-side-icon>
      <span class="hidden-sm-and-down branding headline font-weight-black">
        IMPERIUM
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon v-if="authenticated">
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-menu
      v-if="authenticated"
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon large flat slot="activator">
        <v-avatar size="32">
          <v-icon>person</v-icon>
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item, index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import MutationTypes from '@/state/mutation-types';

export default {
  name: 'application-toolbar',
  data() {
    return {
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: (e) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log(e);
            }
            window.getApp.$emit('APP_LOGOUT');
          },
        },
      ],
    };
  },
  computed: {
    drawer: {
      set(v) {
        this.$store.commit(MutationTypes.SET_DRAWER_STATE, v);
      },
      get() {
        return this.$store.getters.drawer;
      },
    },
    authenticated: {
      get() {
        return this.$store.getters.isAuthenticated;
      },
    },
    userName: {
      get() {
        return this.$store.getters.name;
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.branding
  color: #ffd54f;
</style>

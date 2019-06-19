<template lang="html">
  <v-navigation-drawer
    id="appDrawer"
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
    class="grey lighten-5"
  >
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense>
        <template v-for="item in filteredMenuItems(items)">
          <!-- Top-Level GROUP -->
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.id"
            :prepend-icon="item.icon"
            :append-icon="item['icon-alt']"

          >
            <v-list-tile slot="activator" :to="item.uri" class="tile">
              <v-list-tile-content>
                <v-list-tile-title class="text-uppercase">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <template v-for="child in filteredMenuItems(item.children)">
              <!-- Child-Level GROUP -->
              <v-list-group
                v-if="child.children"
                v-model="child.model"
                :key="child.id"
                :prepend-icon="child.icon"
                :append-icon="child['icon-alt']"
                sub-group
              >
                <v-list-tile slot="activator" class="tile">
                  <v-list-tile-content>
                    <v-list-tile-title class="text-uppercase">
                      {{ child.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <template v-for="gchild in filteredMenuItems(child.children)">
                  <!-- Grandchild-Level Item -->
                  <v-list-tile
                    v-if="hasAccess(gchild)"
                    :key="gchild.id"
                    :to="gchild.uri"
                    active-class="router-link-match"
                    class="tile"
                  >
                    <v-list-tile-action>
                      <v-icon>{{ gchild.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-uppercase">
                        {{ gchild.text }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list-group>
              <!-- Child-Level Item -->
              <v-list-tile
                v-else-if="hasAccess(child)"
                :key="child.id"
                :to="child.uri"
                active-class="router-link-match"
                class="tile"
              >
                <v-list-tile-action>
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="text-uppercase">
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list-group>

          <!-- Top-Level ITEM -->
          <v-list-tile
            v-else-if="hasAccess(item)"
            :key="item.id"
            :to="item.uri"
            active-class="router-link-match"
            class="tile"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-uppercase">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import _ from 'lodash';
import MutationTypes from '@/state/mutation-types';
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'application-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      items: menu,
      mini: true,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
    };
  },
  methods: {
    getLink(item) {
      if (item.navigate) {
        return item.uri;
      }

      return '#';
    },
    hasAccess(item) {
      if (!item.meta) {
        return false;
      }

      const urs = this.userRoles;
      const rolesWithAccess = item.meta.access;
      const intrs = _.intersection(rolesWithAccess, urs);
      if (intrs && intrs.length) {
        return true;
      }

      return false;
    },
    filteredMenuItems(itemsArray) {
      const fa = [];
      const urs = this.userRoles;
      for (const item of itemsArray) {
        if (this.hasAccess(item)) {
          fa.push(item);
        }
      }

      return fa;
    },
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
    userRoles: {
      get() {
        return this.$store.getters.userRoles;
      },
    },
  },
};
</script>

<style lang="stylus">
#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto
.router-link-match
  background-color: var(--v-secondary-base)
  color: #FFF
  :hover
    color: #000
</style>

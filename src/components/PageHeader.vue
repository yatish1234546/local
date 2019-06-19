<template>
  <div class="">
    <div class="">
      <v-breadcrumbs :items="breadcrumbs()">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
        <template v-slot:item="props">
          <a :href="props.item.href" class="caption" :class="[props.item.disabled && 'disabled']">
            {{ props.item.text }}
          </a>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="secondary pa-3 ma-0 text-uppercase white--text">
      <span class="title">{{ computedTitle }}</span>
    </div>
  </div>
</template>

<script>
import { routeMap } from '@/api/menu';
import _ from 'lodash';

export default {
  props: {},
  methods: {
    breadcrumbs() {
      let crumbs = [];
      const { path } = this.$route;
      this.getCrumbs(path, crumbs);
      crumbs = _.reverse(crumbs);
      return crumbs;
    },
    getCrumbs(path, crumbs) {
      if (path) {
        const item = routeMap[path];
        crumbs.push({ text: item.text, href: path, disabled: !item.navigate });
        if (item.parent) {
          this.getCrumbs(item.parent, crumbs);
        }
      }
    },
  },
  computed: {
    computedTitle() {
      return routeMap[this.$route.path].text;
    },
  },
};
</script>
<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
    text-decoration: none
</style>

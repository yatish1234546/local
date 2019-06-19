import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import MaterialColors from 'vuetify/es5/util/colors';
import 'vuetify/src/stylus/app.styl';
import '../theme/default.styl';

Vue.use(Vuetify, {
  theme: {
    primary: '#002F6C', // '#002F6C',
    secondary: MaterialColors.lightBlue.darken4,
    accent: MaterialColors.grey.base,
    error: MaterialColors.red.base,
    warning: MaterialColors.orange.base,
    info: MaterialColors.indigo.base,
    success: MaterialColors.lightGreen.base,
  },
  options: {
    customProperties: true,
  },
  iconfont: 'fa',
});

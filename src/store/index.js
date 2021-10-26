import Vue from "vue";
import Vuex from "vuex";

import lang from "./modules/lang/index.js";
import auth from "./modules/Auth/index.js";
import theme from "./modules/Theme/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lang_module: lang,
    theme_module: theme,
    auth_module: auth,
  },

  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
});

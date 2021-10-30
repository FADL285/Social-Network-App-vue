import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

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
    return {
      posts: [],
    };
  },
  getters: {
    posts(state) {
      return state.posts;
    },
  },
  mutations: {
    getPosts(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    getPosts(context) {
      axios({
        method: "get",
        url: "posts",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
      })
        .then((res) => {
          context.commit("getPosts", res.data.data);
        })
        .catch((err) => {});
    },
  },
});

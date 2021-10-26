// ======== core Vue
import Vue from "vue";

// ======== Main app
import App from "./App.vue";

// ======== Router
import router from "./router";

// ======== Store
import store from "./store";

// ======== Axios
import axios from "axios";
Vue.prototype.$axios = axios; // Glopal variable
axios.defaults.baseURL = "https://inflco.o.aait-d.com/dashboard"; // baseurl

axios.defaults.headers.common = {
  "cache-control": "no-cache",
  "Content-type": "multipart/form-data",
  Accept: "application/json",
  "Accept-language": store.getters["lang_module/lang"], // ==> Store (Vuex) <==
};
// Token
if (store.getters.token) {
  axios.defaults.headers.common["Authorization"] =
    "bearer" + store.getters.token;
}

// ======== Bootstrap
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
Vue.use(BootstrapVue);

// ======== iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
Vue.prototype.$iziToast = iziToast; // Glopal variable
Vue.use(iziToast);

// ======== Moment
const moment = require("moment");
if (store.getters["lang_module/lang"] == "ar") {
  require("moment/locale/ar");
}
Vue.use(require("vue-moment"), {
  moment,
});

// ======== AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

// ======== i18n
import i18n from "./i18n";

// ======= vuetify
import vuetify from "./plugins/vuetify";

// =============> Vue Slike Carousal
import "vue-slick-carousel/dist/vue-slick-carousel.css";

// ========  Main Style
import "./assets/scss/main.scss";

// =============> Google Maps
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: "AIzaSyB4DDathvvwuwlwnUu7F4Sow3oU22y5T1Y",
    libraries: "places", // This is required if you use the Auto complete plug-in
  },
});

import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

// Import Globbal Components

// Register Globbal Components

// ======== Attatch and Mount
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

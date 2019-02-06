import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/state/store";
import axios from "@/core/baseAxios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

/*
4) Полоса загрузки
5) Страница 404
*/
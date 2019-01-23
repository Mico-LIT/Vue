import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/state/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

/*
1) Переннести views to router
2) Что делать оберткой? baseAxios. сделать более гибко! подумать о this.$http
3) Авторизация из разряда когда делам запрос Post и токен протух
4) Полоса загрузки
5) Страница 404
*/
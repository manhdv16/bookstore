import App from "./App.vue";
import router from "./router";

window.axios = require("axios");

import { createApp } from "vue";
import Vuex from "vuex";
const store = new Vuex.Store({
  state: {
    token: null,
    roles: [],
    baseURL: null,
    categories: [],
  },
  getters: {
    token: (state) => state.token,
    baseURL: (state) => state.baseURL,
  },
  mutations: {
    setToken(state, { token, listRoles }) {
      state.token = token;
      state.roles = listRoles;
      localStorage.setItem("token", token);
      localStorage.setItem("listRoles", listRoles);
    },
    clearToken(state) {
      state.token = null;
      state.roles = [];
      localStorage.removeItem("token");
      localStorage.removeItem("listRoles");
    },
    setCategories(state, { categories }) {
      state.categories = categories;
    },
    setBaseURL(state, { baseURL }) {
      state.baseURL = baseURL;
    },
  },
});
const app = createApp(App);
app.use(Vuex);
app.use(store);
app.use(router).mount("#app");

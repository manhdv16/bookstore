<template>
  <navigations />

  <div style="min-height: 60vh">
    <router-view v-if="books && categories"> </router-view>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    navigations: Nav,
  },
  data() {
    return {
      // baseURL: "https://bebookstore-production.up.railway.app/",
      baseURL: "https://bebookstore-production-6e3c.up.railway.app/",
      // baseURL: "http://localhost:8088/",
      books: null,
      categories: null,
    };
  },
  methods: {
    async viewHome() {
      await axios
        .get(`${this.baseURL}api/v1/view-home`)
        .then((res) => {
          this.categories = res.data.categories;
          this.books = res.data.books;
        })
        .catch(() => {
          console.log("err");
        });
    },
  },
  mounted() {
    this.$store.commit("setBaseURL", {
      baseURL: this.baseURL,
    });
    this.viewHome();
  },
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>

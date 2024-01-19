<template>
  <navigations />

  <div style="min-height: 60vh">
    <router-view v-if="books && categories" :baseURL="baseURL"> </router-view>
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
      baseURL: "https://bebookstore-production.up.railway.app/",
      books: null,
      categories: null,
    };
  },
  methods: {
    fetchData() {
      axios
        .get(`${this.baseURL}api/v1/books`)
        .then((res) => {
          this.books = res.data.sort((a, b) => {
            return b.sold - a.sold;
          });
          console.log("books app: ", this.books);
          this.$store.commit("setBooks", this.books);
        })
        .catch((err) => {
          console.log("get book error", err);
        });

      axios
        .get(`${this.baseURL}api/v1/categories`)
        .then((res) => {
          this.categories = res.data;
          this.$store.commit("setCategories", res.data);
        })
        .catch((err) => {
          console.log("get category error", err);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>

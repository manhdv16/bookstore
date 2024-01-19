<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{ category.categoryName }}</h4>
        <h5>{{ msg }}</h5>
      </div>
    </div>

    <div class="row">
      <div
        v-for="book of category.books"
        :key="book.bookId"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <BookBox :book="book"> </BookBox>
      </div>
    </div>
  </div>
</template>

<script>
import BookBox from "../../components/Book/BookBox.vue";
export default {
  name: "ListBooks",
  data() {
    return {
      id: null,
      categoryIndex: null,
      category: {},
      len: 0,
      msg: null,
    };
  },
  components: { BookBox },
  mounted() {
    this.id = this.$route.params.id;
    this.categories = this.$store.state.categories;
    this.categoryIndex = this.categories.findIndex(
      (category) => category.id == this.id
    );
    this.category = this.categories[this.categoryIndex];

    this.len = this.category.products.length;
    if (this.len == 0) {
      this.msg = "Sorry, no products found";
    } else if (this.len == 1) {
      this.msg = "Only 1 product found";
    } else {
      this.msg = this.len + " products found";
    }
  },
};
</script>

<style scoped>
h4 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}

h5 {
  font-family: "Roboto", sans-serif;
  color: #686868;
  font-weight: 300;
}
</style>

<template>
  <div class="adminPanel container">
    <router-link
      v-for="item in adminLinks"
      :key="item.name"
      :to="{ name: item.name }"
    >
      <button type="button" class="btn btn-primary btn-lg">
        {{ item.label }}
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminLinks: [
        { name: "AdminBook", label: "Admin Book" },
        { name: "AdminCategory", label: "Admin Category" },
        { name: "AdminOrder", label: "Admin Order" },
      ],
    };
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: "Signin" });
    }
  },
};
</script>

<style>
.adminPanel {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adminPanel button {
  font-size: 30px;
  width: fit-content;
  margin: 55px 0;
}
</style>

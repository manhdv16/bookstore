<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Change password</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Old password</label>
            <input type="password" class="form-control" />
          </div>
          <div class="form-group">
            <label>New password</label>
            <input type="password" class="form-control" v-model="newPass" />
          </div>
          <div class="form-group">
            <label>Re-enter password</label>
            <input type="password" class="form-control" v-model="reNewPass" />
          </div>

          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              v-model="address"
              required
              :disabled="!isEdit"
            />
          </div>
          <button
            v-if="!isEdit"
            type="button"
            class="btn btn-primary"
            @click="handleChangePassword"
          >
            Save change password
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPass: "",
      newPass: "",
      reNewPass: "",
    };
  },
  methods: {
    handleChangePassword() {
      // if(this.oldPass)
    },
  },
};
</script>
<style scoped>
h4 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}
.btn {
  margin-top: 10px;
  margin-right: 1rem;
}

.btn-primary {
  background-color: rgb(12, 12, 231);
  color: white;
  font-size: 15px;
}
</style>

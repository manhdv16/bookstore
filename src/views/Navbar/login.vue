<template>
  <div class="container">
    <div class="row login-container">
      <div class="col-sm-12">
        <h3 class="text-center">Login</h3>
        <form @submit.prevent="loginUser" class="login-form">
          <!-- Username Field -->
          <div class="form-group">
            <label for="username" class="font-weight-bold">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              name="username"
              placeholder="Enter Username"
              required
              autocomplete="current-username"
            />
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="font-weight-bold">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              name="password"
              placeholder="Enter password"
              required
              autocomplete="current-password"
            />
          </div>

          <div class="d-grid">
            <button type="button" class="btn btn-primary" @click="handleLogin">
              Login
            </button>
          </div>

          <div class="d-grid">
            <button
              type="button"
              class="btn btn-primary"
              @click="redirectToRegister"
            >
              Register
            </button>
          </div>

          <hr class="my-4" />

          <!-- <div class="d-grid mb-2">
            <button
              @click.prevent="signInWithGoogle"
              class="btn btn-google btn-login text-uppercase fw-bold"
            >
              <i class="fab fa-google me-2"></i> Sign in with Google
            </button>
            <social-login :providers="['google']" @login="signInWithGoogle">
              <button>Login with Google</button>
            </social-login>
          </div> -->

          <!-- <div class="d-grid">
            <button
              @click.prevent="signInWithFacebook"
              class="btn btn-facebook btn-login text-uppercase fw-bold"
            >
              <i class="fab fa-facebook-f me-2"></i> Sign in with Facebook
            </button>
          </div> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    redirectToRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      const userData = {
        userName: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:8088/api/v1/signin", userData)
        .then((res) => {
          console.log("userForm: ", res.data);
          this.$store.commit("setToken", {
            token: res.data.token,
            listRoles: res.data.listRoles,
          });
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed");
        });
    },
    // signInWithGoogle() {
    //   window.location.href =
    //     "http://localhost:8088/oauth2/authorization/google";
    // },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
}

.login-container {
  border: 1px solid darkgrey;
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
  padding: 20px;
}

.login-form {
  margin-top: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.btn {
  margin-top: 10px;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.float-left {
  float: left;
  clear: left;
  font-weight: bold;
}

.btn-google {
  color: white !important;
  background-color: #ea4335;
}

.btn-facebook {
  color: white !important;
  background-color: #3b5998;
}
.d-grid {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
}
</style>

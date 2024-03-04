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
              autocomplete="current-username"
            />
            <small v-if="!isFilled && username === ''" class="text-danger"
              >Please enter username</small
            >
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
              autocomplete="current-password"
            />
            <small v-if="!isFilled && password === ''" class="text-danger"
              >Please enter password</small
            >
          </div>
          <div class="center-container">
            <button type="button" class="btn btn-primary" @click="handleLogin">
              Login
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="redirectToRegister"
            >
              Register
            </button>
          </div>
          <div class="center-container">
            <button class="btn btn-google" @click="signInWithGoogle">
              Login with Google
            </button>
          </div>
          <div class="center-container">
            <router-link :to="{ name: 'ForgotPassword' }"
              >Forgot Password</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { googleTokenLogin } from "vue3-google-login";
export default {
  data() {
    return {
      username: "",
      password: "",
      isFilled: true,
    };
  },
  methods: {
    redirectToRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      if (this.username === "" || this.password === "") {
        this.isFilled = false;
        return;
      }
      const userData = {
        userName: this.username,
        password: this.password,
      };
      axios
        .post(`${this.$store.state.baseURL}api/v1/signin`, userData)
        .then((res) => {
          this.$store.commit("setToken", {
            token: res.data.token,
            listRoles: res.data.listRoles,
          });
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          alert("Username or password is incorrect");
        });
    },
    signInWithGoogle() {
      googleTokenLogin()
        .then((res) => {
          axios
            .get(
              "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
                res.access_token
            )
            .then((response) => {
              const form = {
                userName: response.data.name,
                email: response.data.email,
              };
              // form.append("email", response.data.email);
              // form.append("userName", response.data.name);
              console.log("User info: ", response.data);
              axios
                .post(
                  `${this.$store.state.baseURL}api/v1/login-by-google`,
                  form
                )
                .then((res) => {
                  console.log("res server: ", res.data);
                  this.$store.commit("setToken", {
                    token: res.data.token,
                    listRoles: res.data.listRoles,
                  });
                  this.$router.push({ name: "Home" });
                });
            })
            .catch((error) => {
              console.log("Error", error);
            });
        })
        .catch((error) => {
          console.log("Error getting user info: ", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
}
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
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
  padding: 10px 20px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.btn-primary {
  background-color: #0664a3;
  color: #ffffff;
}

.btn-google {
  background-color: #dd4b39;
  color: #ffffff;
}

.router-link-exact-active {
  font-weight: bold;
}
.float-left {
  float: left;
  clear: left;
  font-weight: bold;
}
</style>

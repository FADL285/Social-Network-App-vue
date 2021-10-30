<template>
  <div class="login auth">
    <div class="row">
      <div class="col-lg-6 d-none d-lg-block">
        <div class="container bg_section">
          <header class="login_header">
            <h3>Web App</h3>
            <h1>Find Friends & Get Inspiration</h1>
          </header>

          <img src="../../../assets/images/Login/Login.png" />
        </div>
      </div>

      <div class="col-lg-6 col-12">
        <div class="container form_section">
          <p class="create_section">
            Don't have account?
            <router-link class="link" to="/signUp">Creat Now</router-link>
          </p>

          <main>
            <h2 class="mainColor">log In Now</h2>

            <div class="input_wrapper">
              <label>Email Address</label>
              <input type="email" v-model="data.email" />
            </div>
            <div class="input_wrapper moreInfo">
              <div class="labe_container">
                <label>Password</label>
                <label
                  ><router-link class="mainColor" to="/forgetPassowrd"
                    >Forgot Password?</router-link
                  ></label
                >
              </div>
              <input type="password" v-model="data.password" />
            </div>

            <v-btn
              @click="submitForm"
              :loading="btn_loaidng"
              class="mainButton large_button my-1"
            >
              Sign In
            </v-btn>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // loading
      btn_loaidng: false,

      data: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    submitForm() {
      if (this.data.email == null) {
        this.$iziToast.warning({
          title: "warnning",
          message: "usernam or email is required",
        });
      } else if (this.data.password == null) {
        this.$iziToast.warning({
          title: "warnning",
          message: "password is requierd",
        });
      } else {
        this.btn_loaidng = true;

        // let my_data = new FormData();
        // my_data.append("username", this.data.email);
        // my_data.append("password", this.data.password);

        let my_data = {
          email: this.data.email,
          password: this.data.password,
        };

        this.$axios({
          method: "post",
          url: "login",
          headers: {
            "cache-control": "no-cache",
            "content-type": "application/json",
            Accept: "application/json",
          },
          data: my_data,
        })
          .then((res) => {
            this.btn_loaidng = false;

            this.$iziToast.success({
              title: "success",
              message: "login in success",
            });
            this.$store.dispatch("auth_module/set_token", res.data.token);
            this.$router.push("/");
          })
          .catch(() => {
            this.btn_loaidng = false;
            this.$iziToast.error({
              title: "warnning",
              // message: err.response.data.message,
            });
          });
      }
    },
  },
};
</script>

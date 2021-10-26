<template>
  <div class="login">
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
            <h2 class="mainColor">Sign In Now</h2>

            <div class="input_wrapper">
              <label>Email Address</label>
              <input type="text" v-model="data.email" />
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
              <input type="text" v-model="data.password" />
            </div>

            <v-btn
              @click="submitForm"
              :loading="btn_loaidng"
              class="mainButton large_button my-5"
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
        this.$store.dispatch("auth_module/set_token", "adkjdsbjkbdskdvsk");

        setTimeout(() => {
          this.btn_loaidng = false;
          this.$iziToast.success({
            title: "success",
            message: "login in success",
          });
          this.$router.push("/");
        }, 1000);

        // let my_data = new FormData();
        // my_data.append("username", this.data.email);
        // my_data.append("password", this.data.password);

        // this.$axios({
        //   method: "post",
        //   url: "login",
        //   headers: {
        //     "cache-control": "no-cache",
        //     "content-type": "application/json",
        //     Accept: "application/json",
        //     "Accept-language": this.$store.getters["lang_module/lang"], // ==> Store (Vuex) <==
        //   },
        //   data: my_data,
        // })
        //   .then((res) => {
        //     this.btn_loaidng = false;
        //     this.$iziToast.success({
        //       title: this.$t("validation.success"),
        //       message: "login in success",
        //     });
        //     this.$store.dispatch("auth_module/set_token", res.data.data.token);

        //     // localStorage.setItem("socialApp_user_img", res.data.data.image);
        //     // localStorage.setItem("socialApp_user_id", res.data.data.id);

        //     this.$router.push("/");
        //   })
        //   .catch((err) => {
        //     this.btn_loaidng = false;
        //     this.$iziToast.error({
        //       title: this.$t("validation.error"),
        //       message: err.response.data.message,
        //     });
        //   });
      }
    },
  },
};
</script>

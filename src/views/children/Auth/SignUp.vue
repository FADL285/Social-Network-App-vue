<template>
  <div class="signUp auth">
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
            already have an account?
            <router-link class="link" to="/login">Sign In</router-link>
          </p>

          <main>
            <h2 class="mainColor">Sign In Now</h2>

            <div class="input_wrapper">
              <label>Name</label>
              <input type="text" v-model="data.name" />
            </div>
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
        name: null,
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
      } else if (this.data.name == null) {
        this.$iziToast.warning({
          title: "warnning",
          message: "name is requierd",
        });
      } else if (this.data.password == null) {
        this.$iziToast.warning({
          title: "warnning",
          message: "password is requierd",
        });
      } else {
        this.btn_loaidng = true;

        // let my_data = new FormData();
        // my_data.append("name", this.data.name);
        // my_data.append("email", this.data.email);
        // my_data.append("password", this.data.password);

        let my_data = {
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
        };

        this.$axios({
          method: "post",
          url: "register",
          headers: {
            "cache-control": "no-cache",
            "content-type": "application/json",
            Accept: "application/json",
          },
          data: my_data,
        })
          .then(() => {
            this.btn_loaidng = false;

            this.$iziToast.success({
              title: "success",
              message: "signup in success",
            });

            this.$router.push("/login");
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
Pa$$w0rd!

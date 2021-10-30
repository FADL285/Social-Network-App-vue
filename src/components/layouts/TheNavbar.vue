<template>
  <b-navbar id="navbar" toggleable="lg">
    <div class="container">
      <!-- LOGO -->
      <router-link class="logo" to="/"> SpcialApp </router-link>

      <!-- Collapse Button -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Small Screen Menue -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link to="/">
              <span><i class="fas fa-home"></i></span>
            </router-link>
          </li>
          <li @click="openPopup" class="nav-item">
            <span><i class="fal fa-plus-square"></i></span>
          </li>
        </b-navbar-nav>

        <div class="dropDown">
          <div class="user dropDowncontainer">
            <div class="image">
              <img @click.stop="toggle_dropDownProfile" :src="userImg" />

              <transition name="fadeIn">
                <ul v-if="showDropDownProfile" class="dropDownProfile">
                  <router-link to="/profile">
                    <li class="first">
                      <span class="text">Profile</span>
                      <span class="icon"><i class="fas fa-user"></i></span>
                    </li>
                  </router-link>
                  <li @click="logOut" class="second">
                    <span class="text">LogOut</span>
                    <span class="icon"
                      ><i class="fas fa-sign-out-alt"></i
                    ></span>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>

    <main-pop-up @closePop="closePopup" :show="show">
      <div class="input_wrapper">
        <input @keydown.enter="createPost" type="text" v-model="post_body" />
        <v-btn
          @click="createPost"
          :loading="btn_loaidng"
          class="mainButton my-1"
        >
          <i class="far fa-paper-plane"></i>
        </v-btn>
      </div>
    </main-pop-up>
  </b-navbar>
</template>

<script>
import MainPopUp from "../Global/MainPopUp.vue";
export default {
  components: { MainPopUp },

  data() {
    return {
      btn_loaidng: false,

      show: false,

      post_body: "",

      showDropDownProfile: false,
    };
  },

  computed: {
    userImg() {
      return (
        localStorage.getItem("Kanaf_user_img") ||
        require("@/assets/images/Users/avatar_placholder_2.svg")
      );
    },
  },

  methods: {
    closePopup() {
      this.show = false;
    },

    openPopup() {
      this.show = true;
    },

    createPost() {
      this.btn_loaidng = true;

      let my_data = {
        body: this.post_body,
      };

      this.$axios({
        method: "post",
        url: "posts",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
        data: my_data,
      })
        .then(() => {
          this.$store.dispatch("getPosts");
          this.closePopup();
          this.btn_loaidng = false;
          this.post_body = "";
        })
        .catch(() => {
          this.btn_loaidng = false;
          this.post_body = "";
        });
    },

    setBodyTopPadding() {
      const TheNavbar = document.getElementById("navbar");
      const BODY = document.querySelector("body");
      BODY.style.paddingTop = TheNavbar.clientHeight + 25 + "px";
    },

    toggle_dropDownProfile() {
      this.showDropDownProfile = !this.showDropDownProfile;
    },

    logOut() {
      this.$store.dispatch("auth_module/remove_token");
      location.reload();
    },
  },

  mounted() {
    this.setBodyTopPadding();

    document.querySelector("body").addEventListener("click", () => {
      this.showDropDown = false;
      this.showDropDownProfile = false;
    });
  },
};
</script>

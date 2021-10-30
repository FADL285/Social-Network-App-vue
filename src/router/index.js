import Vue from "vue";
import VueRouter from "vue-router";

/******************* start Views *******************/
import Home from "../views/Home.vue"; // Home

// Children
import HomePage from "../views/children/HomePage.vue";
import EditProfile from "../views/children/EditProfile.vue";
import Profile from "../views/children/Profile.vue";
import ShowFriends from "../views/children/ShowFriends.vue";

// =============== Auth
import Login from "../views/children/Auth/Login.vue";
import SignUp from "../views/children/Auth/SignUp.vue";

// =============== NotFound
import NotFound from "../views/NotFound.vue";

/******************* End Views *******************/

// Vuex store
import store from "../store/index";

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
  routes: [
    //Main
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          name: "HomePage",
          component: HomePage,
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: "editProfile",
          name: "EditProfile",
          component: EditProfile,
        },
        {
          path: "showFriends",
          name: "ShowFriends",
          component: ShowFriends,
        },
      ],
    },

    // Auth
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signUp",
      name: "SignUp",
      component: SignUp,
    },

    // NotFound
    { path: "/:notFound(.*)", name: "NotFound", component: NotFound },
  ],
});

router.beforeEach((to, _2, next) => {
  if (
    !store.getters["auth_module/token"] &&
    to.name != "Login" &&
    to.name != "SignUp"
  ) {
    next({ path: "/login" });
  } else if (
    store.getters["auth_module/token"] &&
    (to.name == "Login" || to.name == "SignUp")
  ) {
    next("/");
  } else {
    next();
  }
});

Vue.use(VueRouter);
export default router;

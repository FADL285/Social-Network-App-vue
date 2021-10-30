<template>
  <div>
    <the-navbar></the-navbar>
    <transition name="fadeInUp" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavbar from "../components/layouts/TheNavbar.vue";
export default {
  components: { TheNavbar },
  name: "Home",
};
</script>

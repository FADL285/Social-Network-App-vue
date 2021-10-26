<template>
  <div>
    <transition name="fadeInUp" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

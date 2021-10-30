<template>
  <div class="friend post">
    <div class="user">
      <img
        :src="friend.avatar || require('@/assets/images/Users/user_avatar.png')"
      />
      <div class="text">
        <h3 class="h_3">{{ friend.name }}</h3>
        <!-- <span class="_title">New Yourk</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["friend"],
};
</script>

<style lang="scss" scoped>
.friend {
  margin: 15px 0;
}
</style>

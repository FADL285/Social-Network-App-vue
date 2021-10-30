<template>
  <div class="homePage px-5">
    <div class="row">
      <div class="col-lg-8 col-12">
        <post
          @postDeleted="$store.dispatch('getPosts')"
          v-for="post in posts"
          :key="post.id"
          :post="post"
        ></post>
      </div>
      <div class="col-lg-4">
        <h2 class="h_2">All Users</h2>
        <friend
          :friend="friend"
          v-for="friend in friends"
          :key="friend.id"
        ></friend>
      </div>
    </div>
  </div>
</template>

<script>
import Friend from "../../components/Global/Friend.vue";
import Post from "../../components/Global/Post.vue";

export default {
  components: { Post, Friend },

  data() {
    return {
      friends: [],
    };
  },

  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },

  methods: {
    getFriends() {
      this.$axios({
        method: "get",
        url: "users",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          this.friends = res.data.data;
        })
        .catch((err) => {});
    },
  },

  created() {
    this.getFriends();
    this.$store.dispatch("getPosts");
  },
};
</script>

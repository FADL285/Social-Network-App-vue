<template>
  <div class="post custome_card">
    <span @click="deletePost(post.id)" class="delete"
      ><i class="far fa-trash"></i
    ></span>

    <div class="user">
      <img
        :src="
          post.user.avatar || require('@/assets/images/Users/user_avatar.png')
        "
      />
      <div class="text">
        <h3 class="h_3">{{ post.user.name }}</h3>
        <!-- <span class="_title">New Yourk</span> -->
      </div>
    </div>

    <div class="post_body">
      <!-- <img src="../../assets/images/post_placholder.png" /> -->
      <p class="para post my-5 ml-2">{{ post.body }}</p>
    </div>

    <div class="actions">
      <div class="like">
        <span
          @click="toggle_like(post.id)"
          class="icon"
          :class="{ colored: likeState }"
          ><i class="fas fa-heart"></i
        ></span>
        <span class="count">{{ post.likes }}</span>
      </div>

      <div class="comment">
        <span @click="toggle_comments_visibilty" class="icon"
          ><i class="far fa-comment-dots"></i
        ></span>
        <span class="count">{{ post.comments.length }}</span>
      </div>
    </div>

    <transition name="fadeInUp" mode="out-in">
      <div class="comments" v-if="commentsVisible">
        <div class="comment" v-for="comment in post.comments" :key="comment.id">
          <div class="user">
            <img
              :src="
                comment.user.avatar ||
                require('@/assets/images/Users/user_avatar.png')
              "
            />
            <div class="text">
              <h4 class="h_4">{{ comment.body }}</h4>
            </div>
          </div>
        </div>

        <div class="addComment">
          <div class="input_wrapper">
            <input
              @keydown.enter="sendComment(post.id)"
              type="text"
              v-model="comment_text"
            />
          </div>
          <v-btn
            @click="sendComment(post.id)"
            :loading="btn_loaidng"
            class="mainButton my-1"
          >
            <i class="far fa-paper-plane"></i>
          </v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["post"],

  data() {
    return {
      btn_loaidng: false,

      likeState: this.post.liked,
      commentsVisible: false,

      comment_text: "",
    };
  },

  methods: {
    toggle_like(id) {
      if (this.likeState == false) {
        this.likeState = true;
        this.post.likes++;
      } else {
        this.likeState = false;
        this.post.likes--;
      }
      this.likePost(id);
    },

    toggle_comments_visibilty() {
      this.commentsVisible = !this.commentsVisible;
    },

    likePost(id) {
      let my_data = {
        post_id: id,
      };

      this.$axios({
        method: "post",
        url: "like",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
        data: my_data,
      })
        .then(() => {})
        .catch(() => {});
    },

    deletePost(id) {
      this.$axios({
        method: "delete",
        url: `posts/${id}`,
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
      })
        .then(() => {
          this.$emit("postDeleted");
        })
        .catch(() => {});
    },

    sendComment(id) {
      this.btn_loaidng = true;

      let my_data = {
        post_id: id,
        body: this.comment_text,
      };

      this.$axios({
        method: "post",
        url: "comment",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("project_token"),
        },
        data: my_data,
      })
        .then((res) => {
          this.post.comments = res.data.data.comments;

          this.btn_loaidng = false;
          this.comment_text = "";
        })
        .catch(() => {
          this.btn_loaidng = false;
          this.comment_text = "";
        });
    },
  },
};
</script>

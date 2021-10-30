<template>
  <!-- <teleport to="body"> -->
  <transition name="fadeInUp">
    <div @click="closePopup" v-if="show" class="pop_container">
      <main @click.stop class="pop_body">
        <slot></slot>
      </main>
    </div>
  </transition>
  <!-- </teleport> -->
</template>

<script>
export default {
  name: "Popup",

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["closePopup"],

  methods: {
    closePopup() {
      this.$emit("closePop");
    },
  },
};
</script>

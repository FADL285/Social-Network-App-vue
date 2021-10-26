export default {
  set_token(state, payload) {
    state.token = payload;
  },

  remove_token(state) {
    state.token = "";
  },
};

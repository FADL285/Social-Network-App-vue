export default {
  set_token(context, payload) {
    localStorage.setItem("project_token", payload);
    context.commit("set_token", payload);
  },

  remove_token(context) {
    localStorage.removeItem("project_token");
    context.commit("remove_token");
  },
};

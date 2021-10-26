export default {
  handleTheme(context) {
    let theme = context.getters.current_theme;
    let default_theme = context.getters.default_theme;

    if (!theme) {
      theme = default_theme;
      localStorage.setItem("project_theme", default_theme);
      context.commit("changeTheme", theme);
    }

    if (theme == "light") {
      document.querySelector("html").classList.remove("darkTheme");
      document.querySelector("html").classList.add("lightTheme");
    } else if (theme == "dark") {
      document.querySelector("html").classList.remove("lightTheme");
      document.querySelector("html").classList.add("darkTheme");
    }
  },

  changeTheme(context) {
    let theme;

    if (context.getters.current_theme == "light") {
      localStorage.setItem("project_theme", "dark");
      document.querySelector("html").classList.remove("lightTheme");
      document.querySelector("html").classList.add("darkTheme");
      theme = "dark";
    } else if (context.getters.current_theme == "dark") {
      localStorage.setItem("project_theme", "light");
      document.querySelector("html").classList.remove("darkTheme");
      document.querySelector("html").classList.add("lightTheme");
      theme = "light";
    }

    context.commit("changeTheme", theme);
    context.dispatch("handleTheme");
  },
};

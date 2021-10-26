import i18n from "../../../i18n";

export default {
  handleLang(context) {
    let lang = context.getters.lang;
    let default_lang = context.getters.default_lang;

    if (!lang) {
      lang = default_lang;
      localStorage.setItem("project_lang", default_lang);
      context.commit("switchLang", lang);
      i18n.locale = default_lang;
    } else {
      localStorage.setItem("project_lang", lang);
      context.commit("switchLang", lang);
      i18n.locale = lang;
    }

    if (lang == "ar") {
      document.querySelector("body").classList.add("rtl");
      document.querySelector("body").classList.remove("ltr");
    } else if (lang == "en") {
      document.querySelector("body").classList.add("ltr");
      document.querySelector("body").classList.remove("rtl");
    }
  },

  switchLang(conetxt) {
    let lang;

    if (conetxt.getters.lang == "ar") {
      localStorage.setItem("project_lang", "en");
      lang = "en";
    } else if (conetxt.getters.lang == "en") {
      localStorage.setItem("project_lang", "ar");
      lang = "ar";
    }

    i18n.locale = lang;
    conetxt.commit("switchLang", lang);
    location.reload();
  },
};

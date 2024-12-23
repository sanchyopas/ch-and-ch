import {LOCALE_EN} from "./functions.js";

export const updateLanguageSettings = (local, nodeList) => {
  localStorage.setItem("locale", local);
  nodeList?.forEach(link => {
    link.href = local;
  })
}

export const checkLocal = (path) => {
  const links = document.querySelectorAll("[data-anchor]");
  const linkTags = document.querySelectorAll(".filter__btn");
  if (path.includes(LOCALE_EN)) {
    updateLanguageSettings(LOCALE_EN, links);
    updateLanguageSettings(LOCALE_EN, linkTags);
  } else {
    updateLanguageSettings("/", links);
    updateLanguageSettings("/", linkTags);
  }
}
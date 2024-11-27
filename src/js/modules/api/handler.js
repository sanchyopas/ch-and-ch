import { fetchData } from "./api.js";
import { renderProjectsGrid } from "./render.js";
import { lockBody, unlockBody, toggleLoader } from "./utils.js";

/**
 *** Данный обработчик выполняет фильтрацию карточек
 * Также задает класс активности кнопкам
 * Показывает загрузчик в момент выполнения запроса к url адресу
 * И в блоке finnally который выполняется не взависимости от ответа сервера
 **/

export const handleTagFilter = async (e, url) => {
  e.preventDefault();
  const tag = e.currentTarget.dataset.tag;
  document.querySelectorAll('.filter__btn').forEach(btn => btn.classList.remove("_active"));
  e.currentTarget.classList.add("_active");

  lockBody();
  toggleLoader(true);

  try {
    const data = await fetchData(url);
    const filteredCards = data.object.cases.filter(item => item.main_screen?.industries[0] === tag);
    renderProjectsGrid(filteredCards);
  } catch (error) {
    console.error("Error filtering cards:", error);
  } finally {
    unlockBody();
    toggleLoader(false);
  }
};

export const handleSaveTagState = (e) => {
  e.preventDefault();
  localStorage.setItem("tag", e.currentTarget.dataset.tag);
  window.location.href = e.currentTarget.href;
};



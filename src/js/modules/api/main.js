import {checkUrlEn} from "./utils.js";
import {fetchData} from "./api.js";
import {renderTags, renderTagsHome, renderProjectsGrid, renderPageInfo} from "./render.js";
import {handleSaveTagState, handleTagFilter, handleTagFilterLink} from "./handler.js";

document.addEventListener('DOMContentLoaded', async () => {
  const url = checkUrlEn();
  try {
    const data = await fetchData(url);
    const {page, cases} = data.object;
    renderTags(page.filter_industries, 'tags', (e) => handleTagFilter(e, url));
    renderTagsHome(page.filter_industries, 'tags-home', (e) => handleSaveTagState(e));

    const tag = localStorage.getItem("tag");
    const buttons = document.querySelectorAll(".filter__btn");

    if(tag) {
      const filteredCases = cases.filter(item => item.main_screen.industries[0] === tag);
      renderProjectsGrid(filteredCases);

      for(const btn of buttons) {
        if(btn.dataset.tag == tag) {
          btn.classList.add("_active");
          break; // нашли первое и остановились
        }
      }
      localStorage.removeItem("tag");
    }else{
      renderProjectsGrid(cases);
    }

  } catch (error) {
    console.error('Error initializing page:', error);
  }
});
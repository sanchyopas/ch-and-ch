import {checkUrlEn} from "./utils.js";
import {fetchData} from "./api.js";
import {renderTags, renderProjectsGrid, renderPageInfo} from "./render.js";
import { handleTagFilter } from "./handler.js";

document.addEventListener('DOMContentLoaded', async () => {
  const url = checkUrlEn();
  try {
    const data = await fetchData(url);
    const {page, cases} = data.object;

    renderPageInfo(page);
    renderTags(page.filter_industries, 'tags', (e) => handleTagFilter(e, url));
    renderProjectsGrid(cases);
  } catch (error) {
    console.error('Error initializing page:', error);
  }
});
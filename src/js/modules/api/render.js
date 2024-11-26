/**
 *** функции отрисовки контента(data) в местах которые указаны(containerId),
 * и навешивание слушателя с функцией которая привяжется в момент создания тегов
 **/

export const renderPageInfo = (data) => {
  const html = `
    <h2 class="projects__title _title">${data.main_screen_title}</h2>
    <p class="projects__subtitle">${data.main_screen_subtitle}</p>`;
  const headSection = document.getElementById("projects-head-section");
  if (headSection) headSection.innerHTML = html;
};

export const renderTags = (tags, containerId, callback) => {
  const container = document.getElementById(containerId);
  if (container && Array.isArray(tags)) {
    const tagsHtml = tags.map(tag => `
      <button type="button" data-tag="${tag.tag}" class="filter__btn">
        ${tag.icon ? `<img src="https://chch.pro/${tag.icon}" alt="${tag.tag}">` : `<img src="img/icons/Restaurant.svg" alt="" />`}
        <span>${tag.tag}</span>
      </button>`).join('');
    container.innerHTML = tagsHtml;
    container.querySelectorAll('.filter__btn').forEach(btn => btn.addEventListener('click', callback));
  }
};

export const renderProjectsGrid = (data) => {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = `<div class="empty">Скоро здесь появятся проекты</div>`;
    grid.classList.add('_no-grid');
    return;
  }

  const gridHtml = data.map(item => `
    <div class="projects__card card">
      <div class="card__bg" style="background-image: url(https://chch.pro/${item.main_screen.preview})"></div>
      <a href="/projects/${item.alias}" class="card__link"></a>
      <div class="card__content">
        <div class="tags">
          ${item.main_screen.preview_tag.map(tag => `
            <a href="" class="tag">
              ${tag.icon ? `<img src="https://chch.pro/${tag.icon}" alt="${tag.tag}">` : ""}
              <span>${tag.tag}</span>
            </a>`).join('')}
        </div>
        <div class="card__count">
          ${item.main_screen.preview_numbers ? `<p class="card__number">${item.main_screen.preview_numbers}</p>` : ""}
          ${item.main_screen.preview_text ? `<p class="card__text">${item.main_screen.preview_text}</p>` : ""}
        </div>
      </div>
    </div>`).join('');

  grid.innerHTML = gridHtml;
  grid.classList.remove('_no-grid');
};
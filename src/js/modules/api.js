import { bodyLock, bodyUnLock } from "./functions.js"
import { followTheLink } from "./follow_link.js";

const URL_CASES = "https://test-2422i.fresco.bz/api/cases";

// Функиця загрузки заголовков, и прочего на сайт
const pageInfo = (data) => {
  const htmlHeadSection = `
        <h2 class="projects__title _title">${data.main_screen_title}</h2>
        <p class="projects__subtitle">${data.main_screen_subtitle}</p>`;
  if (document.getElementById("projects-head-section")) {
    document.getElementById("projects-head-section").innerHTML = htmlHeadSection;
  }
}
// Функиця фильтрации карточек
const filteringСards = (e) => {
  e.preventDefault(); // Останавливаем стандартное поведение
  const dataTag = e.currentTarget.dataset.tag;
  document.querySelectorAll('.filter__btn').forEach(btn => btn.classList.remove('_active'));
  e.currentTarget.classList.add('_active');

  const loader = document.querySelector('.loader');
  if (loader) {
    bodyLock();
    loader.style.opacity = '1';
    loader.style.pointerEvents = 'all';
  }

  fetch(URL_CASES, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const filteredCards = data.object.cases.filter(data => data.main_screen.industries[0] === dataTag);
      projectsGrid(filteredCards);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {

      if (loader) {
        bodyUnLock();
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
      }
    });

};

// Функция рендеринга тегов
const tagsGrid = (data) => {
  const tagsHtml = data.filter_industries.map(tag => {
    return `<button type="button" data-tag="${tag.tag}" class="filter__btn">
        ${tag.icon != "" ? `<img src="${tag.icon}" alt="${tag.tag}">` : `<img src="img/icons/Restaurant.svg" alt="" />`}
        <span>${tag.tag}</span>
      </button>`
  }).join('');
  if (document.getElementById('tags')) {
    document.getElementById('tags').innerHTML = tagsHtml;
  }

  // При формировании тегов сразу вешаем слушатель, так как они формируются динамически
  const filterBtn = document.querySelectorAll('.filter__btn');
  if (filterBtn) {
    filterBtn.forEach(btn => btn.addEventListener('click', filteringСards))
  }
}

const tagsGridHome = (data) => {
  const tagsHtml = data.filter_industries.map(tag => {
    return `<a href="/projects.html/${tag.tag}" data-link class="filter__btn">
        ${tag.icon != "" ? `<img src="${tag.icon}" alt="${tag.tag}">` : `<img src="img/icons/Restaurant.svg" alt="" />`}
        <span>${tag.tag}</span>
      </a>`
  }).join('');
  if (document.getElementById('tags-home')) {
    document.getElementById('tags-home').innerHTML = tagsHtml;
  }

  // При формировании тегов сразу вешаем слушатель, так как они формируются динамически
  const filterBtn = document.querySelectorAll('[data-link]');
  if (filterBtn) {
    filterBtn.forEach(btn => btn.addEventListener('click', followTheLink))
  }
}
// Функция формирования и рендеринга сетки карточек
const projectsGrid = (data) => {
  if (data.length > 0) {
    const gridHtml = data.map(item => {
      const {
        alias,
        main_screen
      } = item;

      return `
          <div class="projects__card card">
            <div class="card__bg" style="background-image: url(${main_screen.preview})"></div>
            <a href="/projects/${alias}" class="card__link"></a>
            <div class="card__content">
              <div class="tags">
                ${main_screen.preview_tag.map(tag => {
        return `
                    <a href="" class="tag">
                      ${tag.icon != null ? `<img src="${tag.icon}" alt="${tag.tag}">` : ""}
                      <span>${tag.tag}</span>
                    </a>
                  `
      }).join('')}
              </div>
              <div class="card__count">
                <p class="card__number">${main_screen.preview_numbers}</p>
                <p class="card__text">${main_screen.subtitle}</p>
              </div>
            </div>
          </div>`;
    }).join('');
    if (document.getElementById('projects-grid')) {
      document.getElementById('projects-grid').classList.remove('_no-grid');
      document.getElementById('projects-grid').innerHTML = gridHtml;
    }

  } else {
    const gridHtml = `
      <div class="empty">Не найдено</div>
    `
    if (document.getElementById('projects-grid')) {
      document.getElementById('projects-grid').classList.add('_no-grid');
      document.getElementById('projects-grid').innerHTML = gridHtml;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Запрос при загрузке данных
  fetch(URL_CASES, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // url к информации
      const PAGE_INFO_URL = data.object;

      pageInfo(PAGE_INFO_URL.page);

      tagsGridHome(PAGE_INFO_URL.page);


      projectsGrid(PAGE_INFO_URL.cases);

      const nameTag = localStorage.getItem('lastVisitedLink');
      if (nameTag) {
        tagsGrid(PAGE_INFO_URL.page);
        document.querySelectorAll('.filter__btn').forEach(item => {
          console.log(item);

          if (item.dataset.tag === nameTag) {
            item.classList.add('_active')
          }
        })
        const filteredCardsSaveActiveTag = data.object.cases.filter(data => data.main_screen.industries[0] === nameTag);
        projectsGrid(filteredCardsSaveActiveTag);
        localStorage.removeItem('lastVisitedLink');
      } else {
        tagsGrid(PAGE_INFO_URL.page);
      }


    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});


// Функция для сохранения тега сразу



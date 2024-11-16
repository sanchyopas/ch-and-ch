import { bodyLock, bodyUnLock } from "./functions.js"

const URL_CASES = "https://test-2422i.fresco.bz/api/cases";

const loadGif = () => {
  document.getElementById('projects-grid').classList.add('_load');
}

const pageInfo = (data) => {
  const htmlHeadSection = `
        <h2 class="projects__title _title">${data.main_screen_title}</h2>
        <p class="projects__subtitle">${data.main_screen_subtitle}</p>`;

  document.getElementById("projects-head-section").innerHTML = htmlHeadSection;
}

const filteringСards = (e) => {
  const dataTag = e.currentTarget.dataset.tag;
  // Показать лоадер
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
      projectsGrid(filteredCards)

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      // Скрыть лоадер в любом случае (успех или ошибка)
      if (loader) {
        bodyUnLock();
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
      }
    });

};

const tagsGrid = (data) => {
  const tagsHtml = data.filter_industries.map(tag => {
    return `<button type="button" data-tag="${tag.tag}" class="filter__btn">
        ${tag.icon != "" ? `<img src="${tag.icon}" alt="${tag.tag}">` : `<img src="img/icons/Restaurant.svg" alt="" />`}
        <span>${tag.tag}</span>
      </button>`
  }).join('');

  document.getElementById('tags').innerHTML = tagsHtml;

  const filterBtn = document.querySelectorAll('.filter__btn');
  if (filterBtn) {
    filterBtn.forEach(btn => btn.addEventListener('click', filteringСards))
  }
}

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
            <a href="/project/${alias}" class="card__link"></a>
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
                <p class="card__text">${main_screen.subtitle} - ${item.id}</p>
              </div>
            </div>
          </div>`;
    }).join('');
    document.getElementById('projects-grid').classList.remove('_no-grid');
    document.getElementById('projects-grid').innerHTML = gridHtml;
  } else {
    const gridHtml = `
      <div class="empty">Пусто</div>
    `

    document.getElementById('projects-grid').classList.add('_no-grid');
    document.getElementById('projects-grid').innerHTML = gridHtml;
  }
}





document.addEventListener('DOMContentLoaded', () => {
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

      console.log(data);

      pageInfo(PAGE_INFO_URL.page);
      tagsGrid(PAGE_INFO_URL.page);

      projectsGrid(PAGE_INFO_URL.cases);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
})

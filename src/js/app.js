import * as functions from "./modules/functions.js";

functions.isWebp();

const bodyLock = (e) => {
  let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;
  document.querySelector('.header').style.paddingRight = widthScrollBar + 'px';
  // document.documentElement.style.paddingRight = widthScrollBar + 'px';
  document.documentElement.classList.add('_lock');
}

const bodyUnLock = (e) => {
  // document.documentElement.style.marginRight = '0px';
  document.querySelector('.header').style.paddingRight = '0px';
  document.documentElement.classList.remove('_lock');
}

const header = document.querySelector('.header');
let positionTopHeader = header.getBoundingClientRect().top;

window.addEventListener('scroll', () => {
  let scrollY = window.scrollY || window.pageYOffset;
  // header--sticky

  if (scrollY >= positionTopHeader) {
    header.classList.add('header--sticky');
  } else {
    header.classList.remove('header--sticky');
  }
})

// Функция для скролла к элементу
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  // const headerHeight = document.querySelector('.header').offsetHeight;
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    // const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// Обработчик клика на кнопки
document.querySelectorAll('[data-anchor]').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-anchor');
    scrollToElement(targetId);
    document.querySelector('.nav').classList.remove('_active');
  });
});


// Попап

const openPopup = (event) => {
  let popupBtn = event.target.closest('[data-popup]')
  if (popupBtn) {
    const popup = document.getElementById(popupBtn.dataset.popup);
    document.documentElement.classList.add('popup-show');
    popup.classList.add('popup_show');

    let nameOrder = popupBtn.dataset.order;

    if (nameOrder) {
      let fieledHidden = popup.querySelector('input[name="service"]');
      console.log(fieledHidden);
      fieledHidden.value = nameOrder;
    }

    bodyLock();
  }
}

const closePopup = (event) => {
  let popupCloseBtn = event.target.closest('.popup__close');
  if (popupCloseBtn) {
    const popup = popupCloseBtn.closest('.popup');
    popup.classList.remove('popup_show');
    document.documentElement.classList.remove('popup-show');
    bodyUnLock();
  }
}

const popup = document.querySelectorAll('.popup');
if (popup) {
  popup.forEach(popup => popup.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__content')) {
      e.currentTarget.classList.remove('popup_show');
      document.documentElement.classList.remove('popup-show');
      bodyUnLock();
    }
  }))
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27 && document.querySelector('.popup_show').classList.contains('popup_show')) {
    document.querySelector('.popup_show').classList.remove('popup_show');
    document.documentElement.classList.remove('popup-show');
    bodyUnLock();
  }
})

const popupBtn = document.querySelectorAll('[data-popup]');
if (popupBtn) {
  popupBtn.forEach(btn => btn.addEventListener('mouseup', openPopup));
}

const closePopupBtn = document.querySelectorAll('.popup__close');
if (closePopupBtn) {
  closePopupBtn.forEach(btn => btn.addEventListener('click', closePopup))
}

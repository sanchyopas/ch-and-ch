import * as functions from "./modules/functions.js";

functions.isWebp();

const bodyLock = (e) => {
  let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;

  document.querySelector('.header').style.paddingRight = widthScrollBar + 'px';
  document.documentElement.style.marginRight = widthScrollBar + 'px';
  document.documentElement.classList.add('_lock');
}

const bodyUnLock = (e) => {
  document.documentElement.style.marginRight = '0px';
  document.querySelector('.header').style.marginRight = '0px';
  document.documentElement.classList.remove('_lock');
}

const header = document.querySelector('.header');
let positionTopHeader = header.getBoundingClientRect().top;



// Функция для скролла к элементу
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  // const headerHeight = document.querySelector('.header').offsetHeight;
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    // const offsetPosition = elementPosition - headerHeight;

    document.querySelector('.header').classList.remove('_active');
    bodyUnLock();

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

// Переключатель карты
const showMap = (e) => {
  console.log('click');

  document.querySelectorAll('.map').forEach(map => map.classList.remove('_active'));
  document.getElementById(e.currentTarget.dataset.id).classList.add('_active');
}


const mapTabBtn = document.querySelectorAll('[data-id]');
if (mapTabBtn) {
  mapTabBtn.forEach(btn => btn.addEventListener('click', showMap))
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#offer",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".offer__image").forEach(layer => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth)
    tl.to(layer, { y: movement, ease: "power2.inOut" }, 0)
  });

  const depth = 0.3; // Глубина эффекта (от 0 до 1, большее значение — сильнее эффект)
  const image = document.querySelector(".steps__bg"); // Выбираем конкретный элемент
  const movement = -(image.offsetHeight * depth); // Вычисляем движение

  gsap.timeline({
    scrollTrigger: {
      trigger: "#steps",
      start: "top bottom", // Начало анимации
      end: "bottom top", // Конец анимации
      scrub: true, // Связь с прокруткой
    },
  }).to(image, { y: movement, ease: "none" }); // Параллакс-эффект

  gsap.utils.toArray(".text-line").forEach((line, index) => {
    gsap.fromTo(line,
      {
        transform: "translateY(100%)" // Начальная позиция и скрытие
      },
      {
        transform: "translateY(0%)", // Конечная позиция, где текст будет видимым
        duration: 1,
        delay: index * 0.3, // Задержка между строками
        ease: "power4.out"
      });
  });

  gsap.utils.toArray(".to-top").forEach((line, index) => {
    gsap.fromTo(line,
      {
        opacity: 0,
        transform: "translateY(-100%)" // Начальная позиция и скрытие
      },
      {
        opacity: 1,
        transform: "translateY(0%)", // Конечная позиция, где текст будет видимым
        duration: 1,
        delay: index * 0.3, // Задержка между строками
        ease: "power4.out"
      });
  });

  gsap.utils.toArray(".fade").forEach((line, index, array) => {
    // Задержка для первого и последнего элемента
    const delayTime = (index === 0 || index === array.length - 1) ? 0.8 : index * 0.3;

    gsap.fromTo(line,
      {
        opacity: 0, /* Начальная невидимость */
      },
      {
        opacity: 1, /* Конечное состояние - полностью видимый */
        duration: 1, /* Длительность анимации */
        delay: delayTime, /* Задержка перед анимацией */
        ease: "power4.out" /* Плавная анимация */
      });
  });
}


// Бургер меню

document.getElementById('burger').addEventListener('click', (e) => {
  document.querySelector('.header').classList.toggle('_active');
  bodyLock();

  if (!document.querySelector('.header').classList.contains('_active')) {
    bodyUnLock();
  }
})



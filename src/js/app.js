import * as functions from "./modules/functions.js";
import './modules/animation.js'
import './modules/smoothScroll.js'
import './modules/popup.js'
import './modules/burger.js'
import './modules/api/main.js'
import './modules/coockie.js'
import './modules/mask.js'
import './modules/follow_link.js'

functions.isWebp();

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

// Переключатель карты
const showMap = (e) => {
  document.querySelectorAll('[data-id]').forEach(btn => btn.classList.remove('_active'));
  e.currentTarget.classList.add('_active');
  document.querySelectorAll('.map__content').forEach(map => map.classList.remove('_active'));
  document.getElementById(e.currentTarget.dataset.id).classList.add('_active');
}


const mapTabBtn = document.querySelectorAll('[data-id]');
if (mapTabBtn) {
  mapTabBtn.forEach(btn => btn.addEventListener('click', showMap))
}


import Swiper from 'swiper';
import {Navigation, Pagination, Controller, Thumbs, EffectFade} from 'swiper/modules';

document.addEventListener("DOMContentLoaded", () => {
  // init Swiper:
  const project_slider = new Swiper(".project__slider", {
    modules: [Navigation, Pagination, Controller, Thumbs, EffectFade],
    slidesPerView: 1,
    loop: false,
    spaceBetween: 24,
    autoHeight: false,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });



  document.querySelectorAll(".interiors-slider").forEach(container => {
    const slides = container.querySelectorAll(".interiors-slider__slide");
    const a = container.querySelector(".thumbs-slider");
    if(slides.length < 2){
      a.classList.add("hidden");
      container.querySelector(".swiper-navigation").classList.add("hidden");
    }else{
      const thumbsSlider = new Swiper(container.querySelector(".thumbs-slider"), {
        spaceBetween: 10,
        slidesPerView: "auto",
        loop: true,
        initialSlide: 1,
      });

      // Инициализируем основной слайдер
      new Swiper(container.querySelector(".interiors-slider__slider"), {
        modules: [Navigation, Pagination, Controller, Thumbs, EffectFade],
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        autoHeight: false,
        effect: "fade",
        on: {
          init: function () {
            console.log("Swiper initialized", this);
          },
        },
        navigation: {
          nextEl: container.querySelector(".swiper-button-next"), // Привязываем локальные элементы навигации
          prevEl: container.querySelector(".swiper-button-prev"),
        },
        thumbs: {
          swiper: thumbsSlider, // Привязываем текущий thumbsSlider
        },
      });
    }

  });
})


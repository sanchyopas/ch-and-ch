import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//Анимация текста первого блока главной страницы
const heroTitleAnimation = () => {
  // Анимация для устройств без touch
  gsap.utils.toArray('.text-line').forEach((line, index) => {
    gsap.fromTo(line,
      {
        transform: 'translateY(100%)', // Начальная позиция
      },
      {
        transform: 'translateY(0%)', // Конечная позиция
        duration: 1,
        delay: index * 0.3,
        ease: 'power4.out',
      }
    );
  });
};

// Анимация второго блока (Offer)

const offerAnimation = () => {
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
}

const stepsBgAnimation = () => {
  const depth = 0.3;
  const image = document.querySelector(".steps__bg");
  const movement = -(image.offsetHeight * depth);
  if (image) {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#steps",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }).to(image, { y: movement, ease: "none" });
  }
}


if (!isTouchDevice) {
  heroTitleAnimation();
  offerAnimation();
  stepsBgAnimation();

  gsap.utils.toArray('.offer-text-line').forEach((line) => {
    gsap.to(line, {
      y: 0, // Текст возвращается на своё место
      opacity: 1, // Делает текст видимым
      ease: "power2.out", // Плавная анимация
      scrollTrigger: {
        trigger: line, // Каждую строку будет триггерить сам span
        start: "top 90%", // Когда верх строки достигнет 90% экрана
        end: "top 30%", // Когда верх строки достигнет 30% экрана
        scrub: 0.5, // Плавная анимация по скроллу, 0.5 — скорость
        toggleActions: "play none none none", // Включить анимацию только один раз
      },
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
} else {
  document.querySelectorAll('.text-line').forEach(line => {
    line.style.transform = 'translateY(0%)';
  });
}


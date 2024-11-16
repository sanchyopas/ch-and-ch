import { bodyUnLock } from "./functions.js";

/*
****
***  Скролл к элементу
****
*/

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

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
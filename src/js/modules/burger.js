import { bodyUnLock, bodyLock } from "./functions.js";

// Бургер меню
document.getElementById('burger').addEventListener('click', (e) => {
  document.querySelector('.header').classList.toggle('_active');
  bodyLock();

  if (!document.querySelector('.header').classList.contains('_active')) {
    bodyUnLock();
  }
})
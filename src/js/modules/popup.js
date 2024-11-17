import { bodyLock, bodyUnLock } from "./functions.js";
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
  let popupCloseBtn = event.target.closest('[data-close]');
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
  popupBtn.forEach(btn => {
    btn.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        openPopup(event)
      }
    })
  });
}

const closePopupBtn = document.querySelectorAll('[data-close]');
if (closePopupBtn) {
  closePopupBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
      if (event.button === 0) {
        closePopup(event)
      }
    })
  })
}

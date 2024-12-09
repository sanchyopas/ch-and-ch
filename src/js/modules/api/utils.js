/**
*** Вспомогательные функции
**/
import {LOCALE_EN} from "../functions.js";

// Функция проверяет строку на содержание eng в url адресе
export const checkUrlEn = () =>{
    return window.location.href.includes(LOCALE_EN) ? `/api${LOCALE_EN}cases` : "/api/cases";
}

// Функция блокирует скролл body
export const lockBody = () => {
    let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;

    document.querySelector('.header').style.paddingRight = widthScrollBar + 'px';
    document.documentElement.style.marginRight = widthScrollBar + 'px';
    document.documentElement.classList.add('_lock');
};

// Функция разблокирует скролл body
export const unlockBody = () => {
    document.documentElement.style.marginRight = '0px';
    document.querySelector('.header').style.marginRight = '0px';
    document.documentElement.classList.remove('_lock');
};

// Функция выполняет вкл/выкл loader при загрузке данных
export const toggleLoader = (show) => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = show ? '1' : '0';
        loader.style.pointerEvents = show ? 'all' : 'none';
    }
};
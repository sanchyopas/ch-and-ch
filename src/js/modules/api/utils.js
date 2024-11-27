/**
*** Вспомогательные функции
**/
import {LOCALE_EN} from "../functions.js";

// Функция проверяет строку на содержание eng в url адресе
export const checkUrlEn = () =>{
    return window.location.href.includes(LOCALE_EN) ? `http://test-2422i.fresco.bz/api${LOCALE_EN}cases` : "http://test-2422i.fresco.bz/api/cases";
}

// Функция блокирует скролл body
export const lockBody = () => {
    document.body.style.overflow = 'hidden';
};

// Функция разблокирует скролл body
export const unlockBody = () => {
    document.body.style.overflow = '';
};

// Функция выполняет вкл/выкл loader при загрузке данных
export const toggleLoader = (show) => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = show ? '1' : '0';
        loader.style.pointerEvents = show ? 'all' : 'none';
    }
};
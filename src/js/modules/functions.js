/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
import events from "events";
import {checkLocal} from "./changeLocale.js";

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

// Блокировка скролла
export const bodyLock = (e) => {
	let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;

	document.querySelector('.header').style.paddingRight = widthScrollBar + 'px';
	document.documentElement.style.marginRight = widthScrollBar + 'px';
	document.documentElement.classList.add('_lock');
}

// Удаление блокировки скролла
export const bodyUnLock = (e) => {
	document.documentElement.style.marginRight = '0px';
	document.querySelector('.header').style.marginRight = '0px';
	document.documentElement.classList.remove('_lock');
}

/**
**** Код ниже выполнят проверку "локализации"
 * для локальной разработки раскоментировать первую переменную path, а вторую закоментировать
*/
export const LOCALE_RU = "/ru/";
export const LOCALE_EN = "/en/";

//const path = "https://test-2422i.fresco.bz/en/"; //Для локальной разработки тестил

const path = window.location.href;

window.addEventListener("DOMContentLoaded", () => {
	checkLocal(path);
});

document.querySelectorAll(".header__lang")?.forEach(link => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		checkLocal(link.href);
		window.location.href = link.href;
	})
});





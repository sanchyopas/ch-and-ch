import * as functions from "./modules/functions.js";
import './modules/animation.js'
import './modules/smoothScroll.js'
import './modules/popup.js'
import './modules/burger.js'

functions.isWebp();


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


// fetch('https://test-2422i.fresco.bz/api/cases', {
//   method: 'GET', // Используйте 'POST', 'PUT', 'DELETE' или другой метод, если требуетс
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json(); // Преобразуем ответ в JSON
//   })
//   .then(data => {
//     console.log(data); // Работайте с данными
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error); // Обрабатывайте ошибки
//   });


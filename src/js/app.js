import * as functions from "./modules/functions.js";
import './modules/animation.js'
import './modules/smoothScroll.js'
import './modules/popup.js'
import './modules/burger.js'
import './modules/api.js'
import './modules/coockie.js'

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





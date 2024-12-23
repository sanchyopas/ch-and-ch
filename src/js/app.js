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
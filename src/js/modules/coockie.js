// Установить cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Получить cookie
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}

// Скрыть форму и сохранить согласие в cookie
document.getElementById('accept-consent').addEventListener('click', () => {
  setCookie('userConsent', 'accepted', 365); // Сохраняем согласие на 1 год
  document.getElementById('coockie').style.display = 'none';
});

// Проверить наличие согласия в cookie
window.addEventListener('load', () => {
  if (getCookie('userConsent') != 'accepted') {
    document.getElementById('coockie').style.display = 'block';
  }
});
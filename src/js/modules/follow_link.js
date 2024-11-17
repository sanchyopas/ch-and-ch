
export const followTheLink = (event) => {
  console.log('click');
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href'); //Полный путь
  const lastPart = href.substring(href.lastIndexOf("/") + 1); //Последняя часть для активации тега на странице проектов
  const basePath = href.substring(0, href.lastIndexOf("/")); // Базовый путь для перехода


  localStorage.setItem('lastVisitedLink', lastPart);
  window.location.href = basePath;
}

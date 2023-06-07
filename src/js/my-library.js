import axios from 'axios';
import { KEY } from './api-key';
import { getGenres } from './genre';
import { IMAGE_URL_W500 } from './api-key';

const myLibraryUrl = document.getElementById('library-body__wrap');
// ? // Масив айдішок ;
let filmsIdsArray = [];
const STORAGE_KEY = 'my-library-array';
// ? // Отримання даних при завантаженні сторінки ;
filmsIdsArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
// todo // Запис всіх промисів, та об'єкти,
// todo // що повернув фетч ;
const promisesArray = [];
let arrayFilms = [];
// ? // Перебор масиву і запис отриманного значення в константу,
// ? // та пуш кожного об'єкту в promisesArray ;
filmsIdsArray.forEach(item => {
  const promise = axios
    .get(`https://api.themoviedb.org/3/movie/${item}?api_key=${KEY}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Помилка запиту:', error);
    });
  promisesArray.push(promise);
});
// ! // Розбір всіх промісів, одночасне їх виконання за допомогою методу Promise.all() ,
// ! // та рендер карток функцією ;
Promise.all(promisesArray)
  .then(responses => {
    arrayFilms = responses;
    if (arrayFilms == false) {
      return
    }
    renderLibraryCards(arrayFilms, myLibraryUrl);
  })
  .catch(error => {
    console.error('Ошибка запроса:', error);
  });
// * // Функція створення карток ;
function createLibraryCards(array) {
  return array
    .map(({ poster_path, title, release_date, id, }) => {
      return `<li class="movie-card js-open-modal" data-id="${id}" data-modal="1">
    <img class="movie-card__img" src="${IMAGE_URL_W500}${poster_path}" alt="${title}" data-id="${id}" loading="lazy"/>
    <div class="movie-card__info">
    <p class="movie-card__title">${title}</p>
     <div class="movie-card__ganre-rating-wrap">
    <p class="movie-card__genre-year"> | ${release_date.slice(0, 4)}</p> 
    <div class="rating">
<div class="rating__body">
  <div class="rating__active"></div>
  <div class="rating__items">
    <input class="rating__item" type="radio" value="1" name="rating">
    <input class="rating__item" type="radio" value="2" name="rating">
    <input class="rating__item" type="radio" value="3" name="rating">
    <input class="rating__item" type="radio" value="4" name="rating">
    <input class="rating__item" type="radio" value="5" name="rating">
  </div>

</div>
    </div>
    </div>
    </div>
  </li>`;
    })
    .join('');
}
// * // Функція рендеру карток, що викликається вище ;
function renderLibraryCards(data, querySelector) {
  querySelector.innerHTML = createLibraryCards(data);
}

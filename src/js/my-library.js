import axios from 'axios';
import { KEY } from './api-key';
import { IMAGE_URL_W500 } from './api-key';
// ? -- Посилання на технічний контейнер library-body__wrap ;
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
// ? // Функція перебору масиву і запису отриманного значення в константу,
// ? -- та пушу кожного об'єкту в promisesArray ;
updateIncomingData();
doneAllPromises();
// ! // Розбір всіх промісів, одночасне їх виконання за допомогою методу Promise.all() ,
// ! // та рендер карток функцією ;
function doneAllPromises() {
  Promise.all(promisesArray)
    .then(responses => {
      arrayFilms = responses;
      if (arrayFilms == false) {
        return;
      }
      renderLibraryCards(arrayFilms, myLibraryUrl);
      initLibraryCardRatings(arrayFilms);
    })
    .catch(error => {});
}
// * // Функція створення карток ;
function createLibraryCards(array) {
  return array
    .map(({ poster_path, title, release_date, id, genres }) => {
      return `<li class="movie-card js-open-modal" data-id="${id}" data-modal="1">
    <img class="movie-card__img" src="${IMAGE_URL_W500}${poster_path}" alt="${title}" data-id="${id}" loading="lazy"/>
    <div class="movie-card__info">
    <p class="movie-card__title">${title}</p>
     <div class="movie-card__ganre-rating-wrap">
    <p class="movie-card__genre-year">${genres[0].name} | ${release_date.slice(
        0,
        4
      )}</p> 
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
// ? -- Функція фетчу для оновлення data ;
function updateIncomingData() {
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
}
// ? -- Функція рендеру карток, що викликається вище ;
function renderLibraryCards(data, querySelector) {
  querySelector.innerHTML = createLibraryCards(data);
}
// ? -- Функція для рендеру рейтингу зірочок ;
function initLibraryCardRatings(data) {
  const ratingsUrl = document.querySelectorAll('.rating');
  // console.log(ratings);
  // console.log(data.results[0].vote_average);
  if (ratingsUrl.length > 0) {
    for (let index = 0; index < ratingsUrl.length; index++) {
      const rating = ratingsUrl[index];
      const voteAverage = data[index].vote_average;

      initRating(rating, voteAverage);
    }
  }
}
function initRating(rating, voteAverage) {
  const ratingActive = rating.querySelector('.rating__active');
  const ratingActiveWidth = (voteAverage / 10) * 100;
  ratingActive.style.width = `${ratingActiveWidth}%`;
}

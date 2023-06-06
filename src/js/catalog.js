import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import {initRatings} from "./star_rating"

let page = 1;

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

  export const movieListContainer = document.querySelector('.catalog__gallery');
  fetchMovieTrend(page)
    .then(data => {
      initRatings(data);
      renderCards(data, movieListContainer);
    })
    .catch(error => {
      console.error('Error rendering movie cards:', error);
    });



  

console.log(page);



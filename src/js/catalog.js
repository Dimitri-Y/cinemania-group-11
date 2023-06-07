import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';

let page = 1;
let paginationListLinks =  document.querySelectorAll('.pagination-list__link');

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

export const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
    initRatings(data);
    paginationListLinks[paginationListLinks.length - 1].textContent = data.total_pages.toString();
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

console.log(page);

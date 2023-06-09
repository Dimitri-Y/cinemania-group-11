import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';
import { updatePaginationMarkup } from './search-form';

let page = 1;
const paginationListLinks = document.querySelectorAll('.pagination-list__link');
const paginationBackArrow = document.querySelector('.pagination__back');
const paginationForwardArrow = document.querySelector('.pagination__forward');

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

export const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
    initRatings(data);
    updatePaginationMarkup(data.total_pages);
  })
  .catch(error => {});

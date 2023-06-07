import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';

let page = 1;
let paginationListLinks = document.querySelectorAll('.pagination-list__link');
const mesEl = document.querySelector('.js-catalog__message--trend');

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

export const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    if (data.results.length === 0) {
      movieListContainer.innerHTML = '';
      mesEl.classList.remove('ishidden');
    } else {
      if (!mesEl.classList.contains('ishidden')) {
        mesEl.classList.add('ishidden');
      }
      renderCards(data, movieListContainer);
      initRatings(data);
      paginationListLinks[paginationListLinks.length - 1].textContent =
        data.total_pages.toString();
    }
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

console.log(page);

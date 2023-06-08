import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';

let page = 1;
let paginationListLinks = document.querySelectorAll('.pagination-list__link');
let paginationBackArrow = document.querySelector('.pagination__back');
let paginationForwardArrow = document.querySelector('.pagination__forward');

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

export const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
    initRatings(data);
    paginationListLinks[0].textContent = '01';
    paginationListLinks[1].textContent = '02';
    paginationListLinks[2].textContent = '03';
    paginationListLinks[3].textContent = '...';
    paginationListLinks[paginationListLinks.length - 1].textContent =
      data.total_pages.toString();
    paginationListLinks.forEach(item =>
      item.classList.contains('selected')
        ? item.classList.remove('selected')
        : item
    );
    paginationListLinks[0].classList.add('selected');
    paginationBackArrow.setAttribute('disabled', '');
    paginationForwardArrow.removeAttribute('disabled', '');
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

console.log(page);

import axios from 'axios';
import { KEY, SEARCH_URL } from './api-key';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';
import { movieListContainer } from './catalog';

export const searchFormEl = document.getElementById('idFormCatalog');
const clearBtn = document.querySelector('.catalog__btn-cross');
const messageEl = document.querySelector('.catalog__message');

export let value = '';
let page = 1;
const paginationListLinks = document.querySelectorAll('.pagination-list__link');
const paginationBackArrow = document.querySelector('.pagination__back');
const paginationForwardArrow = document.querySelector('.pagination__forward');
const pagination = document.querySelector('.pagination');

searchFormEl.addEventListener('submit', searchFilms);
clearBtn.addEventListener('click', resetForm);
searchFormEl.addEventListener('input', addCrossBtn);

export function searchFilms(event) {
  event.preventDefault();
  value = searchFormEl.elements.name.value.trim();
  if (value === '') alert('Enter the name of the movie');
  else {
    fetchMovieSearch(page, value)
      .then(data => {
        if (data.results.length === 0) {
          movieListContainer.innerHTML = '';
          messageEl.classList.remove('ishidden');
          pagination.classList.add('hidden');
        } else {
          if (!messageEl.classList.contains('ishidden')) {
            messageEl.classList.add('ishidden');
          }
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
          // console.log(data);
          // console.log(data.results.length);
        }
      })
      .catch(error => {
        console.error('Error rendering movie cards:', error);
      });
  }
}

function resetForm(event) {
  searchFormEl.elements.name.value = '';
  switchBtnCross();
  searchFormEl.addEventListener('input', addCrossBtn);
}

function addCrossBtn() {
  switchBtnCross();
  searchFormEl.removeEventListener('input', addCrossBtn);
}

function switchBtnCross() {
  clearBtn.classList.toggle('ishidden');
}

export async function fetchMovieSearch(page, value) {
  const PAGE = `&page=${page}`;
  const QUERY = `&query=${value}`;
  return await axios
    .get(`${SEARCH_URL}?api_key=${KEY}${QUERY}${PAGE}`)
    .then(response => response.data);
}

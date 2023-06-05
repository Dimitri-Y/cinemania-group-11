import axios from 'axios';
import { KEY, TREND_URL, IMG_BASE_URL, IMAGE_URL_W500 } from './api-key';
import { fetchMovieTrend } from './api';
import { getGenres } from './genre';
import { renderCards } from './movie_card';

import {
  createCards,
  movieListContainer,
} from './catalog';


let page = 1;
let perPage = 20;

const refs = {
  paginationListLinks: document.querySelectorAll('.pagination-list__link'),
  paginationBackArrow: document.querySelector('.pagination__back'),
  paginationForwardArrow: document.querySelector('.pagination__forward'),
  paginationList: document.querySelector('.pagination-list'),
};

refs.paginationBackArrow.setAttribute('disabled', '');
refs.paginationListLinks[0].classList.add('selected');

refs.paginationBackArrow.addEventListener('click', onClickBack);
refs.paginationForwardArrow.addEventListener('click', onClickForward);

refs.paginationList.addEventListener('click', onClickList);

async function onClickBack(event) {
  for (let i = 0; i < refs.paginationListLinks.length; i += 1) {
    if (refs.paginationListLinks[i].classList.contains('selected')) {
      const prevElement = refs.paginationListLinks[i - 1];

      if (prevElement === refs.paginationListLinks[0]) {
        refs.paginationForwardArrow.removeAttribute('disabled', '');
        event.target.setAttribute('disabled', '');

        refs.paginationListLinks[i].classList.remove('selected');
        page = prevElement.textContent;
        prevElement.classList.add('selected');
        trimZero(page);
        break;
      }

      if (prevElement !== refs.paginationListLinks[0]) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = prevElement.textContent;
        prevElement.classList.add('selected');
        trimZero(page);
        break;
      }
    }
  };
  await fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });
}

async function onClickForward(event) {
  for (let i = 0; i < refs.paginationListLinks.length; i += 1) {
    if (refs.paginationListLinks[i].classList.contains('selected')) {
      refs.paginationBackArrow.removeAttribute('disabled', '');
      const nextElement = refs.paginationListLinks[i + 1];

      if (
        nextElement ===
        refs.paginationListLinks[refs.paginationListLinks.length - 1]
      ) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = nextElement.textContent;
        nextElement.classList.add('selected');
        event.target.setAttribute('disabled', '');
        trimZero(page);
        break;
      }

      if (
        nextElement !==
        refs.paginationListLinks[refs.paginationListLinks.length - 1]
      ) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = nextElement.textContent;
        nextElement.classList.add('selected');
        trimZero(page);
        break;
      }
    }
  }
  await fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });
}

async function onClickList(event) {
  event.preventDefault();

  if (event.target.textContent === '...') {
    console.log(page);
    return;
  }
  refs.paginationListLinks.forEach(item => {
    if (item.classList.contains('selected') && event.target !== item) {
      item.classList.remove('selected');
    }
    if (event.target === item && item !== refs.paginationListLinks[0]) {
      refs.paginationBackArrow.removeAttribute('disabled', '');
      page = event.target.textContent;
      event.target.classList.add('selected');
      refs.paginationListLinks[0].classList.remove('selected');
    }
    if (event.target === item && item === refs.paginationListLinks[0]) {
      refs.paginationBackArrow.setAttribute('disabled', '');
      page = event.target.textContent;
      event.target.classList.add('selected');
    }
  });
  trimZero(page);
  await fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });
}

function trimZero(page) {
  page.toString()[0] === '0'
    ? (page = Number(page.toString().slice(1)))
    : (page = Number(page));
  console.log(page);
}



import axios from 'axios';
import { KEY, TREND_URL, IMG_BASE_URL, IMAGE_URL_W500 } from './api-key';
import { fetchMovieTrend } from './api';
import { getGenres } from './genre';
import { renderCards } from './movie_card';

import { createCards, movieListContainer } from './catalog';

let page = 1;

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
      if (
        refs.paginationListLinks[i + 1].textContent === '...' &&
        refs.paginationListLinks[i - 1].textContent !== '02'
      ) {
        changesValuesBack(refs.paginationListLinks[i]);
        changesValuesBack(refs.paginationListLinks[i - 1]);
        changesValuesBack(refs.paginationListLinks[i - 2]);

        page = refs.paginationListLinks[i].textContent;
        break;
      }

      const prevElement = refs.paginationListLinks[i - 1];

      if (prevElement === refs.paginationListLinks[0]) {
        refs.paginationForwardArrow.removeAttribute('disabled', '');
        event.target.setAttribute('disabled', '');

        refs.paginationListLinks[i].classList.remove('selected');
        page = prevElement.textContent;
        prevElement.classList.add('selected');
        break;
      }

      if (prevElement !== refs.paginationListLinks[0]) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = prevElement.textContent;
        prevElement.classList.add('selected');
        break;
      }
    }
  }
  trimZero(page);
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
      if (
        (Number(refs.paginationListLinks[i].textContent) >= 03) &
        (refs.paginationListLinks[i + 1].textContent === '...')
      ) {
        changesValuesForward(refs.paginationListLinks[i]);
        changesValuesForward(refs.paginationListLinks[i - 1]);
        changesValuesForward(refs.paginationListLinks[i - 2]);

        page = refs.paginationListLinks[i].textContent;
        break;
      }

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
        break;
      }

      if (
        nextElement !==
        refs.paginationListLinks[refs.paginationListLinks.length - 1]
      ) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = nextElement.textContent;
        nextElement.classList.add('selected');
        break;
      }
    }
  }
  trimZero(page);
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

function trimZero(value) {
  value.toString()[0] === '0'
    ? (value = Number(value.toString().slice(1)))
    : (value = Number(value));
  console.log(value);
}

function changesValuesForward(element) {
  element.textContent[0] === '0'
    ? (element.textContent = Number(element.textContent.slice(1)) + 1)
    : (element.textContent =
        Number(refs.paginationListLinks[i].textContent) + 1);

  element.textContent = '0' + element.textContent.toString();
}

function changesValuesBack(element) {
  element.textContent[0] === '0'
    ? (element.textContent = Number(element.textContent.slice(1)) - 1)
    : (element.textContent =
        Number(refs.paginationListLinks[i].textContent) - 1);

  element.textContent = '0' + element.textContent.toString();
}

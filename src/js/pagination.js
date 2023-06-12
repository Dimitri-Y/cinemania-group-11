import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { movieListContainer } from './catalog';
import { initRatings } from './star_rating';
import { fetchMovieSearch, searchFormEl, value, valueYear} from './search-form';


let page = 1;
const refs = {
  paginationListLinks: document.querySelectorAll('.pagination-list__link'),
  paginationBackArrow: document.querySelector('.pagination__back'),
  paginationForwardArrow: document.querySelector('.pagination__forward'),
  paginationList: document.querySelector('.pagination-list'),
  catalogBtnCross: document.querySelector('.catalog__btn-cross'),
};

try {
  refs.paginationBackArrow.setAttribute('disabled', '');
  refs.paginationListLinks[0].classList.add('selected');
  searchFormEl.addEventListener('submit', onSubmit);

  refs.paginationBackArrow.addEventListener('click', onClickBack);
  refs.paginationForwardArrow.addEventListener('click', onClickForward);

  refs.paginationList.addEventListener('click', onClickList);
  if (searchFormEl.classList.contains('search')) {
    searchFormEl.classList.remove('search');
  }
} catch (error) {}

function onSubmit(event) {
  event.preventDefault();
  if (!event.currentTarget.classList.contains('search')) {
    event.currentTarget.classList.add('search');
  }
}

function onClickBack(event) {
  event.preventDefault();
  refs.paginationForwardArrow.removeAttribute('disabled', '');
  for (let i = 0; i < refs.paginationListLinks.length; i += 1) {
    if (refs.paginationListLinks[i].classList.contains('selected')) {
      const prevElement = refs.paginationListLinks[i - 1];
      if (
        refs.paginationListLinks[i] ===
        refs.paginationListLinks[refs.paginationListLinks.length - 1]
      ) {
        refs.paginationListLinks[i].classList.remove('selected');
        page = prevElement.textContent;
        prevElement.classList.add('selected');

        break;
      }

      if (refs.paginationListLinks[i - 1].textContent === '...') {
        refs.paginationListLinks[i].classList.remove('selected');
        refs.paginationListLinks[
          refs.paginationListLinks.length - 2
        ].textContent = '...';
        refs.paginationListLinks[
          refs.paginationListLinks.length - 2
        ].classList.add('more');

        refs.paginationListLinks[
          refs.paginationListLinks.length - 3
        ].textContent = Number(refs.paginationListLinks[i].textContent) - 1;

        refs.paginationListLinks[
          refs.paginationListLinks.length - 4
        ].textContent = Number(refs.paginationListLinks[i].textContent) - 2;
        refs.paginationListLinks[
          refs.paginationListLinks.length - 5
        ].textContent = Number(refs.paginationListLinks[i].textContent) - 1;

        refs.paginationListLinks[
          refs.paginationListLinks.length - 5
        ].classList.remove('more');

        page =
          refs.paginationListLinks[refs.paginationListLinks.length - 3]
            .textContent;
        refs.paginationListLinks[
          refs.paginationListLinks.length - 3
        ].classList.add('selected');

        break;
      }

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
  if (searchFormEl.classList.contains('search')) {
    fetchMovieSearch(page, value, valueYear)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  } else {
    fetchMovieTrend(page)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  }
}

function onClickForward(event) {
  for (let i = 0; i < refs.paginationListLinks.length; i += 1) {
    if (refs.paginationListLinks[i].classList.contains('selected')) {
      if (
        Number(refs.paginationListLinks[i].textContent) + 3 ===
        Number(
          refs.paginationListLinks[refs.paginationListLinks.length - 1]
            .textContent
        )
      ) {
        refs.paginationListLinks[i + 1].classList.remove('more');

        refs.paginationListLinks[0].textContent = '...';
        refs.paginationListLinks[0].classList.add('more');

        refs.paginationListLinks[
          refs.paginationListLinks.length - 2
        ].textContent =
          Number(
            refs.paginationListLinks[refs.paginationListLinks.length - 1]
              .textContent
          ) - 1;
        refs.paginationListLinks[
          refs.paginationListLinks.length - 3
        ].textContent =
          Number(
            refs.paginationListLinks[refs.paginationListLinks.length - 1]
              .textContent
          ) - 2;
        refs.paginationListLinks[
          refs.paginationListLinks.length - 4
        ].textContent =
          Number(
            refs.paginationListLinks[refs.paginationListLinks.length - 1]
              .textContent
          ) - 3;

        page =
          refs.paginationListLinks[refs.paginationListLinks.length - 3]
            .textContent;
        break;
      }

      if (
        refs.paginationListLinks[i + 1].textContent === '...' &&
        Number(refs.paginationListLinks[i].textContent) + 1 !==
          Number(
            refs.paginationListLinks[refs.paginationListLinks.length - 1]
              .textContent
          )
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
  if (searchFormEl.classList.contains('search')) {
    fetchMovieSearch(page, value, valueYear)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  } else {
    fetchMovieTrend(page)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  }
}

function onClickList(event) {
  event.preventDefault();
  if (
    event.target !==
    refs.paginationListLinks[refs.paginationListLinks.length - 1]
  ) {
    return;
  }

  for (let i = 0; i < refs.paginationListLinks.length; i += 1) {
    if (
      refs.paginationListLinks[i].classList.contains('selected') &&
      event.target !== refs.paginationListLinks[i]
    ) {
      refs.paginationListLinks[i].classList.remove('selected');
    }

    if (
      event.target === refs.paginationListLinks[i] &&
      refs.paginationListLinks[i].textContent === '01'
    ) {
      refs.paginationBackArrow.setAttribute('disabled', '');
      page = event.target.textContent;
      event.target.classList.add('selected');
    }

    if (
      event.target === refs.paginationListLinks[i] &&
      event.target ===
        refs.paginationListLinks[refs.paginationListLinks.length - 1]
    ) {
      refs.paginationBackArrow.removeAttribute('disabled', '');
      refs.paginationForwardArrow.setAttribute('disabled', '');
      page = event.target.textContent;
      event.target.classList.add('selected');
      refs.paginationListLinks[0].classList.add('more');

      refs.paginationListLinks[0].textContent = '...';

      refs.paginationListLinks[i - 1].textContent =
        Number(refs.paginationListLinks[i].textContent) - 1;
      refs.paginationListLinks[i - 1].classList.remove('more');
      refs.paginationListLinks[i - 2].textContent =
        Number(refs.paginationListLinks[i].textContent) - 2;
      refs.paginationListLinks[i - 3].textContent =
        Number(refs.paginationListLinks[i].textContent) - 3;
    }
  }
  trimZero(page);
  if (searchFormEl.classList.contains('search')) {
    fetchMovieSearch(page, value, valueYear)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  } else {
    fetchMovieTrend(page)
      .then(data => {
        renderCards(data, movieListContainer);
        initRatings(data);
      })
      .catch(error => {});
  }
}

function trimZero(value) {
  value.toString()[0] === '0'
    ? (value = Number(value.toString().slice(1)))
    : (value = Number(value));
}

function changesValuesForward(element) {
  element.textContent[0] === '0'
    ? (element.textContent = Number(element.textContent.slice(1)) + 1)
    : (element.textContent = Number(element.textContent) + 1);

  if (element.textContent.length < 2) {
    element.textContent = '0' + element.textContent.toString();
  }
}

function changesValuesBack(element) {
  element.textContent[0] === '0'
    ? (element.textContent = String(Number(element.textContent.slice(1)) - 1))
    : (element.textContent = String(Number(element.textContent) - 1));

  if (element.textContent.length < 2) {
    element.textContent = '0' + element.textContent.toString();
  }
}

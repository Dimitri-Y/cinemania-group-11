import axios from 'axios';
import {
  KEY,
  BASE_URL,
  IMG_BASE_URL,
  IMG_W400,
  UPCOMING_URL,
  TREND_URL,
} from './api-key';
import Pagination from 'tui-pagination';

let perPage = 10;
let page = 1;

const refs = {
  paginationListLinks: document.querySelectorAll('.pagination-list__link'),
  paginationBackArrow: document.querySelector('.pagination__back'),
  paginationForwardArrow: document.querySelector('.pagination__forward'),
  pagination: document.querySelector('.pagination'),
};

console.log(refs.paginationListLinks);

refs.pagination.addEventListener('click', onClick);

const options = {
  totalItems: 500,
  itemsPerPage: perPage,
  visiblePages: 4,
  page,
  template: {
    page: `<a href="#" class="tui-page-btn pagination-list__link">0{{page}}</a>`,
    currentPage: `<a href="#" class="pagination-list__link tui-page-btn selected">0{{page}}</a>`,
    moveButton:
      `<a href="#" class="tui-page-btn pagination__forward arrow">` +
      `</a>` +
      `<a href="#" class="tui-page-btn pagination__forward arrow">` +
      `</a>`,

    disabledMoveButton:
      `<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">` +
      `</span>`,
    moreButton: '<a href="" class="pagination-list__link">...</a>',
  },
};

const pagination = new Pagination('pagination', options);

function correctValue() {
  refs.paginationListLinks.forEach(item => {
    console.log(item);
    if (item.textContent.length > 2) {
      item.textContent.splice(0, 1);
    }
  });
}

function onClick(event) {
  event.preventDefault();
  page = event.target.textContent;
  console.log(page);
}

function checkClass() {
  refs.paginationListLinks.forEach(item => {
    console.log(item);
    if (item.classList.contains('selected')) {
      page = item.textContent;
    }
  });
}

correctValue();

checkClass();

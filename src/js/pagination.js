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

let name = '';
let page = 1;

const refs = {
  paginationListLinks: document.querySelectorAll('.pagination-list__link'),
  paginationBackArrow: document.querySelector('.pagination__back'),
  paginationForwardArrow: document.querySelector('.pagination__forward'),
  pagination: document.querySelector('.pagination'),
};

refs.pagination.addEventListener('click', onClick);

const options = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 4,
  template: {
    page:
    `<a href="#" class="tui-page-btn pagination-list__link">01</a>`,
    currentPage: `<a href="#" class="pagination-list__link selected">${page}</a>`,
    moveButton:
      `<a href="" class="pagination__back arrow tui-page-btn tui-{{type}} custom-class-{{type}}"></a>` +
      `<a href="" class="pagination__forward arrow"></a>`,
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton: '<a href="" class="pagination-list__link">...</a>',
  },
};

const pagination = new Pagination('pagination', options);

function onClick(event) {
  event.preventDefault();
  refs.paginationListLinks.forEach(item => {
    if (event.target === item) {
      page = event.target.textContent;
      console.log(page);
    }
  });
}

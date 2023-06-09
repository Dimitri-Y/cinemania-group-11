// ? -- Імпорти ключу та урли відео для бекенду ;
import axios from 'axios';
import { KEY, VIDEO_URL } from './api-key';
// * -- Посилання на елементи суспільних секцій та модалки ;
const refs = {
  body: document.querySelector('body'),
  catalogGal: document.querySelector('.catalog__gallery'),
  modalDet: document.querySelector('.modal-about'),
  modalImg: document.querySelector('.modal-about__img'),
  modalTitle: document.querySelector('.modal-about__title'),
  modalVote: document.querySelector('#voteSpan'),
  modalVotes: document.querySelector('#votesSpan'),
  modalPopularity: document.querySelector(
    '.modal-about-stat__number-item--popularity'
  ),
  modalGenre: document.querySelector('.modal-about-stat__number-item--genre'),
  modalDescription: document.querySelector('.modal-about__description'),
  modalAddLibraryBtn: document.querySelector('.modal-about__btn--add'),
  modalRemoveLibraryBtn: document.querySelector('.modal-about__btn--remove'),
  overlay: document.querySelector('.js-overlay-modal'),
  weeklyGal: document.querySelector('#cards__list'),
  // heroDetailsBtn: document.querySelector('.but2'),
  libraryGal: document.querySelector('.library-body__gallery'),
};
// ? -- Оголошення ключа сховища ;
const STORAGE_KEY = 'my-library-array';
// ? -- Створення внутрішнього масиву айдішок фільмів,
// ? - для подальшого фетчу ;
let libraryIdArray = [];
// ? -- Оновлення масиву айдішок,
// ? - якщо вдалось отримати дані з Local Storage ;
if (localStorage.getItem(STORAGE_KEY)) {
  libraryIdArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
}
// ! -- Асинхронна функція фетчу, що повертає data ;
async function fetchDetailsMovie(id) {
  const url = `${VIDEO_URL}/${id}?api_key=${KEY}`;
  const { data } = await axios.get(url);
  return data;
}
// ? -- Перевірка теперішньої відкритої сторінки ;
if (refs.weeklyGal === null && refs.libraryGal === null) {
  refs.catalogGal.addEventListener('click', onModalRender);
} else if (refs.catalogGal === null && refs.libraryGal === null) {
  refs.weeklyGal.addEventListener('click', onModalRender);
} else {
  refs.libraryGal.addEventListener('click', onModalRender);
}
let ElId = 0;
// ? -- Функція появи модалок ;
function onModalRender(evt) {
  ElId = evt.target.dataset.id;
  fetchDetailsMovie(ElId).then(response => renderAboutModal(response));
  if (evt.target.classList.contains('js-open-modal')) {
    refs.modalDet.classList.add('active');
    refs.overlay.classList.add('active');
    refs.body.classList.add('modal-about__no-scroll');
  }
  refs.modalAddLibraryBtn.addEventListener('click', onPushInLocalStorage);
  if (libraryIdArray.includes(ElId)) {
    onRemovingAddBtn();
  } else {
    onAddingAddBtn();
  }
  refs.modalRemoveLibraryBtn.addEventListener('click', onRemoveInLocalStorage);
}
// ? -- Запис потрібних значень в модалку ;
function renderAboutModal({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  overview,
  genres,
}) {
  let genreNames = genres.map(genre => genre.name).join(' ');
  refs.modalImg.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  refs.modalTitle.textContent = original_title;
  refs.modalVote.textContent = vote_average.toFixed(1);
  refs.modalVotes.textContent = vote_count;
  refs.modalGenre.textContent = genreNames;
  // refs.modalGenre.textContent = `${genres[0].name}`
  refs.modalPopularity.textContent = popularity.toFixed(1);
  refs.modalDescription.textContent = overview;
}
// ? -- Функція пушу значень в масив айдішок фільмів,
// ? - та запис їх в Local Storage ;
function onPushInLocalStorage() {
  libraryIdArray.push(ElId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(libraryIdArray));
  onRemovingAddBtn();
}
// ? -- Функція при видаленні фільму із Local Storage ;
function onRemoveInLocalStorage() {
  libraryIdArray.splice(libraryIdArray.indexOf(ElId), 1);
  onAddingAddBtn();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(libraryIdArray));
  if (!libraryIdArray[0]) {
    localStorage.removeItem(STORAGE_KEY);
  }
  if (refs.weeklyGal === null && refs.catalogGal === null) {
    location.reload();
  }
}
// ? -- Заміна кнопки додавання на видалення ;
function onRemovingAddBtn() {
  refs.modalAddLibraryBtn.classList.add('is-hidden');
  refs.modalRemoveLibraryBtn.classList.remove('is-hidden');
}
// ? -- Заміна кнопки видалення на додавання;
function onAddingAddBtn() {
  refs.modalAddLibraryBtn.classList.remove('is-hidden');
  refs.modalRemoveLibraryBtn.classList.add('is-hidden');
}
// * -- Додаткові функції для роботи модалок ;
!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close'),
    body = document.querySelector('body');
  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal-about[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add('active');
      overlay.classList.add('active');
      body.classList.add('modal-about__no-scroll');
    });
  });
  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal-about');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('modal-about__no-scroll');
    });
  });

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document
          .querySelector('.modal-about.active')
          .classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
        document
          .querySelector('body')
          .classList.remove('modal-about__no-scroll');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal-about.active').classList.remove('active');
    this.classList.remove('active');
    document.querySelector('body').classList.remove('modal-about__no-scroll');
  });
});

import { createFilmCardMarkup } from './card-markup';
import { createFilmCardMarkup320 } from './card-markup_320';

import { renderVideoLink } from './modal_window_watch';
import { TREND_DF_URL, KEY } from './api-key';

import '../css/hero.css';
import '../css/styles.css';

const refs = {
  blockMain: document.querySelector('main'),
  filmHero: document.querySelector('.hero'),
};
const ratings = document.querySelectorAll('.rating');
console.log(ratings);

fetch(`${TREND_DF_URL}?api_key=${KEY}`)
  // .then(response => response.json())
  .then(response => {
    return response.json();
  })
  .then(films => {
    if (films.results.length === 0) {
      showDefaulHero();
    } else if (films.results.length !== 0) {
      var randomFilm =
        films.results[Math.floor(Math.random() * films.results.length)];

      console.log(randomFilm);
      const randomRate = randomFilm.vote_average;

      // console.log(randomRate);

      //рендер разметки в HTML, если экран менее 768px?
      // разметка рандомного фильма с постером:
      // если экран более 768px - разметка с плакатом.

      const markup =
        document.documentElement.clientWidth < 768
          ? createFilmCardMarkup320(randomFilm)
          : createFilmCardMarkup(randomFilm);

      refs.blockMain.innerHTML = markup;
      console.log(refs.blockMain);

      const rateActive = refs.blockMain.querySelector('.ratingR__active');
      const rateActiveWidth = (randomRate / 10) * 100;
      rateActive.style.width = `${rateActiveWidth}%`;

      const id_movie = randomFilm.id;
      renderVideoLink(id_movie);
    }
  })
  .catch(error => {
    console.log(error);
  });

function showDefaulHero() {
  refs.filmHero.classList.remove('is-hidden');
}

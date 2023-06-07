import { createFilmCardMarkup } from './card-markup';
import { renderVideoLink } from './modal_window_watch';
// const axios = require('axios').default;
import '../css/hero.css';
import '../css/styles.css';
import { initRatings } from './star_rating';
// import { createStarsMarkup } from './stars-markup';

// import axios from 'axios';

const refs = {
  blockMain: document.querySelector('main'),
  filmHero: document.querySelector('.hero'),
};

fetch(
  'https://api.themoviedb.org/3/trending/movie/day?api_key=4523ef29a1d3e4e799126624640d84fe'
)
  // .then(response => response.json())
  .then(response => {
    return response.json();
  })
  .then(films => {
    // console.log(films);
    // console.log(films.results);
    // console.log(films.results[0].id);
    // const markup = createFilmCardMarkup(films);
    if (films.results.length === 0) {
      showDefaulHero();
    } else if (films.results.length !== 0) {
      var randomFilm =
        films.results[Math.floor(Math.random() * films.results.length)];
      // console.log(randomFilm);
      // console.log(randomFilm.id);
      // if (randomFilm !== 0) {
      //   hideDefaulHero();
      console.log(randomFilm);
      const markup = createFilmCardMarkup(randomFilm);
      console.log(markup);
      refs.blockMain.innerHTML = markup;
      console.log(refs.blockMain);

      const id_movie = randomFilm.id;
      renderVideoLink(id_movie);

      // renderStars();
      const rate = randomFilm.vote_average;
      initRatings(rating, rate);

      // const markupStars = createStarsMarkup;
    }
  })
  .catch(error => {
    console.log(error);
  });

function showDefaulHero() {
  refs.filmHero.classList.remove('is-hidden');
}

// function renderStars(randomFilm, querySelector) {
//   /* querySelector.insertAdjacentHTML('beforeend', createCards(data)); */
//   querySelector.innerHTML = markup;
// }

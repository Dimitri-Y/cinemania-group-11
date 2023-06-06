import { createFilmCardMarkup } from './card-markup';
import { renderVideoLink } from './modal_window_watch';
// const axios = require('axios').default;
import '../css/hero.css';
// import '../sass/header.scss';
import '../css/styles.css';

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
    if (films.results.length !== 0) {
      hideDefaulHero();
    }
    var randomFilm =
      films.results[Math.floor(Math.random() * films.results.length)];
    // console.log(randomFilm);
    // console.log(randomFilm.id);
    // if (randomFilm !== 0) {
    //   hideDefaulHero();
    console.log(randomFilm);
    const markup = createFilmCardMarkup(randomFilm);
    const id_movie = randomFilm.id;
    renderVideoLink(id_movie);
    console.log(markup);
    refs.blockMain.innerHTML = markup;
    console.log(refs.blockMain);
    // }
  })
  .catch(error => {
    console.log(error);
  });

function hideDefaulHero() {
  refs.filmHero.classList.add('is-hidden');
}

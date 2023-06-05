import axios from 'axios';
import { KEY, TREND_URL, IMG_BASE_URL, IMAGE_URL_W500 } from './api-key';
import { fetchMovieTrend } from './api';
import { getGenres } from './genre';
import { renderCards } from './movie_card';



let page = 1;

// ======fetch=====
export async function fetchMovieTrend(page) {
  const PAGE = `&page=${page}`;
  return await axios
    .get(`${TREND_URL}?api_key=${KEY}${PAGE}`)
    .then(response => response.data);
}

// =====CARD====
export function createCards(movies) {
  const { results } = movies;
  return results
    .map(
      ({ poster_path, title, release_date, id, genre_ids, vote_average }) => {
        let genre = getGenres(genre_ids);
        if (genre === '') {
          genre = 'unknown';
        }
        if (release_date === '') {
          release_date = 'none';
        }

        const truncatedTitle =
          title.length > 26 ? title.slice(0, 26) + '...' : title;
        const truncatedGenre =
          genre.length > 18 ? genre.slice(0, 18) + '...' : genre;
        const voteAverage = vote_average;
        return `<li class="movie-card">
      <img class="movie-card__img" src="${IMAGE_URL_W500}${poster_path}" alt="${title}" data-id="${id}" loading="lazy"/>
      <div class="movie-card__info">
      <p class="movie-card__title">${truncatedTitle}</p>
       <div class="movie-card__ganre-rating-wrap">
      <p class="movie-card__genre-year">${truncatedGenre} | ${release_date.slice(
          0,
          4
        )}</p>
      <div class="movie-card__rating"></div>
      </div>
      </div>
    </li>`;
      }
    )
    .join('');
}

// =====GENRE====
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

function getGenres(genreArr) {
  let genre = [];
  genreArr.map(genreId => {
    for (const g of genres) {
      if (genreId === g.id) {
        genre.push(g.name);
      }
    }
  });

  if (genre.length > 2) {
    genre.splice(2, 5);
  }
  return genre.join(', ');
}

// =====RENDER CARD====
export function renderCards(data, querySelector) {
querySelector.insertAdjacentHTML('beforeend', createCards(data)); 
  querySelector.innerHTML = createCards(data);
}

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

export const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

  console.log(page);

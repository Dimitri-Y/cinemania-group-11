import { IMAGE_URL_W500 } from './api-key';
import { getGenres } from './genre';

function createCards(data) {
  const { results } = data;
  return results
    .map(({ poster_path, title, release_date, id, genre_ids }) => {
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

      return `<li class="movie-card">
      <img class="movie-card__img" src="${IMAGE_URL_W500}${poster_path}" alt="${title}" data-id="${id}" loading="lazy"/>
      <div class="movie-card__info">
      <p class="movie-card__title">${truncatedTitle}</p>
       <div class="movie-card__ganre-rating-wrap">
      <p class="movie-card__genre-year">${truncatedGenre} | ${release_date.slice(
        0,
        4
      )}</p> 
      <div class="rating">
  <div class="rating__body">
    <div class="rating__active"></div>
    <div class="rating__items">
      <input class="rating__item" type="radio" value="1" name="rating">
      <input class="rating__item" type="radio" value="2" name="rating">
      <input class="rating__item" type="radio" value="3" name="rating">
      <input class="rating__item" type="radio" value="4" name="rating">
      <input class="rating__item" type="radio" value="5" name="rating">
    </div>

</div>
      </div>
      </div>
      </div>
    </li>`;
    })
    .join('');
}

// =====RENDER CARD====
function renderCards(data, querySelector) {
  /* querySelector.insertAdjacentHTML('beforeend', createCards(data)); */
  querySelector.innerHTML = createCards(data);
}

export { renderCards };

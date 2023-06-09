import { IMG_BASE_URL } from './api-key';

function createFilmCardMarkup320(randomFilm) {
  return `
 <div class="hero__img">
  <img class="hero__image" src="${IMG_BASE_URL}/original/${randomFilm.poster_path}" alt="${randomFilm.title}"/>
  <div class="hero__gradient">
  </div>

<div class="containerh hero__containerh">
  <h1 class="hero__title">
    ${randomFilm.title}
  </h1>
  <div class="ratingR">
    <div class="ratingR__body">
      <div class="ratingR__active">
      </div>
      <div class="ratingR__items">
        <input class="ratingR__item" type="radio" value="1" name="rating">
        <input class="ratingR__item" type="radio" value="2" name="rating">
        <input class="ratingR__item" type="radio" value="3" name="rating">
        <input class="ratingR__item" type="radio" value="4" name="rating">
        <input class="ratingR__item" type="radio" value="5" name="rating">
      </div>
      <div class="ratingR__value">
      </div>
    </div>
  </div>
  <div class="hero__p">
    <p>
      ${randomFilm.overview}
    </p>
  </div>
  <div class="hero_but">
    <button class="hero__but1" type="button" data-modal-open data-hystmodal="#modalVideo">
     Watch trailer
    </button>
    <button class="hero__but1 but2" type="button" data-modal-open>
      More details
    </button>
</div>
</div>
`;
}

export { createFilmCardMarkup320 };

function createFilmCardMarkup(randomFilm) {
  return `
 <div class="hero__img">
  <img class="hero__image" src="https://image.tmdb.org/t/p/original/${randomFilm.backdrop_path}" alt="${randomFilm.title}"/>
  <div class="hero__gradient">
  </div>

<div class="containerh hero__containerh">
  <h1 class="hero__title">
    ${randomFilm.title}
  </h1>
  <h2 class="hero__rate">
    ${randomFilm.vote_average}
  </h2>
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

export { createFilmCardMarkup };

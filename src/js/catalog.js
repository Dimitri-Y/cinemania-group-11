import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';

let page = 1;

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

// export const movieListContainer = document.querySelector('.catalog__gallery');
// fetchMovieTrend(page)
//   .then(data => {
//     renderCards(data, movieListContainer);
//   })
//   .catch(error => {
//     console.error('Error rendering movie cards:', error);
//   });


  export const movieListContainer = document.querySelector('.catalog__gallery');
  fetchMovieTrend(page)
    .then(data => {
      initRatings(data);
      renderCards(data, movieListContainer);
    })
    .catch(error => {
      console.error('Error rendering movie cards:', error);
    });

  console.log(page);

  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }

  function initRatings(data) {
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      const voteAverage = data[index].vote_average;
      console.log(voteAverage);
      initRating(rating, voteAverage);
    }
  }

  function initRating(rating, voteAverage) {
    const ratingActive = rating.querySelector('.rating__active');
    const ratingActiveWidth = voteAverage / 0.01;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

console.log(page);



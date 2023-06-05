
import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';


// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======
const page = 1;
const movieListContainer = document.querySelector('.catalog__gallery');
fetchMovieTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

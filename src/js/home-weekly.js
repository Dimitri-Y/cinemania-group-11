// import { fetchMovieTrend } from './api';
import { renderCards } from './movie_card';
import { initRatings } from './star_rating';
import { KEY, TREND_URL } from './api-key';
import axios from 'axios';

// ======ВИКЛИК ФУНКЦІЇ РЕНДЕРУ КАРТОК=======

async function fetchWeeklyTrend(page) {
  const PAGE = `&page=${page}`;
  return await axios
    .get(`${TREND_URL}?api_key=${KEY}${PAGE}`)
    .then(response => {
      const slicedResults = response.data.results.slice(0, 3);
      response.data.results = slicedResults;
      return response.data;
    });
}
let page = 1;

export const movieListContainer = document.querySelector('.weekly__gallery');
const childCount = movieListContainer.childElementCount;
fetchWeeklyTrend(page)
  .then(data => {
    renderCards(data, movieListContainer);
    initRatings(data);
    if (childCount === 3) return;
  })
  .catch(error => {
    console.error('Error rendering movie cards:', error);
  });

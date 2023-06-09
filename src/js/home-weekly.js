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

const weeklyListContainer = document.querySelector('.weekly__gallery');
function getAndRenderMovie() {
  fetchWeeklyTrend(page)
    .then(data => {
      renderCards(data, weeklyListContainer);
      initRatings(data);
    })
    .catch(error => {});
}
function toggleLastTwoMovies() {
  try {
    const movies = weeklyListContainer.querySelectorAll('li');
    const lastTwoMovies = Array.from(movies).slice(-2);

    if (window.innerWidth <= 767) {
      lastTwoMovies.forEach(movie => {
        movie.style.display = 'none';
      });
    } else {
      lastTwoMovies.forEach(movie => {
        movie.style.display = 'block';
      });
    }
  } catch (error) {}
}

// Викликати функцію при завантаженні сторінки та при зміні розміру вікна
try {
  window.addEventListener('DOMContentLoaded', getAndRenderMovie);
  window.addEventListener('DOMContentLoaded', toggleLastTwoMovies);
  window.addEventListener('resize', toggleLastTwoMovies);
} catch (error) {}

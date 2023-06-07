import axios from 'axios';
import { KEY, TREND_URL } from './api-key';

// запит на трендові фільми тижня
async function fetchMovieTrend(page) {
  const PAGE = `&page=${page}`;
  return await axios
    .get(`${TREND_URL}?api_key=${KEY}${PAGE}`)
    .then(response => response.data);
}

export { fetchMovieTrend };

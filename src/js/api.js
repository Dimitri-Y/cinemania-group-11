import axios from 'axios';
import {
  KEY,
  BASE_URL,
  IMG_BASE_URL,
  IMG_W400,
  UPCOMING_URL,
  TREND_DF_URL,
  TREND_URL,
  IMAGE_URL_W500,
  VIDEO_URL,
  SEARCH_URL,
} from './api-key';

// === запит на трендові фільми тижня===
async function fetchMovieTrend(page) {
  const PAGE = `&page=${page}`;
  return await axios
    .get(`${TREND_URL}?api_key=${KEY}${PAGE}`)
    .then(response => response.data);
}

export { fetchMovieTrend };

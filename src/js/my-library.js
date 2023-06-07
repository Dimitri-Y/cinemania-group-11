import axios from 'axios';
import { renderCards } from './movie_card';
import { fetchMovieTrend } from './api';
import { initRatings } from './star_rating';
import { KEY } from './api-key';
import axios from 'axios';
import { createFilmCardMarkup } from './card-markup';
// ? // Посилання ;
const myLibraryUrl = document.querySelector('.library-body__wrap');
// ? // Функція що робить фетч за допомогою axios ,
// ? за айді фільму, та повертає проміс ;
let page = 1;
let filmsIdsArray = [];
const STORAGE_KEY = 'my-library-array';
filmsIdsArray.push(JSON.parse(localStorage.getItem(STORAGE_KEY)));
console.log(filmsIdsArray);

// onPageStart(page);

// function onPageStart(page) {
//   fetchMovieTrend(page)
//     .then(data => {
//       renderCards(data, myLibraryUrl);
//       initRatings(data);
//       data.results;
//     })
//     .catch(error => {
//       console.error('Error rendering movie cards:', error);
//     });
// }
filmsIdsArray.forEach(id => {
  Promise.all(fetchMovieWithId(id));
  console.log(id);
});
async function fetchMovieWithId(movie_id) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY}&language=en-US`
    );
    const dataMarkup = createFilmCardMarkup(data, myLibraryUrl);
    myLibraryUrl.innerHTML = dataMarkup;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

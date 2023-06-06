import axios from 'axios';
import { KEY, SEARCH_URL } from './api-key';
import { renderCards } from './movie_card';
   
const searchFormEl = document.getElementById("idFormCatalog");
const clearBtn = document.querySelector(".catalog__btn-cross");
const movieListContainer = document.querySelector('.catalog__gallery');
    
const value = "";
let page = 1;

searchFormEl.addEventListener("submit", searchFilms);
clearBtn.addEventListener("click", resetForm);
searchFormEl.addEventListener("input", addCrossBtn);



function searchFilms(event){

    event.preventDefault();
    const value = searchFormEl.elements.name.value.trim();
    if (value === "") alert("Enter the name of the movie");
    else {
        fetchMovieSearch(page, value)
        .then(data => {
          renderCards(data, movieListContainer);
        })
        .catch(error => {
          console.error('Error rendering movie cards:', error);
        });
    } 
}

function resetForm(event){
    searchFormEl.elements.name.value = "";
    switchBtnCross();
    searchFormEl.addEventListener("input", addCrossBtn);
}

function addCrossBtn(){
    switchBtnCross();
    searchFormEl.removeEventListener("input", addCrossBtn);
}

function switchBtnCross(){
    clearBtn.classList.toggle("ishidden");
}


async function fetchMovieSearch(page, value) {
  const PAGE = `&page=${page}`;
  const QUERY = `&query=${value}`;
  return await axios
    .get(`${SEARCH_URL}?api_key=${KEY}${QUERY}${PAGE}`)
    .then(response => response.data);
}
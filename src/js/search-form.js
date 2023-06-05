
    const searchFormEl = document.getElementById("idFormCatalog");
    const clearBtn = document.querySelector(".catalog__btn-cross")


    searchFormEl.addEventListener("submit", searchFilms);
    clearBtn.addEventListener("click", resetForm);
    searchFormEl.addEventListener("input", addCrossBtn);

const value = "";

function searchFilms(event){

    event.preventDefault();
    const value = searchFormEl.elements.name.value.trim();
    if (value === "") alert("Enter the name of the movie");
    else {
        console.log(value);
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
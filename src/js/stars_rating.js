const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }
  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth(rating);
  }
  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    // ratingValue = rating.querySelector('.rating__value');
  }
  // присвоїти індексу значення рейтингу
  function setRatingActiveWidth(index = ratingValue.textContent) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
}

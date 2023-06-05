// const ratings = document.querySelectorAll('.rating');
// if (ratings.length > 0) {
//   initRatings();
// }

// function initRatings() {
//   for (let index = 0; index < ratings.length; index++) {
//     const rating = ratings[index];
//     initRating(rating);
//   }
//   // присвоїти індексу значення рейтингу
//   function initRating(rating) {
//     const ratingActive = rating.querySelector('.rating__active');
//     const voteAverage = parseFloat(rating.dataset.voteAverage);
//     const ratingActiveWidth = voteAverage / 0.01;
//     ratingActive.style.width = `${ratingActiveWidth}%`;
//   }
// }

// export { initRatings };
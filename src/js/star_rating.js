const ratings = document.querySelectorAll('.rating');
// if (ratings.length > 0) {
//   initRatings();
// }
initRatings();
function initRatings(data) {
  console.log(ratings);
  // console.log(data.results[0].vote_average);

  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    const voteAverage = data.results[index].vote_average;

    initRating(rating, voteAverage);
  }
}

function initRating(rating, voteAverage) {
  console.log('hello');
  const ratingActive = rating.querySelector('.rating__active');
  const ratingActiveWidth = voteAverage / 0.01;
  ratingActive.style.width = `${ratingActiveWidth}%`;
}

export { initRatings };

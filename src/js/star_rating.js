

function initRatings(data) {
  const ratings = document.querySelectorAll('.rating');
  console.log(ratings);
  // console.log(data.results[0].vote_average);
  if (ratings.length > 0) {
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      const voteAverage = data.results[index].vote_average;

      initRating(rating, voteAverage);
    }
  }
}

function initRating(rating, voteAverage) {
  const ratingActive = rating.querySelector('.rating__active');
  const ratingActiveWidth = (voteAverage / 10) * 100;
  ratingActive.style.width = `${ratingActiveWidth}%`;
}

export { initRatings };

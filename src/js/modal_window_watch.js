import './dict-modal/hystmodal.min.js';
import axios from 'axios';
import { KEY, VIDEO_URL } from './api-key';
import '../css/modal_window_watch.css';

const iframeVideo = document.getElementById('iframe_container');
const iframeEl = document.getElementById('iframe');
const iframeVideoError = document.getElementById('errorWatchVideo');

// ======fetch=====
async function fechMovieVideo(movie_id) {
  try {
    const { data } = await axios.get(
      `${VIDEO_URL}/${movie_id}/videos?api_key=${KEY}&language=en-US`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function renderVideoLink(movie_id) {
  try {
    if ((await fechMovieVideo(movie_id)) === undefined) {
      iframeVideo.classList.add('is-hidden');
      iframeVideoError.classList.remove('is-hidden');
    } else {
      iframeVideo.classList.remove('is-hidden');
      iframeVideoError.classList.add('is-hidden');
    }

    const { results } = await fechMovieVideo(movie_id);

    // console.log(results);
    const keyVideo = results[0].key;
    // console.log(keyVideo);
    iframeEl.setAttribute(
      'src',
      `https://www.youtube.com/embed/${keyVideo}?enablejsapi=1&rel=0&showinfo=0`
    );
  } catch (error) {
    // console.error(error);
  }
}


const myModal = new HystModal({
  // for dynamic init() of modals
  // linkAttributeName: false,
  catchFocus: true,
  closeOnEsc: true,
  backscroll: true,
  beforeOpen: function (modal) {
    //   console.log('Message before opening the modal');
    //   console.log(modal); //modal window object
  },
  afterClose: function (modal) {
    //   console.log('Message after modal has closed');
    //   console.log(modal); //modal window object

    //If Youtube video inside Modal, close it on modal closing
    let videoframe = modal.openedWindow.querySelector('iframe');
    if (videoframe) {
      videoframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        '*'
      );
    }
  },
});

// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US',
//   headers: { accept: 'application/json', Authorization: `Bearer ${KEY}` },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

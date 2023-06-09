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
    iframeVideo.classList.add('is-hidden');
    return data;
  } catch (error) {}
}
export async function renderVideoLink(movie_id) {
  try {
    // iframeEl.style.display = 'block';
    if ((await fechMovieVideo(movie_id)) !== undefined) {
      iframeVideo.classList.remove('is-hidden');
      iframeVideoError.classList.add('is-hidden');
    } else {
      iframeVideo.classList.add('is-hidden');
      iframeVideoError.classList.remove('is-hidden');
    }

    const { results } = await fechMovieVideo(movie_id);
    const keyVideo = results[0].key;
    iframeEl.setAttribute(
      'src',
      `https://www.youtube.com/embed/${keyVideo}?enablejsapi=1&rel=0&showinfo=0`
    );
  } catch (error) {}
}

const myModal = new HystModal({
  catchFocus: true,
  closeOnEsc: true,
  backscroll: true,
  beforeOpen: function (modal) {},
  afterClose: function (modal) {
    let videoframe = modal.openedWindow.querySelector('iframe');
    if (videoframe) {
      videoframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        '*'
      );
    }
  },
});

const refs = {
  openModalBtnFooter: document.querySelector('[data-modal-open-footer]'),
  closeModalBtnFooter: document.querySelector('[data-modal-close-footer]'),
  modalFooter: document.querySelector('[data-modal-footer]'),
  goBackModalBtnFooter: document.querySelector('[data-modal-go-back-footer]'),
  backdropFooter: document.querySelector(".footer-contain__backdrop"),
};

refs.openModalBtnFooter.addEventListener('click', openModalFooter);
refs.closeModalBtnFooter.addEventListener('click', closeModalFooter);
refs.goBackModalBtnFooter.addEventListener('click', closeModalFooter);
refs.backdropFooter.addEventListener('click', closeOnBdrModalFooter)
window.addEventListener('keydown', onEscKeyPressFooter);

function openModalFooter(e) {
  e.preventDefault();
  refs.modalFooter.classList.remove('footer-contain__is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModalFooter() {
  refs.modalFooter.classList.add('footer-contain__is-hidden');
  document.body.style.overflow = '';
}

function onEscKeyPressFooter(e) {
  if (e.code === 'Escape') {
    closeModalFooter();
  }
}

function closeOnBdrModalFooter(e) {
  if (e.target === refs.backdropFooter) {
    closeModalFooter();
  }
}
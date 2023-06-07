const refs = {
  openModalBtnFooter: document.querySelector('[data-modal-open-footer]'),
  closeModalBtnFooter: document.querySelector('[data-modal-close-footer]'),
  modalFooter: document.querySelector('[data-modal-footer]'),
  goBackModalBtnFooter: document.querySelector('[data-modal-go-back-footer]'),
};

refs.openModalBtnFooter.addEventListener('click', openModalFooter);
refs.closeModalBtnFooter.addEventListener('click', closeModalFooter);
refs.goBackModalBtnFooter.addEventListener('click', closeModalFooter);
window.addEventListener('keydown', onEscKeyPressFooter);

function openModalFooter(event) {
  event.preventDefault();
  refs.modalFooter.classList.remove('footer-contain__is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModalFooter() {
  refs.modalFooter.classList.add('footer-contain__is-hidden');
  document.body.style.overflow = '';
}

function onEscKeyPressFooter(event) {
  if (event.code === 'Escape') {
    closeModalFooter();
  }
}

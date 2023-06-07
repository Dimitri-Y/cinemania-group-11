(() => {
  const refs = {
    openModalBtnFooter: document.querySelector('[data-modal-open-footer]'),
    closeModalBtnFooter: document.querySelector('[data-modal-close-footer]'),
    modalFooter: document.querySelector('[data-modal-footer]'),
    goBackModalBtmFooter: document.querySelector('[data-modal-go-back-footer]'),
  };

  refs.openModalBtnFooter.addEventListener('click', openModal);
  refs.closeModalBtnFooter.addEventListener('click', closeModal);
  refs.goBackModalBtmFooter.addEventListener('click', closeModal);
  window.addEventListener('keydown', onEscKeyPress);

  function openModal() {
    refs.modalFooter.classList.remove('footer-contain__is-hidden');
    document.body.style.overflow = 'hidden'; 
  }

  function closeModal() {
    refs.modalFooter.classList.add('footer-contain__is-hidden');
    document.body.style.overflow = ''; 
  }

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
})();

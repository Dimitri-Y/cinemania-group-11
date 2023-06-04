import './dict-modal/hystmodal.min.js';

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

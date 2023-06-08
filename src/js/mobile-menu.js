(() => {
  const elements = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('body'),
    menu: document.querySelector('[data-menu]'),
    menuItems: document.querySelectorAll('.menu-item-mob a, .menu-item'),
  };

  elements.openMenuBtn.addEventListener('click', toggleMenu);
  document.addEventListener('click', handleOutsideClick);

  // add "current"
  elements.menuItems.forEach(menuItem => {
    const menuItemPath = menuItem.getAttribute('href');
    if (window.location.pathname.endsWith(menuItemPath)) {
      menuItem.classList.add('current');
    }
  });

  function toggleMenu() {
    elements.menu.classList.toggle('is-hidden-menu');
    document.body.classList.toggle('no-scroll');
  }

  function handleOutsideClick(event) {
    if (
      !elements.menu.contains(event.target) &&
      !elements.openMenuBtn.contains(event.target)
    ) {
      elements.menu.classList.add('is-hidden-menu');
      document.body.classList.remove('no-scroll');
    }
  }
})();

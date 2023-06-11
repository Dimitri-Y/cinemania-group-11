(() => {
  const elements = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('.backdrop'),
    menu: document.querySelector('[data-menu]'),
    menuItems: document.querySelectorAll('.menu-item-mob a, .menu-item'),
    backdrop: document.querySelector('.backdrop'),
    darkThemeBtn: document.getElementById('darkThemeBtn'),
    lightThemeBtn: document.getElementById('lightThemeBtn')
  };

  elements.openMenuBtn.addEventListener('click', toggleMenu);
  elements.closeMenuBtn.addEventListener('click', closeMenu);
  elements.menuItems.forEach(menuItem => {
    const menuItemPath = menuItem.getAttribute('href');
    if (window.location.pathname.endsWith(menuItemPath)) {
      menuItem.classList.add('current')
    } else {
      menuItem.classList.remove('current');
    }
  });

  function toggleMenu() {
    elements.menu.classList.toggle('is-hidden-menu');
    elements.backdrop.classList.toggle('is-visible');
    document.body.classList.toggle('no-scroll');

    if (elements.menu.classList.contains('is-hidden-menu')) {
      document.removeEventListener('keydown', handleKeyDown);
    } else {
      document.addEventListener('keydown', handleKeyDown);
    }
  }

  function closeMenu() {
    elements.menu.classList.add('is-hidden-menu');
    elements.backdrop.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleOutsideClick(event) {
    if (
      !elements.menu.contains(event.target) &&
      !elements.openMenuBtn.contains(event.target)
    ) {
      closeMenu();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }

  function toggleTheme() {
    elements.darkThemeBtn.classList.toggle('hidden-menu');
    elements.lightThemeBtn.classList.toggle('hidden-menu');
  }

  elements.darkThemeBtn.addEventListener('click', toggleTheme);
  elements.lightThemeBtn.addEventListener('click', toggleTheme);

  document.addEventListener('click', handleOutsideClick);
})();

(() => {
  const elements = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector(".backdrop"),
    menu: document.querySelector("[data-menu]"),
    menuItems: document.querySelectorAll(".menu-item-mob a, .menu-item"),
    backdrop: document.querySelector(".backdrop"),
  };

  elements.openMenuBtn.addEventListener("click", toggleMenu);
  elements.closeMenuBtn.addEventListener("click", closeMenu); 
  elements.menuItems.forEach((menuItem) => {
    const menuItemPath = menuItem.getAttribute("href");
    if (window.location.pathname.endsWith(menuItemPath)) {
      menuItem.classList.add("current");
    }
  });

  function toggleMenu() {
    elements.menu.classList.toggle("is-hidden-menu");
    elements.backdrop.classList.toggle("is-visible");
    document.body.classList.toggle("no-scroll");
  }

  function closeMenu() {
    elements.menu.classList.add("is-hidden-menu");
    elements.backdrop.classList.remove("is-visible");
    document.body.classList.remove("no-scroll");
  }

  function handleOutsideClick(event) {
    if (
      !elements.menu.contains(event.target) &&
      !elements.openMenuBtn.contains(event.target)
    ) {
      closeMenu();
    }
  }
  document.addEventListener("click", handleOutsideClick);
})();

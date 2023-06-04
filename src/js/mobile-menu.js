(() => {
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("body"),
    menu: document.querySelector("[data-menu]"),
    menuItems: document.querySelectorAll(".menu-item-mob a, .menu-item"),
  };

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  document.addEventListener("click", handleOutsideClick);

  // add "current"
  refs.menuItems.forEach((menuItem) => {
    const menuItemPath = menuItem.getAttribute("href");
    console.log("menuItemPath:", menuItemPath);
    console.log("window.location.pathname:", window.location.pathname);
    if (window.location.pathname.endsWith(menuItemPath)) {
      menuItem.classList.add("current");
    }
  });

  function toggleMenu() {
    refs.menu.classList.toggle("is-hidden");
    document.body.classList.toggle("no-scroll");
  }

  function handleOutsideClick(event) {
    if (
      !refs.menu.contains(event.target) &&
      !refs.openMenuBtn.contains(event.target)
    ) {
      refs.menu.classList.add("is-hidden");
      document.body.classList.remove("no-scroll");
    }
  }
})();

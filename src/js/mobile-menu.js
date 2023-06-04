(() => {
 const refs = {
   openMenuBtn: document.querySelector("[data-menu-open]"),
   closeMenuBtn: document.querySelector("body"),
   menu: document.querySelector("[data-menu]"),
 };

 refs.openMenuBtn.addEventListener("click", toggleMenu);
 document.addEventListener("click", handleOutsideClick);

 function toggleMenu() {
   refs.menu.classList.toggle("is-hidden");
   document.body.classList.toggle("no-scroll");
 }

 function handleOutsideClick(event) {
   if (!refs.menu.contains(event.target) && !refs.openMenuBtn.contains(event.target)) {
     refs.menu.classList.add("is-hidden");
     document.body.classList.remove("no-scroll");
   }
 }
})();


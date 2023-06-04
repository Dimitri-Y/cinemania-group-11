(() => {
 const darkThemeBtn = document.querySelector("#darkThemeBtn");
 const lightThemeBtn = document.querySelector("#lightThemeBtn");
 const body = document.querySelector("body");

 darkThemeBtn.addEventListener("click", toggleThemes);
 lightThemeBtn.addEventListener("click", toggleThemes);

 function toggleThemes() {
   body.classList.toggle("light-theme");
   darkThemeBtn.classList.toggle("hidden");
   lightThemeBtn.classList.toggle("hidden");
 }
})();

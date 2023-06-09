// save theme in localStorage
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
}

// download changed theme
function loadThemePreference() {
  return localStorage.getItem('theme');
}

// choose theme
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }
}

// switch theme
function toggleThemes() {
  const body = document.querySelector('body');
  const darkThemeBtn = document.querySelector('#darkThemeBtn');
  const lightThemeBtn = document.querySelector('#lightThemeBtn');

  body.classList.toggle('light-theme');
  darkThemeBtn.classList.toggle('hidden');
  lightThemeBtn.classList.toggle('hidden');

  // theme after chose
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  saveThemePreference(theme);
}

const darkThemeBtn = document.querySelector('#darkThemeBtn');
const lightThemeBtn = document.querySelector('#lightThemeBtn');
try {
  darkThemeBtn.addEventListener('click', toggleThemes);
  lightThemeBtn.addEventListener('click', toggleThemes);
} catch (error) {}
const savedTheme = loadThemePreference();

if (savedTheme) {
  applyTheme(savedTheme);
}

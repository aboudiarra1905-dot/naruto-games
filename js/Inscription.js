
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show');
});

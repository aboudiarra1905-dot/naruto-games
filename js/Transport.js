document.querySelectorAll('.effect-btn').forEach(button => {
  button.addEventListener('click', () => {
    const character = button.dataset.character;
    let card, audio;

    if(character === 'minato') {
      card = document.getElementById('minato-card');
      audio = document.getElementById('sound-minato');
      card.classList.add('animate-eclair');
    } else if(character === 'obito') {
      card = document.getElementById('obito-card');
      audio = document.getElementById('sound-obito');
      card.classList.add('animate-tournesol');
    }

    if(audio) {
      audio.currentTime = 0;
      audio.play();
    }

    // Redirection après l'animation
    setTimeout(() => {
      window.location.href = 'Quiz.html';
    }, 1500); // correspond à la durée des animations
  });
});


const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show');
});

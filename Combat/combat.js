let startBtn = document.getElementById("start-btn");
let clickBtn = document.getElementById("click-btn");
let message = document.getElementById("message");
let result = document.getElementById("result");

let rasenganSound = document.getElementById("rasengan-sound");
let chidoriSound = document.getElementById("chidori-sound");

let startTime;
let timeout;

// Effets visuels
let narutoChakra = document.getElementById("chakra-left");
let sasukeChakra = document.getElementById("chakra-right");
let naruto = document.querySelector(".left");
let sasuke = document.querySelector(".right");

// Fonction pour (re)lancer le jeu
function startGame() {
  message.textContent = "Prépare-toi...";
  result.textContent = "";
  clickBtn.disabled = true;

  naruto.classList.remove("win");
  sasuke.classList.remove("win");
  narutoChakra.classList.remove("active");
  sasukeChakra.classList.remove("active");

  let delay = Math.random() * 3000 + 1000; // entre 1s et 4s

  timeout = setTimeout(() => {
    message.textContent = "⚡ Rasengan !!! ⚡";
    clickBtn.disabled = false;
    startTime = new Date().getTime();
  }, delay);
}

// Réaction au clic/touch
function handleClick() {
  let now = new Date().getTime();
  let reactionTime = now - startTime;

  if (clickBtn.disabled) {
    clearTimeout(timeout);
    message.textContent = "Trop tôt ! 😅";
    result.textContent = "";
    return;
  }

  clickBtn.disabled = true;
  message.textContent = "";
  result.textContent = `Temps de réaction : ${reactionTime} ms`;

  if (reactionTime < 300) {
    result.textContent += " 🏆 Minato et  Naruto gagne !";
    rasenganSound.play();
    naruto.classList.add("win");
    narutoChakra.classList.add("active");
  } else if (reactionTime < 600) {
    result.textContent += " ⚡ Match serré !";
  } else {
    result.textContent += " 😈 Itachi et Sasuke prend l’avantage !";
    chidoriSound.play();
    sasuke.classList.add("win");
    sasukeChakra.classList.add("active");
  }
}

// Événements : clic + tactile
startBtn.addEventListener("click", startGame);
clickBtn.addEventListener("click", handleClick);
clickBtn.addEventListener("touchstart", handleClick);


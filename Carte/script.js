
// --- RÉCUPÉRATION DU NIVEAU ---
const params = new URLSearchParams(window.location.search);
const level = params.get("level") || "facile";

// --- PERSONNAGES NARUTO ---
const allCards = [
  { name: "jubidaraa", img: "Jubidaraa.jpg" },
  { name: "ashirama", img: "Ashirama.jpg" },
  { name: "jiraya", img: "Jiraya.jpg" },
  { name: "minato", img: "Minato.jpg" },
  { name: "obito", img: "Obito.jpg" },
  { name: "kakashi", img: "Kakashi.jpg" },
  { name: "itachi", img: "Itachi.jpg" },
  { name: "gaara", img: "Gaara.jpg" },
  { name: "sasuke", img: "Sasuke.jpg" },
  { name: "naruto", img: "Naruto.png" }
];

// --- NOMBRE DE PAIRES SELON LE NIVEAU ---
let numPairs = 6;
if (level === "moyen") numPairs = 8;
if (level === "difficile") numPairs = 10;

// --- SÉLECTION ALÉATOIRE DES CARTES ---
const selectedCards = allCards.slice(0, numPairs);
const cards = shuffle([...selectedCards, ...selectedCards]);

// --- VARIABLES DU JEU ---
const gameBoard = document.getElementById("gameBoard");
let moves = 0, matched = 0;
let firstCard, secondCard, lockBoard = false;
let time = 0, timerInterval;
let bgMusicStarted = false;

// --- SONS ---
const bgMusic = document.getElementById("bg-music");
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const winSound = document.getElementById("win-sound");

// --- CRÉATION DE LA GRILLE ---
function createBoard() {
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.name = card.name;
    cardDiv.innerHTML = `
      <div class="front">🍥</div>
      <div class="back"><img src="${card.img}" alt="${card.name}"></div>
    `;
    cardDiv.addEventListener("click", flipCard);
    gameBoard.appendChild(cardDiv);
  });

  if (level === "facile") gameBoard.style.gridTemplateColumns = "repeat(3, 1fr)";
  if (level === "moyen") gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
  if (level === "difficile") gameBoard.style.gridTemplateColumns = "repeat(5, 1fr)";
}

// --- MÉLANGE ---
function shuffle(array) { return array.sort(() => 0.6 - Math.random()); }

// --- CHRONO ---
function startTimer() {
  timerInterval = setInterval(() => { time++; document.getElementById("time").textContent = time; }, 1000);
}

// --- RETOURNEMENT ---
function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");
  flipSound.play();

  if (!bgMusicStarted) { bgMusic.play(); bgMusicStarted = true; }

  if (moves === 0 && time === 0) startTimer();

  if (!firstCard) { firstCard = this; return; }
  secondCard = this;
  moves++; document.getElementById("moves").textContent = moves;
  checkMatch();
}

// --- VÉRIFICATION ---
function checkMatch() {
  let match = firstCard.dataset.name === secondCard.dataset.name;
  match ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matched++; matchSound.play();
  if (matched === numPairs) winGame();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 900);
}

function resetBoard() { [firstCard, secondCard, lockBoard] = [null, null, false]; }

// --- VICTOIRE ---
function winGame() {
  clearInterval(timerInterval);
  document.getElementById("winMessage").classList.remove("hidden");
  winSound.play();
  bgMusic.pause();
  confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
}


// --- GÉRER LES MEILLEURS TEMPS ---
function updateHighscores() {
  const storedScores = JSON.parse(localStorage.getItem("highscores")) || {};
  const levelScores = storedScores[level] || [];

  // Ajouter le nouveau temps
  levelScores.push(time);
  // Trier du plus petit au plus grand
  levelScores.sort((a, b) => a - b);
  // Garder seulement les 5 meilleurs
  storedScores[level] = levelScores.slice(0, 5);

  // Sauvegarder
  localStorage.setItem("highscores", JSON.stringify(storedScores));

  // Afficher
  displayHighscores();
}

function displayHighscores() {
  const storedScores = JSON.parse(localStorage.getItem("highscores")) || {};
  const levelScores = storedScores[level] || [];
  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";
  levelScores.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i+1}. ${t}s`;
    scoreList.appendChild(li);
  });
}

// --- APPELER LORS DE LA VICTOIRE ---
function winGame() {
  clearInterval(timerInterval);
  document.getElementById("winMessage").classList.remove("hidden");
  winSound.play();
  bgMusic.pause();
  confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });

  // Mettre à jour le tableau
  updateHighscores();
}

// --- AFFICHER LES SCORES AU CHARGEMENT ---
displayHighscores();

// --- BOUTONS ---
document.getElementById("restart").addEventListener("click", () => location.reload());
document.getElementById("menu").addEventListener("click", () => window.location.href = "index.html");
document.getElementById("accueil").addEventListener("click", () => window.location.href = "../Page/Accueil.html");

// --- LANCEMENT ---
createBoard();

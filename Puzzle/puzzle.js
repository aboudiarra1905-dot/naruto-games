// ======== ELEMENTS HTML ========
const puzzleContainer = document.getElementById("puzzle-container");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("nextLevel");
const startBtn = document.getElementById("start");
const adventureBtn = document.getElementById("adventureMode");
const adventureScoreDisplay = document.getElementById("adventureScore");
const messageDisplay = document.getElementById("message");
const resetProfileBtn = document.getElementById("resetProfile");
const resetBtn = document.getElementById("reset");
const difficultySelect = document.getElementById("difficulty");
const playerBadgesContainer = document.getElementById("playerBadges");
const playerNameEl = document.getElementById("playerName");
const playerXPEl = document.getElementById("playerXP");
const playerRankEl = document.getElementById("playerRank");
const rankBar = document.getElementById("rankBar");

// ======== VARIABLES ========
let images = [
  "Kakashi.jpg",
  "Hagoromo.jpg",
  "Gaara.jpg",
  "Equipe7.png",
  "Ashirama.jpg",
  "Tobirama.jpg",
  "ashura.WEBP"
];
let selectedImage;
let pieces = [];
let shuffledPieces = [];
let firstMove = false;
let timer;
let timeLeft = 60;
let gridSize = parseInt(difficultySelect.value);
let adventureScore = parseInt(localStorage.getItem("adventureScore")) || 0;

// ======== PROFIL ========
let playerName = localStorage.getItem("playerName") || prompt("Entrez votre pseudo ninja :");
if(!localStorage.getItem("playerName")) localStorage.setItem("playerName", playerName);
let playerXP = parseInt(localStorage.getItem("playerXP")) || 0;
let badges = JSON.parse(localStorage.getItem("playerBadges")) || [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// ======== MISSIONS ========
let dailyMissions = [
  {desc:"Terminer un puzzle", done:false, reward:50},
  {desc:"Finir un puzzle en moins de 30s", done:false, reward:100}
];

// ======== PROFIL / RANG / BADGES ========
function getRank(xp){
  if(xp >= 2000) return "Hokage 👑";
  else if(xp >= 900) return "Chûnin ⚔️";
  else if(xp >= 500) return "Jônin 🥷";
  else return "Genin 🥋";
}

function updateProfile(){
  playerNameEl.textContent = playerName;
  playerXPEl.textContent = playerXP;
  playerRankEl.textContent = getRank(playerXP);
  rankBar.style.width = Math.min(playerXP/10, 100) + "%";
  displayBadges();
}

function addXP(amount){
  playerXP += amount;
  localStorage.setItem("playerXP", playerXP);
  updateProfile();
  checkBadges();
}

// ======== BADGES ========
function checkBadges(){
  let newBadge = null;
  if(playerXP >= 500 && !badges.includes("🥋 Débutant Ninja")) newBadge = "🥋 Débutant Ninja";
  if(playerXP >= 900 && !badges.includes("⚔️ Chûnin")) newBadge = "⚔️ Chûnin";
  if(playerXP >= 2000 && !badges.includes("👑 Hokage")) newBadge = "👑 Hokage";
  if(newBadge){
    badges.push(newBadge);
    localStorage.setItem("playerBadges", JSON.stringify(badges));
    displayBadges();
    alert(`🎉 Nouveau badge obtenu : ${newBadge}`);
  }
}

function displayBadges(){
  playerBadgesContainer.innerHTML = "";
  badges.forEach(b=>{
    const span = document.createElement("span");
    span.textContent = b;
    playerBadgesContainer.appendChild(span);
    setTimeout(()=>{span.classList.add("show")},100);
  });
}

// ======== PUZZLE ========
function startGame(){
  clearInterval(timer);
  firstMove = false;
  gridSize = parseInt(difficultySelect.value);
  selectedImage = images[Math.floor(Math.random()*images.length)];
  timeLeft = 100;
  scoreDisplay.textContent = "Score : 0";
  messageDisplay.textContent = "";
  createPuzzle(gridSize, selectedImage);
  updateProfile();
  adventureScoreDisplay.textContent = `Score cumulé : ${adventureScore}`;
}

function createPuzzle(size, imageSrc){
  puzzleContainer.innerHTML = "";
  pieces = [];
  puzzleContainer.style.gridTemplateColumns = `repeat(${size}, ${400/size}px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${size}, ${400/size}px)`;
  for(let i=0;i<size*size;i++){
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.width = `${400/size}px`;
    piece.style.height = `${400/size}px`;
    piece.style.backgroundImage = `url(${imageSrc})`;
    piece.style.backgroundSize = `400px 400px`;
    piece.style.backgroundPosition = `${-(i%size)*(400/size)}px ${-Math.floor(i/size)*(400/size)}px`;
    piece.dataset.index = i;
    pieces.push(piece);
  }
  shuffledPieces = [...pieces].sort(()=> Math.random()-0.5);
  shuffledPieces.forEach(p=>puzzleContainer.appendChild(p));
  addClickEvents();
}

// ======== CLICK EVENTS ========
function addClickEvents(){
  let firstClick = null;
  shuffledPieces.forEach(piece=>{
    piece.addEventListener("click", ()=>{
      if(!firstMove){ firstMove=true; startTimer(); }
      if(!firstClick){ firstClick=piece; piece.style.border="2px solid #00ff99"; }
      else{
        const firstIndex = Array.from(puzzleContainer.children).indexOf(firstClick);
        const secondIndex = Array.from(puzzleContainer.children).indexOf(piece);
        puzzleContainer.insertBefore(firstClick, puzzleContainer.children[secondIndex]);
        puzzleContainer.insertBefore(piece, puzzleContainer.children[firstIndex]);
        firstClick.style.border="none";
        firstClick=null;
        checkWin();
      }
    });
  });
}

// ======== TIMER ========
function startTimer(){
  if(timer) clearInterval(timer);
  timer = setInterval(()=>{
    timeLeft--;
    timerDisplay.innerHTML = `⏱️ Temps : <strong>${timeLeft}s</strong>`;
    if(timeLeft<=0){ clearInterval(timer); messageDisplay.textContent="💀 Temps écoulé !"; }
  },1000);
}

// ======== CHECK WIN ========
function checkWin(){
  const currentOrder = Array.from(puzzleContainer.children).map(p=>p.dataset.index);
  const isWin = currentOrder.every((val,idx)=> val==idx);
  if(isWin){
    clearInterval(timer);
    calculateScore();
    confetti();
    messageDisplay.textContent = "🎉 Puzzle terminé !";
  }
}

// ======== SCORE ========
function calculateScore(){
  let multiplier = timeLeft<=30 ? 2 : timeLeft<=60 ? 1.5 : 1;
  const score = Math.floor(((gridSize*100)+(timeLeft*5))*multiplier);
  scoreDisplay.textContent = `Score : ${score}`;
  addXP(score);
  adventureScore += score;
  localStorage.setItem("adventureScore", adventureScore);
  adventureScoreDisplay.textContent = `Score cumulé : ${adventureScore}`;
  checkDailyMission(score, timeLeft);
}

// ======== DAILY MISSIONS ========
function checkDailyMission(score, time){
  dailyMissions.forEach(m=>{
    if(!m.done){
      if(m.desc.includes("Terminer") && score>0) unlockMission(m);
      if(m.desc.includes("<30s") && time<=30) unlockMission(m);
    }
  });
}

function unlockMission(mission){
  mission.done = true;
  addXP(mission.reward);
  alert(`🎯 Mission accomplie ! +${mission.reward} XP`);
}

// ======== BUTTONS ========
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", startGame);

resetProfileBtn.addEventListener("click", ()=>{
  if(confirm("Voulez-vous vraiment réinitialiser votre profil ? Tout sera perdu !")){
    localStorage.clear();
    location.reload();
  }
});

resetBtn.addEventListener("click", startGame);

adventureBtn.addEventListener("click", ()=>{
  alert("Mode aventure activé ! Terminez plusieurs puzzles pour cumuler votre score.");
});

// ======== INITIAL ========
startGame();
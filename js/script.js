
// Sélectionne toutes les colonnes contenant les cartes
const revealCols = document.querySelectorAll('.col-12');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Supprime puis réapplique la classe pour rejouer l'animation
      entry.target.classList.remove('active');
      void entry.target.offsetWidth; // reflow pour rejouer l'animation
      //Détecter l'index dans le ligne
      const allCols = Array.from(revealCols);
      const index = allCols.indexOf(entry.target);
      const delay = (index % 4) * 150 + Math.floor(index/4) * 200;

      // Animation séquentielle
      setTimeout(() => {
        entry.target.classList.add('active');
      }, delay); // 0.2s entre chaque carte
    } else {
      // Supprime la classe quand la carte sort du viewport
      entry.target.classList.remove('active');
    } 
  });
}, observerOptions);

// Observer chaque colonne
revealCols.forEach(col => {
  col.classList.add('reveal'); // ajouter la classe reveal si pas déjà
  observer.observe(col);
});



// Tableau de textes et images



const items = [
  { texte: "Pain : Accueil là en toi sans réserve pour apprendre à miex te connaitre" , image: "../Image/Pain (2).jpg" },
  { texte: "Madara : Tant qu'il existera des vainqueurs, il existera des vaincus.", image: "../Image/Madaraa (2).jpg" },
  { texte: "Jiraiya : Un ninja doit toujours garder espoir, même dans l'adversité.", image: "../Image/Jiraya (2).jpg" },
  { texte: "Itachi : La vraie force est de protéger ceux qu'on aime.", image: "../Image/Itachi.jpg" },
  { texte: "Minato : Même le plus faible peut changer le monde avec un peu de courage.", image: "../Image/Minato (4).jpg" },
  { texte: "Gaara : La solitude forge le cœur de celui qui veut survivre.", image: "../Image/Gaara (2).jpg" },
  { texte: "Naruto : Je ne reviendrai jamais sur ma promesse. C'est ça mon nindo !", image: "../Image/Naruto RIkudo.jpg" },
  { texte: "Sasuke : Mieux vaut vivre dans l'ignorance que dans la peur.", image: "../Image/Sassuke (2).jpg" },
  { texte: "Kakashi : Ceux qui abandonnent leurs amis sont indignes de devenir ninja.", image: "../Image/Kakashi.jpg" },
  { texte: "Pain : Celui qui n'a pas connu la vraie souffrance ne peut désirer la paix véritable.", image: "../Image/Pain (2).jpg" },
  { texte: "Sasuke : Ma voie est celle de la vengeance.", image: "../Image/Sassuke (5).jpg" },
  { texte: "Hinata : Je veux devenir forte pour protéger ceux que j'aime.", image: "../Image/Hinata (2).jpg" }
  
];

const bandeau = document.querySelector(".bandeau-anime");


// Créer tous les éléments et les ajouter au bandeau
items.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("bandeau-item");
  div.innerHTML = `<img src="${item.image}" alt="img"><span>${item.texte}</span>`;
  bandeau.appendChild(div);
});

let posX = bandeau.offsetWidth;

// Fonction de défilement
function animate() {
  posX -= 2; // vitesse en px
  bandeau.style.transform = `translateX(${posX}px)`;

  const firstItem = bandeau.querySelector(".bandeau-item");

  // Quand le premier item est complètement sorti à gauche
  if (firstItem.getBoundingClientRect().right < 0) {
    bandeau.appendChild(firstItem); // le mettre à la fin
    posX += firstItem.offsetWidth + 50; // ajouter sa largeur + marge
  }

  requestAnimationFrame(animate);
}

animate();


const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show');
});






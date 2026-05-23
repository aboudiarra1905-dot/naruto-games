<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation d'inscription</title>
    <!-- Lien vers Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Perso -->
   <link rel="stylesheet" href="../bootstrap/css/theme.css">

     <style>
        body {
              background: url(../Image/Obito\ \(9\).jpg) no-repeat center center; 
              background-size: cover;   /* L'image couvre tout l'écran */
              background-attachment: fixed; /* Le fond reste fixe (style pro) */
              min-height: 100vh; /* Toujours au moins la hauteur d’un écran */
        }
        .confirmation-card {
            max-width: 500px;
            margin: 100px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            background-color: orange;
            text-align: center;
        }
        .btn{
          background-color:orangered;
        }
        
        .btn:hover {
            background-color: orange; /* orange plus foncé au survol */
            color: white;
        }
        
    </style>
</head>
<body>
<?php
// --- Paramètres de connexion à la base ---
$host = 'localhost';
$db   = 'quiz_naruto';
$user = 'root'; // à adapter selon ton MySQL
$pass = '';     // mot de passe MySQL
$charset = 'utf8mb4';

// --- DSN et options PDO ---
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Connexion échouée : " . $e->getMessage());
}

// --- Vérification que le formulaire a été soumis ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
    $prenom = htmlspecialchars(trim($_POST['prenom'] ?? ''));
    $village = htmlspecialchars(trim($_POST['village'] ?? ''));
    $personnage = htmlspecialchars(trim($_POST['personnage'] ?? ''));
    $pouvoir = htmlspecialchars(trim($_POST['pouvoir'] ?? ''));
    $pseudo = htmlspecialchars(trim($_POST['pseudo'] ?? ''));
    $commentaire = htmlspecialchars(trim($_POST['commentaire'] ?? ''));

    // --- Préparation et exécution de la requête ---
    $sql = "INSERT INTO shinobi (nom, prenom, village, personnage, pouvoir, pseudo, commentaire)
            VALUES (:nom, :prenom, :village, :personnage, :pouvoir, :pseudo, :commentaire)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':village' => $village,
            ':personnage' => $personnage,
            ':pouvoir' => $pouvoir,
            ':pseudo' => $pseudo,
            ':commentaire' => $commentaire
        ]);

        // --- Redirection vers la page de confirmation ---
       echo "<div class='confirmation-card'>
       <div class='alert alert-warning text-center'>
              <h4>🎉 Identification réussie !</h4>
              <p> <strong> $prenom $nom </strong> alias<strong> $pseudo </strong>, tu es officiellement un shinobi du village de <strong>$village</strong>.</p>
              <a href='../Page/Transport.html' class='btn outline-warning mt-3'> <strong> Le quiz t'attend $pseudo <strong> </a>
              
            </div>";


    } catch (Exception $e) {
        // Optionnel : tu peux créer une page erreur.php au lieu d'afficher le message directement
        echo "Erreur lors de l'inscription : " . $e->getMessage();
    }
} else {
    echo "Accès direct interdit.";
}
?>
   

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

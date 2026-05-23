<?php
// --- Connexion à la base ---
$host = 'localhost';
$db   = 'quiz_naruto';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

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

// --- Récupération des inscriptions ---
$stmt = $pdo->query("SELECT * FROM shinobi ORDER BY id DESC");
$inscriptions = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - Inscriptions</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <!-- Fichier Boostrap -->
  <link rel="stylesheet" href="../bootstrap/css/theme.css">

    <style>
        body { background-color: #fff4e6; padding: 30px; font-family: Arial, sans-serif; }
        .table-container { max-width: 1200px; margin: auto; }
        h1 { color: #ff7f50; text-align: center; margin-bottom: 40px; }
        .message { text-align: center; margin-bottom: 20px; color: green; font-weight: bold; display: none; }
        .btn-delete { background-color: #ff7f50; color: white; }
        .btn-delete:hover { background-color: #ff6633; color: white; }
        .btn-back { background-color: #ffa64d; color: white; margin-bottom: 20px; }
        .btn-back:hover { background-color: #ff8c1a; color: white; }
    </style>
</head>
<body>

<div class="table-container">
    <h1>Liste des inscriptions</h1>

    <a href="../Page/Accueil.html" class="btn btn-back">Retour à l'accueil</a>
      <a href="logout.php" class="btn btn-danger float-end mb-3">Se déconnecter</a>

    <div id="message" class="message"></div>

    <table class="table table-bordered table-striped" id="inscriptionsTable">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Village</th>
                <th>Personnage</th>
                <th>Pouvoir</th>
                <th>Pseudo</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($inscriptions as $inscription): ?>
            <tr id="row-<?= $inscription['id'] ?>">
                <td><?= $inscription['id'] ?></td>
                <td><?= htmlspecialchars($inscription['nom']) ?></td>
                <td><?= htmlspecialchars($inscription['prenom']) ?></td>
                <td><?= htmlspecialchars($inscription['village']) ?></td>
                <td><?= htmlspecialchars($inscription['personnage']) ?></td>
                <td><?= htmlspecialchars($inscription['pouvoir']) ?></td>
                <td><?= htmlspecialchars($inscription['pseudo']) ?></td>
                <td>
                    <button class="btn btn-delete btn-sm" onclick="supprimer(<?= $inscription['id'] ?>)">
                        Supprimer
                    </button>
                </td>
            </tr>
            <?php endforeach; ?>
            <?php if(empty($inscriptions)) echo '<tr><td colspan="9" class="text-center">Aucune inscription</td></tr>'; ?>
        </tbody>
    </table>
</div>

<script>
function supprimer(id) {
    if(confirm('Voulez-vous vraiment supprimer cette inscription ?')) {
        fetch('supprimer_ajax.php?id=' + id)
        .then(response => response.text())
        .then(data => {
            // Supprimer la ligne du tableau
            const row = document.getElementById('row-' + id);
            if(row) row.remove();

            // Afficher le message de succès
            const msg = document.getElementById('message');
            msg.textContent = data;
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 3000);
        });
    }
}
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
                    
                    
                    
                    

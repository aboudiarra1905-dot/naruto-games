                 
<?php
$host = 'localhost';
$db   = 'quiz_naruto';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

if(isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM shinobi WHERE id = :id");
    $stmt->execute([':id' => $id]);
    echo "Inscription supprimée avec succès !";
} else {
    echo "Erreur : ID manquant.";
}
?>
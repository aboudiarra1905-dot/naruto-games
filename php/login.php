<?php
session_start();

$host = "localhost";
$user = "root";
$password = "";
$dbname = "quiz_naruto";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Crée un compte admin si aucun n'existe
$conn->query("CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
)");

$checkAdmin = $conn->query("SELECT * FROM admin");
if ($checkAdmin->num_rows === 0) {
    $hashedPassword = password_hash("stof4", PASSWORD_DEFAULT);
    $conn->query("INSERT INTO admin (username, password) VALUES ('stof', '$hashedPassword')");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        $user = $res->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['stof'] = $username;
            header("Location: admis.php");
            exit();
        } else {
            $error = "Mot de passe incorrect.";
        }
    } else {
        $error = "Nom d'utilisateur incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Perso -->
   <link rel="stylesheet" href="../bootstrap/css/theme.css">
<style>
    
</style>
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="text-center mb-4">Connexion Administrateur</h2>
    <?php if (isset($error)): ?>
        <div class="alert alert-danger text-center"><?= $error ?></div>
    <?php endif; ?>
    <form method="POST" class="mx-auto" style="max-width: 400px;">
        <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input type="text" class="form-control" name="username" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" name="password" required>
        </div>
        <button type="submit" class="btn btn-outline-warning w-100">Se connecter</button>
        
        <a href="../Page/Accueil.html" class="btn btn-outline-warning my-5 ">Retour à l'accueil</a>
    </form>
    
</div>


</body>
</html>
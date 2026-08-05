<?php
require 'config.php';

$id = $_GET['id'] ?? 0;

try {
    $stmt = $pdo->prepare("SELECT * FROM propuestas WHERE id = ?");
    $stmt->execute([$id]);
    $propuesta = $stmt->fetch();

    if (!$propuesta) {
        echo json_encode(['success' => false, 'message' => 'No encontrado']);
        exit;
    }
    echo json_encode(['success' => true, 'data' => $propuesta]);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
<?php
require 'config.php';

try {
    $stmt = $pdo->query("
        SELECT id, postor_nombre, ruc_postor, representante_legal, 
               presupuesto_total, monto_letras, fecha_registro 
        FROM propuestas 
        ORDER BY fecha_registro DESC
    ");
    $propuestas = $stmt->fetchAll();
    echo json_encode(['success' => true, 'data' => $propuestas]);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
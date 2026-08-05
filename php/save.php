<?php
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO propuestas (
            nomenclatura_proceso, codigo_cui, nombre_proyecto, comite_seleccion,
            entidad_publica, direccion_entidad, postor_nombre, ruc_postor,
            representante_legal, dni_representante, email_postor, lugar_fecha,
            costo_directo, gastos_generales, utilidad, subtotal, igv,
            presupuesto_base, costo_expediente, costo_sup_ejecucion,
            costo_sup_expediente, costo_exp_mantenimiento, costo_act_mantenimiento,
            costo_manual_operacion, costo_act_operacion, presupuesto_total, monto_letras
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['proceso'], $data['cui'], $data['proyecto'], $data['comite'],
        $data['entidad'], $data['direccion'], $data['postor'], $data['ruc'],
        $data['representante'], $data['dni_rep'], $data['email'], $data['fecha'],
        $data['costo_directo'], $data['gastos_generales'], $data['utilidad'],
        $data['subtotal'], $data['igv'], $data['presupuesto_base'],
        $data['costo_expediente'], $data['costo_sup_ejecucion'],
        $data['costo_sup_expediente'], $data['costo_exp_mantenimiento'],
        $data['costo_act_mantenimiento'], $data['costo_manual_operacion'],
        $data['costo_act_operacion'], $data['presupuesto_total'], $data['monto_letras']
    ]);

    $propuestaId = $pdo->lastInsertId();
    $pdo->commit();

    echo json_encode(['success' => true, 'id' => $propuestaId, 'message' => 'Propuesta guardada exitosamente']);

} catch (\PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
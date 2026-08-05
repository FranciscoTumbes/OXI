-- ============================================================
-- UNT - Sistema de Gestión de Propuestas
-- Ley N° 29230 - Obras por Impuestos
-- ============================================================

CREATE DATABASE IF NOT EXISTS propuestas_unt 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE propuestas_unt;

-- Tabla maestra de propuestas
CREATE TABLE propuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Datos del Proceso
    nomenclatura_proceso VARCHAR(100) DEFAULT 'PROCESO DE SELECCIÓN N.° 01-2026-CE-OXI-UNT',
    codigo_cui VARCHAR(10) DEFAULT '2710525',
    nombre_proyecto TEXT,
    comite_seleccion VARCHAR(255) DEFAULT 'COMITÉ ESPECIAL – Ley N° 29230',
    entidad_publica VARCHAR(255) DEFAULT 'UNIVERSIDAD NACIONAL DE TUMBES',
    direccion_entidad TEXT,
    
    -- Datos del Postor
    postor_nombre VARCHAR(255),
    ruc_postor VARCHAR(11),
    representante_legal VARCHAR(255),
    dni_representante VARCHAR(20),
    email_postor VARCHAR(100),
    lugar_fecha VARCHAR(100),
    
    -- Datos Económicos (Anexo 4-E)
    costo_directo DECIMAL(15,2) DEFAULT 0,
    gastos_generales DECIMAL(15,2) DEFAULT 0,
    utilidad DECIMAL(15,2) DEFAULT 0,
    subtotal DECIMAL(15,2) DEFAULT 0,
    igv DECIMAL(15,2) DEFAULT 0,
    presupuesto_base DECIMAL(15,2) DEFAULT 0,
    costo_expediente DECIMAL(15,2) DEFAULT 0,
    costo_sup_ejecucion DECIMAL(15,2) DEFAULT 0,
    costo_sup_expediente DECIMAL(15,2) DEFAULT 0,
    costo_exp_mantenimiento DECIMAL(15,2) DEFAULT 0,
    costo_act_mantenimiento DECIMAL(15,2) DEFAULT 0,
    costo_manual_operacion DECIMAL(15,2) DEFAULT 0,
    costo_act_operacion DECIMAL(15,2) DEFAULT 0,
    presupuesto_total DECIMAL(15,2) DEFAULT 0,
    monto_letras TEXT,
    
    -- Metadatos
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_ruc (ruc_postor),
    INDEX idx_proceso (nomenclatura_proceso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de personal profesional (Anexo 4-L / 4-M)
CREATE TABLE personal_profesional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propuesta_id INT NOT NULL,
    nombres_apellidos VARCHAR(255),
    dni VARCHAR(8),
    cargo_especialidad VARCHAR(100),
    experiencia_general VARCHAR(50),
    experiencia_especifica VARCHAR(50),
    folio_propuesta VARCHAR(10),
    FOREIGN KEY (propuesta_id) REFERENCES propuestas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de consorciados (Anexo 4-K)
CREATE TABLE consorciados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propuesta_id INT NOT NULL,
    nombre_consorciado VARCHAR(255),
    porcentaje_participacion DECIMAL(5,2),
    obligaciones TEXT,
    FOREIGN KEY (propuesta_id) REFERENCES propuestas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de empresas ejecutoras (Anexo 4-H)
CREATE TABLE empresas_ejecutoras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propuesta_id INT NOT NULL,
    nombre_ejecutora VARCHAR(255),
    ruc_ejecutora VARCHAR(11),
    representante_ejecutora VARCHAR(255),
    dni_representante_ej VARCHAR(20),
    periodo_vicios INT DEFAULT 7,
    FOREIGN KEY (propuesta_id) REFERENCES propuestas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
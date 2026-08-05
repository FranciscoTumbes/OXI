# 🎓 UNT - Sistema de Gestión de Propuestas

Aplicativo web para la elaboración, gestión e impresión de anexos del Proceso de Selección de la **Universidad Nacional de Tumbes (UNT)** bajo la **Ley N° 29230 - Obras por Impuestos**.

## 📋 Anexos Implementados

| Anexo | Descripción |
|-------|-------------|
| 4-A | Carta de Expresión de Interés |
| 4-B | Contenido de los Sobres (Credenciales, Económica, Técnica + Rotulados) |
| 4-C | Carta de Acreditación de Apoderado |
| 4-D | Carta de Presentación de Información Financiera y Técnica |
| 4-E | Propuesta Económica (cálculo automático de IGV 18%, GG 10%, Utilidad 5%) |
| 4-G | Declaración Jurada del Postor (14 declaraciones) |
| 4-H | Compromiso de Contratación de la Empresa Ejecutora |
| 4-K | Declaración Jurada de Promesa Formal de Consorcio |
| 4-L | Declaración Jurada del Personal Profesional |
| 4-M | Carta de Compromiso del Personal Profesional |

## 🏗️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP 8+ (API REST)
- **Base de Datos**: MySQL / MariaDB
- **Servidor**: Apache (XAMPP)

## ⚡ Características

- ✅ Sincronización en tiempo real de datos maestros en todos los anexos
- ✅ Cálculo automático de presupuesto con IGV 18%, GG 10%, Utilidad 5%
- ✅ Conversión automática de montos numéricos a letras
- ✅ Diseño fiel a los formatos institucionales oficiales (tipografía Times New Roman, márgenes A4)
- ✅ Impresión optimizada para documentos oficiales (A4, page-break)
- ✅ Persistencia en base de datos MySQL mediante API REST en PHP
- ✅ Exportación a JSON
- ✅ Dashboard con resumen de propuestas registradas

## 🚀 Instalación en XAMPP

1. **Clonar o copiar** el repositorio en `C:\xampp\htdocs\propuestas-unt\`
2. **Iniciar Apache y MySQL** desde el Panel de Control de XAMPP
3. **Crear la base de datos**:
   - Ir a `http://localhost/phpmyadmin`
   - Crear base de datos `propuestas_unt`
   - Importar el archivo `sql/database.sql`
4. **Acceder al aplicativo**: `http://localhost/propuestas-unt/`

## 📁 Estructura de Archivos

```
propuestas-unt/
├── index.html              # Frontend SPA con todos los anexos
├── css/
│   └── styles.css          # Estilos institucionales + responsive + print
├── js/
│   └── app.js              # Motor de sincronización, cálculos y persistencia
├── php/
│   ├── config.php          # Conexión PDO a MySQL
│   ├── save.php            # Guardar propuesta
│   ├── load.php            # Listar propuestas
│   └── get.php             # Obtener una propuesta
├── sql/
│   └── database.sql        # Esquema completo MySQL
└── README.md               # Documentación
```

## 🖨️ Uso

1. Completa los **Datos Maestros** en el panel lateral izquierdo
2. Navega entre los anexos usando el menú lateral
3. Ingresa los montos en el **Anexo 4-E** para cálculo automático
4. Guarda la propuesta en la base de datos con el botón "Guardar en BD"
5. Imprime o exporta a PDF con el botón "Imprimir / PDF"

## 📄 Licencia

Proyecto académico - Universidad Nacional de Tumbes

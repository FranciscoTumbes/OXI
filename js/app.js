// ==========================================
// UNT - Sistema de Propuestas
// Motor de sincronización y cálculos
// ==========================================

const API_URL = 'php/';

// Campos maestros que se sincronizan
const fields = [
    'proceso', 'cui', 'proyecto', 'comite', 'entidad', 
    'direccion', 'fecha', 'postor', 'ruc', 'representante', 
    'dni_rep', 'email'
];

// Inicializar sincronización
fields.forEach(f => {
    const input = document.getElementById(`m_${f}`);
    if (!input) return;
    
    const sync = () => {
        const val = input.value;
        document.querySelectorAll(`.out_${f}`).forEach(t => {
            t.innerText = val || '........';
        });
    };
    
    input.addEventListener('input', sync);
    sync(); // Trigger inicial
});

// Navegación entre anexos
function mostrarAnexo(id) {
    document.querySelectorAll('.anexo-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById(`anexo-${id}`);
    if (target) target.classList.add('active');
    
    if (event && event.target) event.target.classList.add('active');
}

// ==========================================
// CÁLCULO ECONÓMICO (Anexo 4-E)
// ==========================================
function calcularEconomico() {
    const getVal = id => parseFloat(document.getElementById(id)?.value) || 0;
    
    const directo = getVal('v_directo');
    const gg = directo * 0.10;
    const util = directo * 0.05;
    const sub = directo + gg + util;
    const igv = sub * 0.18;
    const base = sub + igv;
    
    const extras = [
        'v_expediente', 'v_sup_ejec', 'v_sup_exp',
        'v_exp_mant', 'v_act_mant', 'v_man_op', 'v_act_op'
    ].map(getVal);
    
    const totalExtras = extras.reduce((a, b) => a + b, 0);
    const total = base + totalExtras;
    
    // Actualizar UI
    document.getElementById('r_gg').innerText = gg.toFixed(2);
    document.getElementById('r_util').innerText = util.toFixed(2);
    document.getElementById('r_sub').innerText = sub.toFixed(2);
    document.getElementById('r_igv').innerText = igv.toFixed(2);
    document.getElementById('r_base').innerText = base.toFixed(2);
    document.getElementById('r_total').innerText = total.toFixed(2);
    
    // Números a letras
    document.getElementById('out_letras').innerText = 
        'SON: ' + numeroALetras(total) + ' SOLES';
}

// Conversión de números a letras (simplificado)
function numeroALetras(numero) {
    const unidades = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
    const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    
    const entero = Math.floor(numero);
    const decimal = Math.round((numero - entero) * 100);
    
    if (entero === 0) return 'CERO Y ' + (decimal < 10 ? '0' : '') + decimal + '/100';
    
    let texto = '';
    const millones = Math.floor(entero / 1000000);
    const miles = Math.floor((entero % 1000000) / 1000);
    const cientos = entero % 1000;
    
    if (millones > 0) texto += millones === 1 ? 'UN MILLÓN ' : millones + ' MILLONES ';
    if (miles > 0) texto += miles === 1 ? 'MIL ' : miles + ' MIL ';
    if (cientos > 0) {
        if (cientos === 100) texto += 'CIEN ';
        else {
            texto += centenas[Math.floor(cientos / 100)] + ' ';
            const resto = cientos % 100;
            if (resto > 0) {
                if (resto < 10) texto += unidades[resto];
                else if (resto < 20) texto += ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE'][resto - 10] || decenas[1];
                else {
                    texto += decenas[Math.floor(resto / 10)];
                    if (resto % 10 > 0) texto += ' Y ' + unidades[resto % 10];
                }
            }
        }
    }
    
    return texto.trim() + ' Y ' + (decimal < 10 ? '0' : '') + decimal + '/100';
}

// ==========================================
// PERSISTENCIA EN BASE DE DATOS
// ==========================================
async function guardarPropuesta() {
    const get = id => document.getElementById(`m_${id}`)?.value || '';
    const getNum = id => parseFloat(document.getElementById(id)?.value) || 0;
    
    const payload = {
        proceso: get('proceso'),
        cui: get('cui'),
        proyecto: get('proyecto'),
        comite: get('comite'),
        entidad: get('entidad'),
        direccion: get('direccion'),
        fecha: get('fecha'),
        postor: get('postor'),
        ruc: get('ruc'),
        representante: get('representante'),
        dni_rep: get('dni_rep'),
        email: get('email'),
        
        // Económicos
        costo_directo: getNum('v_directo'),
        gastos_generales: parseFloat(document.getElementById('r_gg')?.innerText) || 0,
        utilidad: parseFloat(document.getElementById('r_util')?.innerText) || 0,
        subtotal: parseFloat(document.getElementById('r_sub')?.innerText) || 0,
        igv: parseFloat(document.getElementById('r_igv')?.innerText) || 0,
        presupuesto_base: parseFloat(document.getElementById('r_base')?.innerText) || 0,
        costo_expediente: getNum('v_expediente'),
        costo_sup_ejecucion: getNum('v_sup_ejec'),
        costo_sup_expediente: getNum('v_sup_exp'),
        costo_exp_mantenimiento: getNum('v_exp_mant'),
        costo_act_mantenimiento: getNum('v_act_mant'),
        costo_manual_operacion: getNum('v_man_op'),
        costo_act_operacion: getNum('v_act_op'),
        presupuesto_total: parseFloat(document.getElementById('r_total')?.innerText) || 0,
        monto_letras: document.getElementById('out_letras')?.innerText || '',
        
        // Arrays vacíos por ahora (se pueden extender)
        personal: [],
        consorciados: []
    };
    
    try {
        const response = await fetch(API_URL + 'save.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Propuesta guardada exitosamente. ID: ' + result.id);
        } else {
            alert('❌ Error: ' + result.message);
        }
    } catch (err) {
        alert('❌ Error de conexión: ' + err.message);
    }
}

// ==========================================
// EXPORTAR JSON LOCAL
// ==========================================
function exportarJSON() {
    const data = {};
    fields.forEach(f => {
        data[f] = document.getElementById(`m_${f}`)?.value || '';
    });
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `propuesta_unt_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    mostrarAnexo('dash');
});
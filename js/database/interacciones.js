// ============================================================================
// interacciones.js - Sistema de interacciones sociales, afectivas y picantes
// ============================================================================

// ==========================================
// 1. DICCIONARIO SOCIAL Y AFECTIVO
// ==========================================
export const COMANDOS_SOCIALES = [
    // Conversación y Vínculo
    "hablar", "conversar", "charlar", "escuchar", "preguntar", "debates", "susurrar", "secretos",
    "contar_chiste", "aconsejar", "desahogarse", "cantar_juntos", "filosofar", "contar_historia",
    // AFECTO Y CONTACTO FÍSICO SUAVE
    "abrazar", "acurrucar", "acariciar", "acariciar_cabello", "cabello", "tomar_mano", "mano",
    "hacer_cosquillas", "cosquillas", "contentar", "consolar", "palmada_espalda", "frotar_hombros",
    "recostar_cabeza", "rascar_espalda", "dormir_juntos", "frotar_nariz", "chocar_manos",
    // ROMANCE Y DETALLES
    "besar", "coquetear", "seducir", "halagar", "elogiar", "poesia", "poema", "carta_amor",
    "carta", "dar_carta", "dar_regalo", "romantico", "bailar", "jugar", "juguetear", "guiñar",
    "sonreir", "mirar_fijamente", "dar_flores", "preparar_desayuno", "pasear_de_la_mano",
    // MORDISCOS Y JUEGO
    "morder_suave", "morder_fuerte", "pellizcar_cachete", "despeinar", "soplar_oreja",
    "morder_oreja", "lamer_mejilla", "dar_palmadita",
    // BIENESTAR Y CUIDADO
    "masaje", "masajear", "dar_masaje", "curar_herida", "preparar_cafe", "traer_comida",
    "cepillar_cabello", "bañar_juntos", "llevar_a_cita", "cita"
];

// ==========================================
// 2. DICCIONARIO PICANTE, KAMASUTRA Y FETICHES
// ==========================================
export const INTERACCIONES_PICANTES = [
    // PREVIAS, ESTIMULACIÓN Y JUEGOS DULCES/SENSORIALES
    "striptease", "baile_privado", "beso_apasionado", "morder_labio", "chupar_cuello", 
    "chupoton", "gemir_al_oido", "masaje_sensual", "acariciar_muslo", "desvestir",
    "bañar_de_miel", "lamer_chocolate", "vendar_ojos", "hielo_en_piel", "susurrar_cochinadas",
    "besar_abdomen", "lamer_ombligo", "morder_cadera", "jugar_con_aceite",

    // ACCIONES DE DAR Y RECIBIR (ORAL Y MANUAL)
    "dar_oral", "recibir_oral", "dar_felacion", "recibir_felacion", 
    "dar_cunnilingus", "recibir_cunnilingus", "dar_anilingus", "recibir_anilingus",
    "dar_handjob", "recibir_handjob", "dar_footjob", "recibir_footjob",
    "dar_titjob", "recibir_titjob", "masturbar", "dedear", "bombear_pechos", 
    "ordeñar", "69", "lamer_cuerpo", "chupar_dedos", "chupar_pezones",

    // POSICIONES DEL KAMASUTRA Y PENETRACIÓN
    "sexo", "penetrar", "posicion_misionero", "posicion_perrito", "posicion_cowgirl",
    "posicion_reverse_cowgirl", "posicion_69", "posicion_el_trampolin", "posicion_la_flor_de_loto",
    "posicion_el_puente", "posicion_en_punta_de_pie", "posicion_de_pie_contra_la_pared",
    "posicion_la_tijera", "posicion_el_candado", "anal", "doble_penetracion", 

    // FINALIZACIONES
    "faciales", "creampie", "cum_inside", "cum_on_chest", "cum_in_mouth", "tragar",

    // FETICHES, BDSM Y DOMINACIÓN
    "nalgear", "azotar", "atar_manos", "asfixia_erotica", "spanking", "usar_spit",
    "fetiche_pies", "fetiche_cuero", "fetiche_lenceria", "fetiche_latex", 
    "ser_dominado", "dominar", "humillacion_verbal", "fetiche_uniforme", "morder_duro"
];

// ==========================================
// 3. BASE DE DATOS DE 3 ESPECIALES POR NPC
// ==========================================
export const ESPECIALES_POR_PERSONAJE = {
    // DC
    batman: {
        "entrenar_en_la_baticueva": "Bruce te lleva a la Baticueva a entrenar combate cuerpo a cuerpo.",
        "patrullar_gotham": "Subís al Batimóvil para patrullar las calles oscuras de Gotham.",
        "hackear_baticomputadora": "Bruce te deja ver los archivos confidenciales en la Baticomputadora."
    },
    dick_grayson: {
        "acrobacias_circo": "Dick te muestra sus acrobacias de su época en el circo.",
        "noche_estrellada": "Acostados en la azotea mirando estrellas.",
        "baile_salsa": "Te enseña a bailar salsa en la Torre de los Titanes."
    },
    
    // Hazbin/Helluva
    blitzo: {
        "disparar_armas_imp": "Blitzo te presta su pistola favorita para dispararle a latas en la oficina.",
        "ir_al_mundo_humano": "Usás el libro de Stolas con Blitzo para hacer una escapada al mundo humano.",
        "criticar_a_verosika": "Se sientan a tomar licor barato mientras insultan a sus ex."
    },
    stolas: {
        "observar_astronomia": "Stolas te enseña las constelaciones desde su torre.",
        "leer_grimorios": "Lee para ti antiguos grimorios en voz baja.",
        "viaje_astral": "Te lleva en un viaje astral por el cosmos."
    },
    moxxie: {
        "practicar_tiro": "Moxxie te enseña puntería en el campo de tiro.",
        "opera_noche": "Te lleva a la ópera (su lugar favorito).",
        "cocinar_juntos": "Intentan cocinar juntos (él se estresa, es adorable)."
    },
    
    // Sonic
    sonic: {
        "carrera_a_toda_velocidad": "Sonic te agarra de la mano y corren a la velocidad del sonido por Green Hill.",
        "comercial_chili_dogs": "Van juntos a comer unos buenos Chili Dogs picantes.",
        "usar_esmeralda_chaos": "Sonic te muestra el brillo de una Esmeralda del Caos de cerca."
    },
    shadow: {
        "mirar_estrellas": "Shadow raramente se abre mientras miran las estrellas.",
        "carrera_competitiva": "Una carrera donde Shadow no se guarda nada.",
        "compartir_pasado": "Te cuenta fragmentos de su historia con Maria."
    },
    
    // Dragon Ball
    goku: {
        "entrenar_gravedad": "Entrenan juntos en la cámara de gravedad aumentada.",
        "comer_banquete": "Goku te invita a un banquete que dura horas.",
        "volar_nubes": "Vuelan juntos en la Nube Voladora."
    },
    vegeta: {
        "entrenar_gravedad_extrema": "Vegeta te lleva al límite en la cámara de gravedad.",
        "charla_orgullo": "Una charla inesperada sobre orgullo saiyajin.",
        "cena_familiar": "Cena con Bulma y Trunks (Vegeta está incómodo)."
    },
    
    // Naruto
    naruto_uzumaki: {
        "ramen_competencia": "Competencia de quién come más ramen en Ichiraku.",
        "entrenar_rasengan": "Intenta enseñarte el Rasengan (casi destruyen todo).",
        "pasear_konoha": "Un paseo nocturno por Konoha hablando de sueños."
    },
    sasuke_uchiha: {
        "entrenar_shuriken": "Práctica de lanzamiento de shuriken al anochecer.",
        "charla_uchiha": "Sasuke habla raramente de su clan contigo.",
        "caminar_lluvia": "Caminan bajo la lluvia (él no se queja)."
    },
    
    // Marvel
    spiderman: {
        "balancearse_ciudad": "Te lleva balanceándose por Manhattan.",
        "fotografiar": "Peter te enseña fotografía desde edificios altos.",
        "tacos_calle": "Comen tacos callejeros en la azotea."
    },
    
    // Agrega más según necesites...
};

// Respuestas dinámicas según afecto
export const RESPUESTAS_DINAMICAS = {
    abrazar: {
        low: ["Te deja abrazarle pero permanece rígido.", "Acepta el abrazo con cierta incomodidad.", "Te aparta suavemente después de unos segundos."],
        medium: ["Te devuelve el abrazo con calidez.", "Sonríe mientras te abraza.", "Descansa su cabeza en tu hombro un momento."],
        high: ["Te abraza fuerte y no quiere soltarte.", "Te acaricia la espalda durante el abrazo.", "Susurra algo dulce mientras te abraza."]
    },
    besar: {
        low: ["Se aparta incómodo.", "Te da un beso en la mejilla solo.", "Te detiene antes de que llegues."],
        medium: ["Te da un beso suave y tierno.", "El beso dura unos segundos agradables.", "Se sonroja después de besaros."],
        high: ["Te besa apasionadamente.", "El beso se prolonga con intensidad.", "Te muerde el labio juguetonamente."]
    }
};

// ==========================================
// 4. MOTOR DE PROCESAMIENTO DE ACCIONES
// ==========================================
export async function procesarAccionSocial(targetName, accion, gameState, npcsDB, simsEngine, ui) {
    if (!targetName) {
        ui.printLog(`¿A quién querés aplicarle la acción? Ejemplo: <code>${accion} batman</code>`, 'warning');
        return;
    }

    const foundKey = findNPCInRoom(targetName, gameState.currentRoom, npcsDB);
    if (!foundKey) {
        ui.printLog(`No ves a "<strong>${targetName}</strong>" en esta sección.`, 'warning');
        return;
    }

    const npc = npcsDB[foundKey];
    let puntosGanados = 5;
    let esEspecial = false;
    let descripcionEspecial = "";

    // Verificación de las 3 Interacciones Especiales exclusivas del personaje
    if (ESPECIALES_POR_PERSONAJE[foundKey] && ESPECIALES_POR_PERSONAJE[foundKey][accion]) {
        esEspecial = true;
        descripcionEspecial = ESPECIALES_POR_PERSONAJE[foundKey][accion];
        puntosGanados = 25;
    } else if (INTERACCIONES_PICANTES.includes(accion)) {
        puntosGanados = 12;
        if (npc.affinity < 40) {
            ui.printLog(`${npc.name} no está lo suficientemente cómodo contigo para eso...`, 'warning');
            return;
        }
    }

    // Actualizar afecto
    simsEngine.updateAffection(foundKey, puntosGanados);
    
    // Generar respuesta
    let lineaDialogo = generarRespuesta(accion, npc, esEspecial, descripcionEspecial);
    
    // Renderizar
    ui.mostrarInteraccion(npc, accion, lineaDialogo, puntosGanados, esEspecial);
    
    return { success: true, points: puntosGanados, especial: esEspecial };
}

function findNPCInRoom(targetName, currentRoom, npcsDB) {
    const normalized = targetName.toLowerCase().trim();
    return Object.keys(npcsDB).find(key => {
        const npc = npcsDB[key];
        return npc.room === currentRoom && 
               (npc.id === normalized || npc.name.toLowerCase().includes(normalized));
    });
}

function generarRespuesta(accion, npc, esEspecial, descripcionEspecial) {
    if (esEspecial) {
        return `"${descripcionEspecial}"`;
    }
    
    // Buscar en respuestas dinámicas
    if (RESPUESTAS_DINAMICAS[accion]) {
        const nivel = npc.affinity >= 65 ? 'high' : npc.affinity >= 40 ? 'medium' : 'low';
        const opciones = RESPUESTAS_DINAMICAS[accion][nivel];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }
    
    // Respuesta genérica
    return `${npc.name} reacciona a tu acción "${accion.replace(/_/g, ' ')}".`;
}

export function getInteraccionesDisponibles() {
    return {
        sociales: COMANDOS_SOCIALES,
        picantes: INTERACCIONES_PICANTES,
        especiales: Object.keys(ESPECIALES_POR_PERSONAJE).reduce((acc, char) => {
            acc[char] = Object.keys(ESPECIALES_POR_PERSONAJE[char]);
            return acc;
        }, {})
    };
}
// ============================================================================
// citas.js - Lugares románticos para citas
// ============================================================================

export const citasDB = {
    "mirador_estrellas": {
        name: "Mirador de Estrellas",
        desc: "Un balcón flotante en el espacio donde el multiverso brilla en todo su esplendor.",
        romance_bonus: 15,
        ambience: "Música suave y estrellas fugaces",
        outfit_suggestion: "Elegante casual",
        best_for: ["confesiones", "primeros besos"]
    },
    "restaurante_lujoso": {
        name: "Restaurante Estrella Michelin",
        desc: "Cocina de autor en un ambiente íntimo y sofisticado.",
        romance_bonus: 10,
        ambience: "Velas, jazz y copas tintineando",
        outfit_suggestion: "Formal",
        best_for: ["cenas romanticas", "propuestas"]
    },
    "playa_tropical": {
        name: "Playa Paradisíaca",
        desc: "Arena blanca, aguas cristalinas y palmeras meciéndose.",
        romance_bonus: 12,
        ambience: "Olas y ukulele",
        outfit_suggestion: "Playero",
        best_for: ["paseos", "atardeceres"]
    },
    "bosque_encantado": {
        name: "Bosque Encantado",
        desc: "Árboles luminosos y criaturas mágicas que observan en silencio.",
        romance_bonus: 18,
        ambience: "Criaturas mágicas y hojas susurrantes",
        outfit_suggestion: "Aventurero",
        best_for: ["secretos", "abrazos"]
    },
    "cafe_gourmet": {
        name: "Café Literario",
        desc: "Libros, café aromático y sillones cómodos para largas conversaciones.",
        romance_bonus: 8,
        ambience: "Tazas tintineando y páginas volteando",
        outfit_suggestion: "Intelectual",
        best_for: ["conversaciones profundas"]
    },
    "bar_subterraneo": {
        name: "Bar de Jazz Subterráneo",
        desc: "Luces tenues, whisky añejo y música que habla al alma.",
        romance_bonus: 14,
        ambience: "Saxofón y risas amortiguadas",
        outfit_suggestion: "Misterioso",
        best_for: ["confidencias", "coqueteo"]
    },
    "pista_patinaje": {
        name: "Pista de Patinaje",
        desc: "Luces de neón, música pop y la excusa perfecta para tomarse de la mano.",
        romance_bonus: 10,
        ambience: "Música pop y ruedas sobre hielo",
        outfit_suggestion: "Casual deportivo",
        best_for: ["diversión", "primer contacto"]
    },
    "arcade_retro": {
        name: "Arcade Retro",
        desc: "Máquinas clásicas, luces de neón y competencia amistosa.",
        romance_bonus: 6,
        ambience: "Beeps y boops nostálgicos",
        outfit_suggestion: "Geek chic",
        best_for: ["amistad", "diversión"]
    },
    "parque_atracciones": {
        name: "Parque de Atracciones",
        desc: "Montañas rusas, algodón de azúcar y luces de colores.",
        romance_bonus: 12,
        ambience: "Gritos de emoción y música carnavalesca",
        outfit_suggestion: "Cómodo",
        best_for: ["adrenalina", "manos que se buscan"]
    },
    "teatro_opera": {
        name: "Teatro de la Ópera",
        desc: "Elegancia clásica, palcos privados y arte en su máxima expresión.",
        romance_bonus: 20,
        ambience: "Orquesta y aplausos",
        outfit_suggestion: "Alta costura",
        best_for: ["impresionar", "noches inolvidables"]
    },
    "club_gay_striptease": {
        name: "Club Ozzie's",
        desc: "El lugar favorito de Blitzo. Atrevido, provocativo y liberador.",
        romance_bonus: 25,
        ambience: "Música sensual y ambiente íntimo",
        outfit_suggestion: "Sexy",
        best_for: ["pasión", "experiencias picantes"]
    },
    "templo_antiguo": {
        name: "Templo Ancestral",
        desc: "Ruinas sagradas donde el tiempo parece detenerse.",
        romance_bonus: 16,
        ambience: "Viento entre piedras y campanadas lejanas",
        outfit_suggestion: "Espiritual",
        best_for: ["conexión profunda", "promesas"]
    },
    "jardin_botanico": {
        name: "Jardín Botánico Celestial",
        desc: "Flores de todos los universos floreciendo en armonía.",
        romance_bonus: 14,
        ambience: "Aroma floral y abejas",
        outfit_suggestion: "Romántico",
        best_for: ["paseos tranquilos", "regalos"]
    },
    "planetario_cuantico": {
        name: "Planetario Cuántico",
        desc: "El universo a tus pies, literalmente. Estrellas naciendo y muriendo.",
        romance_bonus: 22,
        ambience: "Música celestial y estrellas danzando",
        outfit_suggestion: "Elegante",
        best_for: ["propuestas", "momentos mágicos"]
    }
};

export function getLugarCita(id) {
    return citasDB[id] || null;
}

export function getLugaresPreferidos(personaje) {
    const favorito = personaje.favoritePlace;
    return Object.entries(citasDB)
        .filter(([id, _]) => id === favorito)
        .map(([id, data]) => ({ id, ...data }));
}
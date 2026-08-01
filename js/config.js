// ============================================================================
// config.js - Configuración y constantes globales
// ============================================================================

export const CONFIG = {
    VERSION: '2.0.0',
    MAX_AFFECTION: 100,
    MAX_ROMANCE: 100,
    STARTING_HOUR: 12,
    TIME_ADVANCE_PER_ACTION: 1,
    WEATHER_TYPES: ['Soleado', 'Lluvia', 'Tormenta', 'Niebla', 'Nevado', 'Eclipse'],
    AFFINITY_THRESHOLDS: {
        HOSTILE: 0,
        DISTANT: 20,
        NEUTRAL: 40,
        FRIENDLY: 65,
        ENAMORED: 85,
        SOULMATE: 100
    }
};

export const themePalettes = {
    heroico: { "--bg-color": "#03121d", "--term-bg": "rgba(10, 25, 41, 0.96)", "--border-color": "#00dfff", "--purple": "#00dfff", "--gold": "#ffe600", "--text-main": "#e1f5fe" },
    edgy: { "--bg-color": "#120517", "--term-bg": "rgba(22, 10, 28, 0.96)", "--border-color": "#d670ff", "--purple": "#d670ff", "--gold": "#ff79c6", "--text-main": "#f8f8f2" },
    caotico: { "--bg-color": "#1a0505", "--term-bg": "rgba(31, 10, 10, 0.96)", "--border-color": "#ff4d4d", "--purple": "#ff4d4d", "--gold": "#ffb86c", "--text-main": "#fff0f0" },
    alegre: { "--bg-color": "#051a0e", "--term-bg": "rgba(9, 31, 18, 0.96)", "--border-color": "#50fa7b", "--purple": "#50fa7b", "--gold": "#f1fa8c", "--text-main": "#f0fff4" },
    sabio_serio: { "--bg-color": "#05181c", "--term-bg": "rgba(8, 28, 33, 0.96)", "--border-color": "#8be9fd", "--purple": "#8be9fd", "--gold": "#e5c07b", "--text-main": "#edfbfd" },
    villano: { "--bg-color": "#1a0505", "--term-bg": "rgba(40, 10, 10, 0.96)", "--border-color": "#ff4444", "--purple": "#ff4444", "--gold": "#ff8888", "--text-main": "#ffe6e6" },
    dios: { "--bg-color": "#1a1505", "--term-bg": "rgba(40, 35, 10, 0.96)", "--border-color": "#ffd700", "--purple": "#ffd700", "--gold": "#ffed4e", "--text-main": "#fffbe6" },
    default: { "--bg-color": "#08090c", "--term-bg": "rgba(13, 15, 20, 0.96)", "--border-color": "#2e3440", "--purple": "#c678dd", "--gold": "#e5c07b", "--text-main": "#d8dee9" }
};

export const MENTAL_STATES = {
    0: "Hostil / Deprimido",
    20: "Distante / Irritado",
    40: "Tranquilo / Neutral",
    65: "Entusiasmado / Amigable",
    85: "Enamorado / Fiel",
    100: "Alma Gemela / Devoto"
};

export const ROMANCE_STATES = {
    0: "Desconocidos",
    25: "Conocidos",
    50: "Amigos",
    75: "Cómplices",
    90: "Pareja",
    100: "Almas Gemelas"
};
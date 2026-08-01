// ============================================================================
// rooms.js - Sistema de habitaciones y navegación
// ============================================================================

export const roomsDB = {
    "salon_central": {
        name: "Salón Central del Palacio",
        desc: "Un vasto salón con techos de cristal que muestran el multiverso girando. Es el nexo entre todas las realidades.",
        exits: { norte: "universo_dc", este: "universo_marvel", sur: "universo_dragon_ball", oeste: "universo_shonen_jump", abajo: "universo_hazbin_helluva" },
        theme: "default",
        ambience: "Música etérea y luces danzantes"
    },
    "universo_dc": {
        name: "Gotham City - Universo DC",
        desc: "Las calles oscuras de Gotham. Farolas parpadeantes y el Batiseñal proyectándose en las nubes.",
        exits: { sur: "salon_central", este: "universo_marvel", oeste: "baticueva" },
        theme: "edgy",
        ambience: "Sonidos de sirenas distantes y lluvia"
    },
    "baticueva": {
        name: "La Baticueva",
        desc: "El santuario tecnológico de Batman. Pantallas brillantes y el Batimóvil reluciente.",
        exits: { este: "universo_dc" },
        theme: "edgy",
        ambience: "Zumbido de computadoras y gotas de agua"
    },
    "universo_marvel": {
        name: "Torre Stark - Universo Marvel",
        desc: "La mansión de los Vengadores. Tecnología de punta y vistas a Manhattan.",
        exits: { oeste: "universo_dc", sur: "salon_central" },
        theme: "heroico",
        ambience: "Máquinas funcionando y conversaciones de héroes"
    },
    "universo_dragon_ball": {
        name: "Montaña Paoz - Universo Dragon Ball",
        desc: "La casa de Goku. Naturaleza exuberante y ki flotando en el aire.",
        exits: { norte: "salon_central", este: "universo_shonen_jump", arriba: "templo_dioses" },
        theme: "alegre",
        ambience: "Viento suave y entrenamiento a distancia"
    },
    "templo_dioses": {
        name: "Templo de Dioses",
        desc: "Donde entrena Whis. Gravedad aumentada y comida divina.",
        exits: { abajo: "universo_dragon_ball" },
        theme: "dios",
        ambience: "Silencio absoluto y presencia divina"
    },
    "universo_shonen_jump": {
        name: "Aldea de la Hoja - Universo Naruto",
        desc: "Konoha. Monumento de los Hokage vigilando desde lo alto.",
        exits: { oeste: "universo_dragon_ball", norte: "salon_central", este: "universo_anime_variado" },
        theme: "heroico",
        ambience: "Hojas cayendo y murmullos de ninjas"
    },
    "universo_anime_variado": {
        name: "Ciudad Academia",
        desc: "Donde convergen múltiples historias. Colegios, calles comerciales y misterios.",
        exits: { oeste: "universo_shonen_jump", norte: "universo_sega_sonic" },
        theme: "sabio_serio",
        ambience: "Campanas escolares y tráfico"
    },
    "universo_hazbin_helluva": {
        name: "Pentagram City - Helluva Boss",
        desc: "El infierno corporativo. Rascacielos de obsidiana y fuego eterno.",
        exits: { arriba: "salon_central", sur: "club_gay_striptease" },
        theme: "caotico",
        ambience: "Risas demoníacas y música industrial"
    },
    "club_gay_striptease": {
        name: "Club Gay Strip-Tease",
        desc: "Donde Blitzo hace sus... negocios. Luces de neón y ambiente pecaminoso.",
        exits: { norte: "universo_hazbin_helluva" },
        theme: "caotico",
        ambience: "Música sensual y risas picaras"
    },
    "universo_sega_sonic": {
        name: "Green Hill Zone",
        desc: "Anillos brillantes, loops imposibles y naturaleza pixelada.",
        exits: { sur: "universo_anime_variado", oeste: "salon_central" },
        theme: "alegre",
        ambience: "Música de 16-bits y viento rápido"
    },
    "universo_capcom_resident": {
        name: "Raccoon City",
        desc: "Ruinas de la ciudad infectada. Zombies deambulando entre coches abandonados.",
        exits: { norte: "laboratorio_umbrella", este: "salon_central" },
        theme: "villano",
        ambience: "Gemidos y pasos arrastrados"
    },
    "laboratorio_umbrella": {
        name: "Laboratorio Umbrella",
        desc: "Instalaciones subterráneas. Virus y experimentos fallidos.",
        exits: { sur: "universo_capcom_resident" },
        theme: "villano",
        ambience: "Alarmas y zumbido de luces fluorescentes"
    },
    "universo_darkstalkers": {
        name: "Reino de los Darkstalkers",
        desc: "Donde los monstruos son reales. Castillos góticos y niebla eterna.",
        exits: { este: "salon_central" },
        theme: "edgy",
        ambience: "Aullidos y alas de murciélago"
    },
    "universo_nintendo": {
        name: "Reino Champiñón",
        desc: "Colorido, saltarín y lleno de blodos con signos de interrogación.",
        exits: { abajo: "castillo_bowser", oeste: "salon_central" },
        theme: "alegre",
        ambience: "Música alegre y sonidos de monedas"
    },
    "castillo_bowser": {
        name: "Castillo de Bowser",
        desc: "Lava, pinchos y trampas. La princesa está en otro castillo... o no.",
        exits: { arriba: "universo_nintendo" },
        theme: "villano",
        ambience: "Fuego crepitante y rugidos"
    },
    "universo_gaming_rpg": {
        name: "Midgar",
        desc: "La ciudad de la placa. Tecnología vs Naturaleza.",
        exits: { norte: "salon_central" },
        theme: "edgy",
        ambience: "Trenes y motores Mako"
    },
    "universo_lucha_mamados": {
        name: "Arena Subterránea",
        desc: "Donde los musculosos se enfrentan. Sangre, sudor y técnica.",
        exits: { oeste: "salon_central" },
        theme: "heroico",
        ambience: "Gritos de combate y aplausos"
    }
};

export function getRoom(roomId) {
    return roomsDB[roomId] || null;
}

export function getAllRooms() {
    return Object.keys(roomsDB);
}
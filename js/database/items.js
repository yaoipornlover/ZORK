// ============================================================================
// items.js - Base de datos de ítems expandida
// ============================================================================

export const itemsDB = {
    // Objetos comunes
    "pocion_vida": { name: "Poción de Vida", desc: "Restaura 50 HP", effect: "heal", value: 50, rarity: "comun", price: 50 },
    "pocion_mana": { name: "Poción de Maná", desc: "Restaura 30 MP", effect: "mana", value: 30, rarity: "comun", price: 40 },
    "pocion_amor": { name: "Poción de Amor", desc: "Aumenta romance +10", effect: "romance", value: 10, rarity: "raro", price: 100 },
    "chocolate": { name: "Chocolate Premium", desc: "Aumenta afecto +5", effect: "affection", value: 5, rarity: "comun", price: 25 },
    "rosa_roja": { name: "Rosa Roja", desc: "Símbolo de amor, +15 romance", effect: "romance", value: 15, rarity: "comun", price: 30 },
    "anillo_compromiso": { name: "Anillo de Compromiso", desc: "El paso definitivo", effect: "romance", value: 50, rarity: "legendario", price: 500 },
    
    // Objetos de combate
    "espada_laser": { name: "Espada Láser", desc: "Arma de energía pura", damage: 40, rarity: "epico", price: 300 },
    "batarang": { name: "Batarang Explosivo", desc: "El arsenal del murciélago", damage: 25, rarity: "raro", price: 150 },
    "cuerda_seda": { name: "Cuerda de Seda", desc: "Para... atar cosas", effect: "bondage", value: 5, rarity: "raro", price: 80 },
    
    // Objetos especiales
    "esmeralda_chaos": { name: "Esmeralda del Caos", desc: "Permite el control del tiempo", effect: "special", rarity: "legendario", price: 1000 },
    "death_note": { name: "Death Note", desc: "Libreta maldita", effect: "instant_kill", rarity: "legendario", price: 9999 },
    "dragon_ball": { name: "Esfera del Dragón", desc: "Una de las 7 esferas", effect: "wish", rarity: "legendario", price: 777 },
    
    // Objetos de cita
    "vino_fino": { name: "Vino de 100 años", desc: "Para ocasiones especiales", effect: "mood", value: 20, rarity: "epico", price: 200 },
    "cafe_gourmet": { name: "Café Gourmet", desc: "El favorito de Tim Drake", effect: "energy", value: 15, rarity: "comun", price: 20 },
    "libro_icha_icha": { name: "Libro Icha Icha", desc: "Lectura de Kakashi", effect: "embarrass", rarity: "raro", price: 60 },
    
    // Consumibles
    "ramen": { name: "Ramen Ichiraku", desc: "El favorito de Naruto", effect: "heal", value: 30, rarity: "comun", price: 15 },
    "chili_dog": { name: "Chili Dog", desc: "El favorito de Sonic", effect: "speed", value: 20, rarity: "comun", price: 15 },
    "manzana_shinigami": { name: "Manzana Shinigami", desc: "Delicia de los dioses de la muerte", effect: "mana", value: 50, rarity: "raro", price: 100 }
};

export function getItem(id) {
    return itemsDB[id] || null;
}

export function getItemsByRarity(rarity) {
    return Object.entries(itemsDB)
        .filter(([_, item]) => item.rarity === rarity)
        .map(([id, item]) => ({ id, ...item }));
}
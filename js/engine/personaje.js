// ============================================================================
// personaje.js - Clase Base de Personaje RPG
// ============================================================================

export class Personaje {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.desc = config.desc;
        this.room = config.room;
        this.tags = config.tags || [];
        this.favoritePlace = config.favoritePlace || "desconocido";
        this.universo = config.universo || "General";
        
        // Atributos de RPG
        this.hpMax = config.hp || 100;
        this.hp = this.hpMax;
        this.fuerza = config.fuerza || 10;
        this.defensa = config.defensa || 5;
        this.manaMax = config.mana || 50;
        this.mana = this.manaMax;
        this.alineacion = config.alineacion || "Neutral";
        this.habilidadEspecial = config.habilidadEspecial || "Ataque Basico";
        
        // Inventario y estado
        this.inventario = config.inventario || [];
        this.estado = "normal"; // normal, envenenado, aturdido, congelado, etc.
        
        // Stats de Sims
        this.affinity = 0;
        this.romance = 0;
        this.simsData = {
            relationship: 50,
            mentalState: "Estable",
            outfit: "Ropa casual multiversal",
            likes: ["Explorar", "Charlar"],
            dislikes: ["Mala onda", "Ignorancia"],
            fetiches: []
        };
    }

    estaVivo() {
        return this.hp > 0;
    }

    recibirDanio(cantidad) {
        const danioReal = Math.max(1, cantidad - this.defensa);
        this.hp -= danioReal;
        if (this.hp < 0) this.hp = 0;
        return danioReal;
    }

    curar(cantidad) {
        this.hp += cantidad;
        if (this.hp > this.hpMax) this.hp = this.hpMax;
    }

    usarHabilidad() {
        if (this.mana >= 20) {
            this.mana -= 20;
            return `${this.name} activó su habilidad especial: **${this.habilidadEspecial}**!`;
        }
        return `${this.name} no tiene suficiente mana para activar ${this.habilidadEspecial}.`;
    }

    updateAffection(delta) {
        this.affinity = Math.max(0, Math.min(100, this.affinity + delta));
        this.updateMentalState();
        return this.affinity;
    }

    updateRomance(delta) {
        this.romance = Math.max(0, Math.min(100, this.romance + delta));
        return this.romance;
    }

    updateMentalState() {
        if (this.affinity >= 85) this.simsData.mentalState = "Enamorado / Fiel";
        else if (this.affinity >= 65) this.simsData.mentalState = "Entusiasmado";
        else if (this.affinity >= 40) this.simsData.mentalState = "Tranquilo";
        else if (this.affinity >= 20) this.simsData.mentalState = "Distante / Irritado";
        else this.simsData.mentalState = "Hostil / Deprimido";
    }
}
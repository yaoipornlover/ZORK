// ============================================================================
// simsEngine.js - Motor de relaciones y emociones
// ============================================================================

export class SimsEngine {
    constructor() {
        this.affections = {}; // npcId -> valor
        this.romances = {};   // npcId -> valor
        this.memories = {};   // npcId -> array de eventos
        this.inventory = [];
        this.globalAffection = 0;
    }

    init(npcs) {
        // Inicializar afectos en 0 para todos los NPCs
        Object.keys(npcs).forEach(id => {
            this.affections[id] = 0;
            this.romances[id] = 0;
            this.memories[id] = [];
        });
    }

    updateAffection(npcId, delta) {
        if (!(npcId in this.affections)) {
            this.affections[npcId] = 0;
        }
        const oldVal = this.affections[npcId];
        this.affections[npcId] = Math.max(0, Math.min(100, oldVal + delta));
        
        // Actualizar afecto global
        this.calculateGlobalAffection();
        
        return this.affections[npcId];
    }

    updateRomance(npcId, delta) {
        if (!(npcId in this.romances)) {
            this.romances[npcId] = 0;
        }
        this.romances[npcId] = Math.max(0, Math.min(100, this.romances[npcId] + delta));
        return this.romances[npcId];
    }

    getAffection(npcId) {
        return this.affections[npcId] || 0;
    }

    getRomance(npcId) {
        return this.romances[npcId] || 0;
    }

    getRelationshipLevel(npcId) {
        const val = this.getAffection(npcId);
        if (val >= 100) return "Alma Gemela";
        if (val >= 85) return "Enamorado";
        if (val >= 65) return "Amigo Cercano";
        if (val >= 40) return "Conocido";
        if (val >= 20) return "Desconocido";
        return "Hostil";
    }

    addMemory(npcId, event) {
        if (!this.memories[npcId]) this.memories[npcId] = [];
        this.memories[npcId].push({
            event,
            turn: Date.now(),
            room: "current" // Se actualizaría con el contexto real
        });
    }

    calculateGlobalAffection() {
        const values = Object.values(this.affections);
        if (values.length === 0) {
            this.globalAffection = 0;
            return;
        }
        const sum = values.reduce((a, b) => a + b, 0);
        this.globalAffection = Math.round(sum / values.length);
    }

    getGlobalAffection() {
        return this.globalAffection;
    }

    // Guardar/cargar
    serialize() {
        return {
            affections: this.affections,
            romances: this.romances,
            memories: this.memories,
            inventory: this.inventory,
            globalAffection: this.globalAffection
        };
    }

    deserialize(data) {
        this.affections = data.affections || {};
        this.romances = data.romances || {};
        this.memories = data.memories || {};
        this.inventory = data.inventory || [];
        this.globalAffection = data.globalAffection || 0;
    }
}
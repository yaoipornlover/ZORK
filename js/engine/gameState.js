// ============================================================================
// gameState.js - Estado global del juego
// ============================================================================

export class GameState {
    constructor() {
        this.currentRoom = 'salon_central';
        this.inventory = [];
        this.flags = {}; // Banderas de eventos
        this.turns = 0;
        this.hour = 12;
        this.weather = 'Soleado';
        this.history = []; // Historial de comandos
        this.achievements = [];
        this.currentFocusNpc = null;
    }

    moveTo(roomId) {
        this.currentRoom = roomId;
        this.advanceTime();
        this.updateWeather();
    }

    advanceTime() {
        this.hour += 1;
        if (this.hour >= 24) {
            this.hour = 0;
        }
        this.turns++;
    }

    updateWeather() {
        const weathers = ['Soleado', 'Lluvia', 'Tormenta', 'Niebla', 'Nevado', 'Eclipse'];
        if (Math.random() < 0.1) { // 10% de cambio
            this.weather = weathers[Math.floor(Math.random() * weathers.length)];
        }
    }

    addToInventory(item) {
        this.inventory.push(item);
    }

    removeFromInventory(itemId) {
        const idx = this.inventory.findIndex(i => i.id === itemId);
        if (idx > -1) {
            return this.inventory.splice(idx, 1)[0];
        }
        return null;
    }

    hasItem(itemId) {
        return this.inventory.some(i => i.id === itemId);
    }

    setFlag(key, value) {
        this.flags[key] = value;
    }

    getFlag(key) {
        return this.flags[key];
    }

    setFocusNpc(npcId) {
        this.currentFocusNpc = npcId;
    }

    // Serialización para guardar
    serialize() {
        return {
            currentRoom: this.currentRoom,
            inventory: this.inventory,
            flags: this.flags,
            turns: this.turns,
            hour: this.hour,
            weather: this.weather,
            achievements: this.achievements,
            currentFocusNpc: this.currentFocusNpc
        };
    }

    deserialize(data) {
        this.currentRoom = data.currentRoom || 'salon_central';
        this.inventory = data.inventory || [];
        this.flags = data.flags || {};
        this.turns = data.turns || 0;
        this.hour = data.hour || 12;
        this.weather = data.weather || 'Soleado';
        this.achievements = data.achievements || [];
        this.currentFocusNpc = data.currentFocusNpc || null;
    }
}
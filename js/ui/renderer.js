// ============================================================================
// renderer.js - Funciones de renderizado visual
// ============================================================================

export class Renderer {
    constructor() {
        this.terminal = document.getElementById('terminal-body');
        this.mapCanvas = document.getElementById('map-canvas');
        this.ctx = this.mapCanvas?.getContext('2d');
    }

    printLog(html, type = '') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = html;
        this.terminal.appendChild(entry);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    clearTerminal() {
        this.terminal.innerHTML = '';
    }

    updateStats(gameState, simsEngine) {
        document.getElementById('stat-afecto').textContent = `${simsEngine.getGlobalAffection()}%`;
        document.getElementById('stat-turnos').textContent = gameState.turns;
        document.getElementById('stat-hora').textContent = `${gameState.hour.toString().padStart(2, '0')}:00`;
    }

    drawMap(currentRoom, roomsDB) {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
        
        // Dibujar conexiones simples
        const room = roomsDB[currentRoom];
        if (!room) return;

        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '10px monospace';
        this.ctx.fillText(`Loc: ${room.name}`, 10, 20);
        this.ctx.fillText(`Clima: ${room.weather || 'Despejado'}`, 10, 35);
        
        // Dibujar salidas
        let y = 55;
        Object.entries(room.exits).forEach(([dir, target]) => {
            this.ctx.fillStyle = '#48bb78';
            this.ctx.fillText(`${dir.toUpperCase()}: ${target}`, 10, y);
            y += 12;
        });
    }

    mostrarInteraccion(npc, accion, dialogo, puntos, esEspecial) {
        const colorAccion = esEspecial ? '#ffd700' : 'var(--gold)';
        const html = `
            <div style="display: flex; gap: 15px; align-items: flex-start; margin-top: 10px;">
                <div style="flex: 1;">
                    <p>Ejecutás: <strong style="color:${colorAccion};">${accion.replace(/_/g, ' ').toUpperCase()}</strong> sobre <span class="npc-name">${npc.name}</span></p>
                    <div class="speech-bubble">${dialogo}</div>
                    <p class="system-msg">✨ ¡Afecto / Felicidad: +${puntos} pts!</p>
                </div>
            </div>
        `;
        this.printLog(html);
    }

    renderNPCList(npcs) {
        if (npcs.length === 0) {
            this.printLog('<span class="system-msg">No hay nadie más aquí.</span>');
            return;
        }

        let html = '<div class="room-title">👥 Personajes presentes:</div><ul>';
        npcs.forEach(npc => {
            const tags = npc.tags.map(t => `<span class="tag-chip tag-${t}">${t}</span>`).join('');
            html += `<li><span class="npc-name">${npc.name}</span> - ${npc.desc.substring(0, 50)}... ${tags}</li>`;
        });
        html += '</ul>';
        this.printLog(html);
    }

    renderRoomInfo(room, npcs) {
        this.printLog(`<div class="room-title">📍 ${room.name}</div>`);
        this.printLog(room.desc);
        this.printLog(`<span class="system-msg">Ambiente: ${room.ambience}</span>`);
        
        // Salidas
        const exits = Object.entries(room.exits).map(([dir, target]) => 
            `<strong>${dir}</strong> → ${target}`
        ).join(' | ');
        this.printLog(`<span class="highlight">Salidas:</span> ${exits}`);
        
        // NPCs
        if (npcs.length > 0) {
            this.renderNPCList(npcs);
        }
    }
}
// ============================================================================
// commands.js - Sistema de comandos completo
// ============================================================================

import { procesarAccionSocial, COMANDOS_SOCIALES, INTERACCIONES_PICANTES, ESPECIALES_POR_PERSONAJE } from '../database/interacciones.js';
import { getLugarCita } from '../database/citas.js';

export class CommandHandler {
    constructor(gameState, npcsDB, roomsDB, itemsDB, simsEngine, renderer, sfx) {
        this.gameState = gameState;
        this.npcsDB = npcsDB;
        this.roomsDB = roomsDB;
        this.itemsDB = itemsDB;
        this.simsEngine = simsEngine;
        this.renderer = renderer;
        this.sfx = sfx;
        
        this.setupCommands();
    }

    setupCommands() {
        // Mapa de comandos principales
        this.commandMap = {
            // Movimiento
            'ir': this.cmdMover.bind(this),
            'mover': this.cmdMover.bind(this),
            'norte': () => this.cmdMover('norte'),
            'sur': () => this.cmdMover('sur'),
            'este': () => this.cmdMover('este'),
            'oeste': () => this.cmdMover('oeste'),
            'arriba': () => this.cmdMover('arriba'),
            'abajo': () => this.cmdMover('abajo'),
            'n': () => this.cmdMover('norte'),
            's': () => this.cmdMover('sur'),
            'e': () => this.cmdMover('este'),
            'o': () => this.cmdMover('oeste'),
            
            // Observación
            'mirar': this.cmdMirar.bind(this),
            'look': this.cmdMirar.bind(this),
            'ver': this.cmdMirar.bind(this),
            'examinar': this.cmdExaminar.bind(this),
            'ex': this.cmdExaminar.bind(this),
            
            // Interacción social
            'hablar': this.cmdHablar.bind(this),
            'talk': this.cmdHablar.bind(this),
            'saludar': this.cmdSaludar.bind(this),
            
            // Inventario
            'inventario': this.cmdInventario.bind(this),
            'inv': this.cmdInventario.bind(this),
            'i': this.cmdInventario.bind(this),
            'tomar': this.cmdTomar.bind(this),
            'agarrar': this.cmdTomar.bind(this),
            'soltar': this.cmdSoltar.bind(this),
            'usar': this.cmdUsar.bind(this),
            'dar': this.cmdDar.bind(this),
            
            // Sistema Sims/Romance
            'abrazar': (args) => this.cmdAccionSocial('abrazar', args),
            'besar': (args) => this.cmdAccionSocial('besar', args),
            'acariciar': (args) => this.cmdAccionSocial('acariciar', args),
            'cita': this.cmdCita.bind(this),
            'date': this.cmdCita.bind(this),
            'stats': this.cmdStats.bind(this),
            'estado': this.cmdStats.bind(this),
            'afecto': this.cmdAfecto.bind(this),
            'romance': this.cmdRomance.bind(this),
            
            // Información
            'ayuda': this.cmdAyuda.bind(this),
            'help': this.cmdAyuda.bind(this),
            '?': this.cmdAyuda.bind(this),
            'comandos': this.cmdAyuda.bind(this),
            'interacciones': this.cmdListaInteracciones.bind(this),
            'personajes': this.cmdPersonajes.bind(this),
            'lugares': this.cmdLugares.bind(this),
            
            // Utilidades
            'limpiar': this.cmdLimpiar.bind(this),
            'clear': this.cmdLimpiar.bind(this),
            'cls': this.cmdLimpiar.bind(this),
            'savegame': this.cmdGuardar.bind(this),
            'guardar': this.cmdGuardar.bind(this),
            'loadgame': this.cmdCargar.bind(this),
            'cargar': this.cmdCargar.bind(this),
            'clima': this.cmdClima.bind(this),
            'weather': this.cmdClima.bind(this),
            'hora': this.cmdHora.bind(this),
            'time': this.cmdHora.bind(this),
            
            // Combate (básico)
            'atacar': this.cmdAtacar.bind(this),
            'luchar': this.cmdAtacar.bind(this),
            'fight': this.cmdAtacar.bind(this),
            
            // Especiales
            'invocar': this.cmdInvocar.bind(this),
            'teletransportar': this.cmdTeleport.bind(this),
            'tp': this.cmdTeleport.bind(this)
        };

        // Registrar comandos sociales dinámicos
        [...COMANDOS_SOCIALES, ...INTERACCIONES_PICANTES].forEach(cmd => {
            if (!this.commandMap[cmd]) {
                this.commandMap[cmd] = (args) => this.cmdAccionSocial(cmd, args);
            }
        });
    }

    // ============================================================
    // PARSER PRINCIPAL
    // ============================================================
    
    execute(input) {
        if (!input || !input.trim()) return;
        
        const trimmed = input.trim();
        this.gameState.history.push(trimmed);
        
        // Separar comando y argumentos
        const spaceIdx = trimmed.indexOf(' ');
        const cmd = spaceIdx === -1 ? trimmed : trimmed.substring(0, spaceIdx);
        const args = spaceIdx === -1 ? '' : trimmed.substring(spaceIdx + 1).trim();
        
        // Buscar comando exacto
        if (this.commandMap[cmd]) {
            this.sfx.playCmdSuccess?.();
            const result = this.commandMap[cmd](args);
            if (result && typeof result === 'string') {
                this.renderer.printLog(result);
            }
            return;
        }
        
        // Búsqueda aproximada
        const matches = Object.keys(this.commandMap).filter(k => k.startsWith(cmd));
        if (matches.length === 1) {
            this.commandMap[matches[0]](args);
        } else if (matches.length > 1) {
            this.renderer.printLog(`¿Quisiste decir? ${matches.join(', ')}`, 'warning');
        } else {
            this.sfx.playError?.();
            this.renderer.printLog(`Comando desconocido: "${cmd}". Escribe 'ayuda' para ver opciones.`, 'warning');
        }
    }

    // ============================================================
    // COMANDOS DE MOVIMIENTO
    // ============================================================
    
    cmdMover(direccion) {
        if (!direccion) {
            this.renderer.printLog('¿Hacia dónde? Usa: ir [norte/sur/este/oeste/arriba/abajo]', 'warning');
            return;
        }
        
        const room = this.roomsDB[this.gameState.currentRoom];
        if (!room.exits[direccion]) {
            const disponibles = Object.keys(room.exits).join(', ');
            this.renderer.printLog(`No puedes ir hacia "${direccion}". Salidas: ${disponibles}`, 'warning');
            return;
        }
        
        const destino = room.exits[direccion];
        this.gameState.moveTo(destino);
        
        const newRoom = this.roomsDB[destino];
        const npcsAqui = Object.values(this.npcsDB).filter(n => n.room === destino);
        
        this.renderer.printLog(`<span class="system-msg">Moviendo a ${direccion}...</span>`);
        this.renderer.renderRoomInfo(newRoom, npcsAqui);
        this.renderer.updateStats(this.gameState, this.simsEngine);
        
        // Verificar eventos especiales
        this.checkRoomEvents(destino);
    }

    // ============================================================
    // COMANDOS DE OBSERVACIÓN
    // ============================================================
    
    cmdMirar() {
        const room = this.roomsDB[this.gameState.currentRoom];
        const npcs = Object.values(this.npcsDB).filter(n => n.room === this.gameState.currentRoom);
        this.renderer.renderRoomInfo(room, npcs);
    }

    cmdExaminar(target) {
        if (!target) {
            this.renderer.printLog('¿Qué quieres examinar?', 'warning');
            return;
        }
        
        // Buscar NPC
        const npc = Object.values(this.npcsDB).find(n => 
            n.room === this.gameState.currentRoom && 
            (n.id === target || n.name.toLowerCase().includes(target))
        );
        
        if (npc) {
            this.renderer.printLog(`
                <div class="room-title">🔍 ${npc.name}</div>
                <p>${npc.desc}</p>
                <p><span class="highlight">Universo:</span> ${npc.universo}</p>
                <p><span class="highlight">HP:</span> ${npc.hp}/${npc.hpMax} | 
                   <span class="highlight">MP:</span> ${npc.mana}/${npc.manaMax}</p>
                <p><span class="highlight">Fuerza:</span> ${npc.fuerza} | 
                   <span class="highlight">Defensa:</span> ${npc.defensa}</p>
                <p><span class="highlight">Habilidad:</span> ${npc.habilidadEspecial}</p>
                <p><span class="highlight">Alineación:</span> ${npc.alineacion}</p>
                <div class="tag-container">
                    ${npc.tags.map(t => `<span class="tag-chip tag-${t}">${t}</span>`).join('')}
                </div>
            `);
            return;
        }
        
        // Buscar item en habitación o inventario
        this.renderer.printLog(`No ves nada especial sobre "${target}".`);
    }

    // ============================================================
    // COMANDOS SOCIALES
    // ============================================================
    
    cmdHablar(target) {
        if (!target) {
            this.renderer.printLog('¿Con quién quieres hablar?', 'warning');
            return;
        }
        
        const npc = this.findNPCInRoom(target);
        if (!npc) {
            this.renderer.printLog(`No hay nadie llamado "${target}" aquí.`, 'warning');
            return;
        }
        
        const afecto = this.simsEngine.getAffection(npc.id);
        let respuesta = this.generarDialogo(npc, afecto);
        
        this.renderer.printLog(`
            <div style="margin: 10px 0;">
                <span class="npc-name">${npc.name}:</span>
                <div class="speech-bubble">${respuesta}</div>
            </div>
        `);
        
        // Pequeño boost de afecto por hablar
        this.simsEngine.updateAffection(npc.id, 1);
    }

    cmdSaludar(target) {
        if (!target) {
            this.renderer.printLog('Saludas al aire... qué incómodo.', 'system-msg');
            return;
        }
        
        const npc = this.findNPCInRoom(target);
        if (!npc) {
            this.renderer.printLog(`No hay nadie llamado "${target}" aquí.`, 'warning');
            return;
        }
        
        const afecto = this.simsEngine.getAffection(npc.id);
        let reaccion = afecto > 40 ? 'te devuelve el saludo con una sonrisa' : 
                      afecto > 20 ? 'asiente con la cabeza' : 
                      'te ignora';
        
        this.renderer.printLog(`Saludas a <span class="npc-name">${npc.name}</span>. ${npc.name} ${reaccion}.`);
        this.simsEngine.updateAffection(npc.id, 2);
    }

    async cmdAccionSocial(accion, target) {
        if (!target) {
            this.renderer.printLog(`¿A quién le quieres hacer "${accion}"?`, 'warning');
            return;
        }
        
        await procesarAccionSocial(
            target, 
            accion, 
            this.gameState, 
            this.npcsDB, 
            this.simsEngine, 
            this.renderer
        );
        
        this.renderer.updateStats(this.gameState, this.simsEngine);
    }

    cmdCita(args) {
        const partes = args.split(' ');
        const lugar = partes[0];
        const personaje = partes.slice(1).join(' ');
        
        if (!lugar || !personaje) {
            this.renderer.printLog(`
                <div class="room-title">🌹 Sistema de Citas</div>
                <p>Usa: cita [lugar] [personaje]</p>
                <p>Ejemplo: cita mirador_estrellas batman</p>
                <p class="system-msg">Lugares disponibles: revisa con 'lugares'</p>
            `);
            return;
        }
        
        const npc = this.findNPCInRoom(personaje);
        if (!npc) {
            this.renderer.printLog(`No encuentras a "${personaje}" aquí.`, 'warning');
            return;
        }
        
        const lugarData = getLugarCita(lugar);
        if (!lugarData) {
            this.renderer.printLog(`El lugar "${lugar}" no existe.`, 'warning');
            return;
        }
        
        const afectoActual = this.simsEngine.getAffection(npc.id);
        if (afectoActual < 30) {
            this.renderer.printLog(`<span class="npc-name">${npc.name}</span> no está interesado en salir contigo todavía. Mejora tu relación primero.`, 'warning');
            return;
        }
        
        // Éxito en la cita
        const bonus = lugarData.romance_bonus;
        this.simsEngine.updateAffection(npc.id, bonus);
        this.simsEngine.updateRomance(npc.id, Math.floor(bonus / 2));
        
        this.renderer.printLog(`
            <div style="border: 2px solid var(--purple); padding: 15px; border-radius: 8px; margin: 10px 0;">
                <div class="room-title">💖 Cita con ${npc.name}</div>
                <p>Lugar: ${lugarData.name}</p>
                <p>${lugarData.desc}</p>
                <p><span class="highlight">Ambiente:</span> ${lugarData.ambience}</p>
                <br>
                <p>Pasan un momento maravilloso juntos...</p>
                <p class="system-msg">✨ Afecto +${bonus} | Romance +${Math.floor(bonus / 2)}</p>
            </div>
        `);
        
        this.sfx.playRomanticSuccess?.();
    }

    // ============================================================
    // COMANDOS DE INVENTARIO
    // ============================================================
    
    cmdInventario() {
        if (this.gameState.inventory.length === 0) {
            this.renderer.printLog('Tu inventario está vacío.', 'system-msg');
            return;
        }
        
        let html = '<div class="room-title">🎒 Inventario</div><ul style="list-style: none; padding: 0;">';
        this.gameState.inventory.forEach((item, idx) => {
            const itemData = this.itemsDB[item.id] || { name: item.id, desc: 'Objeto misterioso' };
            html += `
                <li style="margin: 5px 0; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                    <span class="item-name">${itemData.name}</span> 
                    <span style="color: var(--text-muted); font-size: 0.9em;">- ${itemData.desc}</span>
                </li>
            `;
        });
        html += '</ul>';
        this.renderer.printLog(html);
    }

    cmdTomar(itemName) {
        if (!itemName) {
            this.renderer.printLog('¿Qué quieres tomar?', 'warning');
            return;
        }
        
        // Simulación de items en habitación
        this.renderer.printLog(`No hay "${itemName}" para tomar aquí.`, 'warning');
    }

    cmdSoltar(itemName) {
        if (!itemName) {
            this.renderer.printLog('¿Qué quieres soltar?', 'warning');
            return;
        }
        
        const item = this.gameState.inventory.find(i => i.id === itemName || i.name === itemName);
        if (!item) {
            this.renderer.printLog(`No tienes "${itemName}" en tu inventario.`, 'warning');
            return;
        }
        
        this.gameState.removeFromInventory(item.id);
        this.renderer.printLog(`Suelta <span class="item-name">${item.name}</span>.`);
    }

    cmdUsar(args) {
        if (!args) {
            this.renderer.printLog('¿Qué quieres usar?', 'warning');
            return;
        }
        
        const [itemName, target] = args.split(' en ');
        const item = this.gameState.inventory.find(i => i.id === itemName);
        
        if (!item) {
            this.renderer.printLog(`No tienes "${itemName}".`, 'warning');
            return;
        }
        
        this.renderer.printLog(`Usas <span class="item-name">${item.name}</span>${target ? ` en ${target}` : ''}.`);
    }

    cmdDar(args) {
        if (!args || !args.includes(' a ')) {
            this.renderer.printLog('Usa: dar [objeto] a [personaje]', 'warning');
            return;
        }
        
        const [itemPart, targetPart] = args.split(' a ');
        const item = this.gameState.inventory.find(i => i.id === itemPart.trim());
        
        if (!item) {
            this.renderer.printLog(`No tienes "${itemPart.trim()}".`, 'warning');
            return;
        }
        
        const npc = this.findNPCInRoom(targetPart.trim());
        if (!npc) {
            this.renderer.printLog(`No hay nadie llamado "${targetPart.trim()}" aquí.`, 'warning');
            return;
        }
        
        // Efecto del regalo
        const itemData = this.itemsDB[item.id] || {};
        if (itemData.effect === 'affection') {
            this.simsEngine.updateAffection(npc.id, itemData.value || 5);
            this.renderer.printLog(`
                Le das <span class="item-name">${itemData.name}</span> a <span class="npc-name">${npc.name}</span>.
                <br><span class="system-msg">✨ Afecto +${itemData.value || 5}</span>
            `);
        } else {
            this.renderer.printLog(`Le das ${itemData.name || item.id} a ${npc.name}.`);
        }
        
        this.gameState.removeFromInventory(item.id);
    }

    // ============================================================
    // COMANDOS DE INFORMACIÓN
    // ============================================================
    
    cmdStats(target) {
        if (!target) {
            // Stats globales
            this.renderer.printLog(`
                <div class="room-title">📊 Estadísticas del Jugador</div>
                <table class="cmd-table">
                    <tr><td>Turnos</td><td>${this.gameState.turns}</td></tr>
                    <tr><td>Hora</td><td>${this.gameState.hour.toString().padStart(2, '0')}:00</td></tr>
                    <tr><td>Clima</td><td>${this.gameState.weather}</td></tr>
                    <tr><td>Ubicación</td><td>${this.roomsDB[this.gameState.currentRoom]?.name}</td></tr>
                    <tr><td>Afecto Global</td><td>${this.simsEngine.getGlobalAffection()}%</td></tr>
                    <tr><td>Objetos</td><td>${this.gameState.inventory.length}</td></tr>
                </table>
            `);
            return;
        }
        
        const npc = this.findNPCInRoom(target) || Object.values(this.npcsDB).find(n => n.id === target);
        if (!npc) {
            this.renderer.printLog(`Personaje "${target}" no encontrado.`, 'warning');
            return;
        }
        
        const afecto = this.simsEngine.getAffection(npc.id);
        const romance = this.simsEngine.getRomance(npc.id);
        const nivel = this.simsEngine.getRelationshipLevel(npc.id);
        
        this.renderer.printLog(`
            <div class="room-title">💎 ${npc.name}</div>
            <table class="cmd-table">
                <tr><td>Relación</td><td>${nivel} (${afecto}/100)</td></tr>
                <tr><td>Romance</td><td>${romance}/100</td></tr>
                <tr><td>HP</td><td>${npc.hp}/${npc.hpMax}</td></tr>
                <tr><td>MP</td><td>${npc.mana}/${npc.manaMax}</td></tr>
                <tr><td>Fuerza</td><td>${npc.fuerza}</td></tr>
                <tr><td>Defensa</td><td>${npc.defensa}</td></tr>
                <tr><td>Habilidad</td><td>${npc.habilidadEspecial}</td></tr>
                <tr><td>Alineación</td><td>${npc.alineacion}</td></tr>
                <tr><td>Universo</td><td>${npc.universo}</td></tr>
            </table>
            <p style="margin-top: 10px;"><span class="highlight">Descripción:</span> ${npc.desc}</p>
        `);
    }

    cmdAfecto(target) {
        if (!target) {
            // Mostrar top afectos
            const afectos = Object.entries(this.simsEngine.affections)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
            
            let html = '<div class="room-title">💕 Top Relaciones</div><ol>';
            afectos.forEach(([id, val]) => {
                const npc = this.npcsDB[id];
                if (npc) html += `<li><span class="npc-name">${npc.name}</span>: ${val}/100</li>`;
            });
            html += '</ol>';
            this.renderer.printLog(html);
            return;
        }
        
        const npc = this.findNPCInRoom(target);
        if (!npc) {
            this.renderer.printLog('Personaje no encontrado.', 'warning');
            return;
        }
        
        const val = this.simsEngine.getAffection(npc.id);
        this.renderer.printLog(`Afecto con <span class="npc-name">${npc.name}</span>: ${val}/100 (${this.simsEngine.getRelationshipLevel(npc.id)})`);
    }

    cmdRomance(target) {
        if (!target) {
            this.renderer.printLog('Usa: romance [personaje]', 'warning');
            return;
        }
        
        const npc = this.findNPCInRoom(target);
        if (!npc) {
            this.renderer.printLog('Personaje no encontrado.', 'warning');
            return;
        }
        
        const val = this.simsEngine.getRomance(npc.id);
        const estado = val >= 90 ? 'Pareja' : val >= 75 ? 'Cómplices' : val >= 50 ? 'Amantes' : 
                      val >= 25 ? 'Interés' : 'Desconocidos';
        
        this.renderer.printLog(`Romance con <span class="npc-name">${npc.name}</span>: ${val}/100 (${estado})`);
    }

    cmdPersonajes() {
        const npcsAqui = Object.values(this.npcsDB).filter(n => n.room === this.gameState.currentRoom);
        
        if (npcsAqui.length === 0) {
            this.renderer.printLog('No hay nadie más en esta habitación.', 'system-msg');
            return;
        }
        
        let html = '<div class="room-title">👥 Personajes Presentes</div>';
        npcsAqui.forEach(npc => {
            const afecto = this.simsEngine.getAffection(npc.id);
            const barra = '█'.repeat(Math.floor(afecto / 10)) + '░'.repeat(10 - Math.floor(afecto / 10));
            html += `
                <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <span class="npc-name">${npc.name}</span> 
                    <span style="color: var(--text-muted); font-size: 0.8em;">(${npc.universo})</span>
                    <br><small>${npc.desc.substring(0, 60)}...</small>
                    <br><span style="color: var(--gold);">Afecto: [${barra}] ${afecto}%</span>
                </div>
            `;
        });
        this.renderer.printLog(html);
    }

    cmdLugares() {
        this.renderer.printLog(`
            <div class="room-title">🌹 Lugares para Citas Disponibles</div>
            <p class="system-msg">Usa: cita [lugar] [personaje]</p>
            <ul>
                <li><strong>mirador_estrellas</strong> - Vista panorámica del multiverso (+15 romance)</li>
                <li><strong>restaurante_lujoso</strong> - Cena de alta cocina (+10)</li>
                <li><strong>playa_tropical</strong> - Arena y mar (+12)</li>
                <li><strong>bosque_encantado</strong> - Magia natural (+18)</li>
                <li><strong>cafe_gourmet</strong> - Charlas íntimas (+8)</li>
                <li><strong>bar_subterraneo</strong> - Jazz y whisky (+14)</li>
                <li><strong>parque_atracciones</strong> - Diversión (+12)</li>
                <li><strong>teatro_opera</strong> - Cultura y elegancia (+20)</li>
                <li><strong>club_gay_striptease</strong> - Atrevido (+25)</li>
            </ul>
        `);
    }

    cmdListaInteracciones() {
        const sociales = COMANDOS_SOCIALES.slice(0, 15).join(', ');
        const picantes = INTERACCIONES_PICANTES.slice(0, 10).join(', ');
        
        this.renderer.printLog(`
            <div class="room-title">💬 Interacciones Disponibles</div>
            <p><strong style="color: var(--green);">Sociales:</strong> ${sociales}...</p>
            <p><strong style="color: var(--purple);">Románticas:</strong> ${picantes}...</p>
            <p class="system-msg">Usa: [acción] [personaje] (ej: abrazar batman, besar goku)</p>
            <p class="system-msg">Cada personaje tiene 3 interacciones especiales únicas!</p>
        `);
    }

    cmdAyuda() {
        this.renderer.printLog(`
            <div class="room-title">❓ Guía de Comandos</div>
            
            <h4 style="color: var(--cyan); margin: 15px 0 5px;">🚶 Movimiento</h4>
            <p><code>ir [dirección]</code> - norte, sur, este, oeste, arriba, abajo (o n, s, e, o)</p>
            
            <h4 style="color: var(--cyan); margin: 15px 0 5px;">👁️ Observación</h4>
            <p><code>mirar</code> - Ver habitación | <code>examinar [personaje]</code> - Detalles</p>
            
            <h4 style="color: var(--cyan); margin: 15px 0 5px;">💬 Social</h4>
            <p><code>hablar [personaje]</code> - Conversar</p>
            <p><code>[acción] [personaje]</code> - abrazar, besar, acariciar, coquetear...</p>
            <p><code>cita [lugar] [personaje]</code> - Invitar a salir</p>
            
            <h4 style="color: var(--cyan); margin: 15px 0 5px;">📊 Información</h4>
            <p><code>stats</code> - Tus stats | <code>stats [personaje]</code> - Stats de NPC</p>
            <p><code>personajes</code> - Quién está aquí | <code>interacciones</code> - Lista de acciones</p>
            
            <h4 style="color: var(--cyan); margin: 15px 0 5px;">💾 Sistema</h4>
            <p><code>guardar [slot]</code> / <code>cargar [slot]</code> - Guardar/cargar partida</p>
            <p><code>limpiar</code> - Limpiar pantalla | <code>ayuda</code> - Este menú</p>
        `);
    }

    // ============================================================
    // COMANDOS DE SISTEMA
    // ============================================================
    
    cmdLimpiar() {
        this.renderer.clearTerminal();
        this.renderer.printLog('<span class="system-msg">Terminal limpiada.</span>');
    }

    cmdGuardar(slot = 'default') {
        const data = {
            gameState: this.gameState.serialize(),
            sims: this.simsEngine.serialize(),
            timestamp: new Date().toLocaleString()
        };
        
        try {
            localStorage.setItem(`zork_multiverse_${slot}`, JSON.stringify(data));
            this.renderer.printLog(`<span class="system-msg" style="color: var(--green);">💾 Partida guardada en slot "${slot}"</span>`);
        } catch (e) {
            this.renderer.printLog('Error al guardar.', 'warning');
        }
    }

    cmdCargar(slot = 'default') {
        try {
            const data = localStorage.getItem(`zork_multiverse_${slot}`);
            if (!data) {
                this.renderer.printLog(`No hay partida en slot "${slot}".`, 'warning');
                return;
            }
            
            const parsed = JSON.parse(data);
            this.gameState.deserialize(parsed.gameState);
            this.simsEngine.deserialize(parsed.sims);
            
            this.renderer.printLog(`<span class="system-msg" style="color: var(--green);">📂 Partida cargada (${parsed.timestamp})</span>`);
            this.cmdMirar();
        } catch (e) {
            this.renderer.printLog('Error al cargar la partida.', 'warning');
        }
    }

    cmdClima() {
        this.renderer.printLog(`El clima actual es: <strong>${this.gameState.weather}</strong>`);
    }

    cmdHora() {
        const hora = this.gameState.hour.toString().padStart(2, '0');
        this.renderer.printLog(`Hora: <strong>${hora}:00</strong> | Turno: ${this.gameState.turns}`);
    }

    // ============================================================
    // COMANDOS DE COMBATE
    // ============================================================
    
    cmdAtacar(target) {
        if (!target) {
            this.renderer.printLog('¿A quién quieres atacar?', 'warning');
            return;
        }
        
        const npc = this.findNPCInRoom(target);
        if (!npc) {
            this.renderer.printLog(`No hay nadie llamado "${target}" aquí.`, 'warning');
            return;
        }
        
        // Sistema de combate simple
        const daño = Math.floor(Math.random() * 20) + 10;
        npc.recibirDanio(daño);
        
        this.renderer.printLog(`
            <div style="color: var(--red);">
                ⚔️ Atacas a <span class="npc-name">${npc.name}</span> causando ${daño} de daño!
                <br>HP restante: ${npc.hp}/${npc.hpMax}
            </div>
        `);
        
        this.sfx.playCombatHit?.();
        
        // Contraataque
        if (npc.estaVivo()) {
            const contra = Math.floor(Math.random() * 15) + 5;
            // Aquí haríamos daño al jugador si tuviera HP
            this.renderer.printLog(`<span class="npc-name">${npc.name}</span> contraataca!`);
        }
    }

    // ============================================================
    // COMANDOS ESPECIALES
    // ============================================================
    
    cmdInvocar(args) {
        this.renderer.printLog('🔮 Intentas invocar poderes del multiverso... nada sucede (aún).');
    }

    cmdTeleport(destino) {
        if (!destino) {
            this.renderer.printLog('Usa: teletransportar [id_habitación]', 'warning');
            return;
        }
        
        if (!this.roomsDB[destino]) {
            this.renderer.printLog('Destino desconocido.', 'warning');
            return;
        }
        
        this.gameState.moveTo(destino);
        this.renderer.printLog(`<span class="system-msg">✨ Te teletransportas a ${destino}</span>`);
        this.cmdMirar();
    }

    // ============================================================
    // UTILIDADES
    // ============================================================
    
    findNPCInRoom(name) {
        const normalized = name.toLowerCase().trim();
        return Object.values(this.npcsDB).find(n => 
            n.room === this.gameState.currentRoom && 
            (n.id === normalized || n.name.toLowerCase().includes(normalized))
        );
    }

    generarDialogo(npc, afecto) {
        const dialogos = {
            bajo: [
                "¿Sí? ¿Qué quieres?",
                "No estoy interesado en hablar.",
                "Dime rápido, tengo cosas que hacer.",
                "...",
                "¿Nos conocemos?"
            ],
            medio: [
                "Hola. ¿Cómo estás?",
                "¿Qué tal tu día?",
                "Me alegra verte.",
                "¿Necesitas algo?",
                "Cuéntame algo interesante."
            ],
            alto: [
                "¡Me alegra mucho verte!",
                "He estado pensando en ti...",
                "¿Quieres pasar tiempo juntos?",
                "Eres especial para mí.",
                "Me haces sonreír."
            ]
        };
        
        const categoria = afecto >= 65 ? 'alto' : afecto >= 40 ? 'medio' : 'bajo';
        const opciones = dialogos[categoria];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }

    checkRoomEvents(roomId) {
        // Eventos especiales por habitación
        if (roomId === 'universo_hazbin_helluva' && !this.gameState.getFlag('visited_hell')) {
            this.gameState.setFlag('visited_hell', true);
            this.renderer.printLog('<span class="system-msg" style="color: var(--red);">🔥 Bienvenido al Infierno. Ten cuidado con tus deseos...</span>');
        }
    }
}
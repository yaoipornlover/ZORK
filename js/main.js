// ============================================================================
// main.js - Punto de entrada de la aplicación
// ============================================================================

import { CONFIG } from './config.js';
import { sfx } from './audio.js';
import { Personaje } from './engine/personaje.js';
import { SimsEngine } from './engine/simsEngine.js';
import { GameState } from './engine/gameState.js';
import { Renderer } from './ui/renderer.js';
import { TerminalUI } from './ui/terminal.js';
import { CommandHandler } from './ui/commands.js';

// Importar bases de datos
import { rawNpcsDB, initializeNPCs, npcInstances } from './database/npcs.js';
import { itemsDB } from './database/items.js';
import { roomsDB } from './database/rooms.js';

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

class Game {
    constructor() {
        this.initialized = false;
    }

    async init() {
        console.log('🎮 Iniciando ZORK Multiverse...');
        
        // Inicializar sistemas
        this.gameState = new GameState();
        this.simsEngine = new SimsEngine();
        this.renderer = new Renderer();
        this.terminal = new TerminalUI();
        
        // Inicializar NPCs
        initializeNPCs();
        
        // Conectar NPCs al motor Sims
        this.npcsDB = npcInstances;
        this.simsEngine.init(this.npcsDB);
        
        // Inicializar comandos
        this.commands = new CommandHandler(
            this.gameState,
            this.npcsDB,
            roomsDB,
            itemsDB,
            this.simsEngine,
            this.renderer,
            sfx
        );

        // Configurar input
        this.setupInput();
        
        // Pantalla de inicio
        this.showBootSequence();
        
        this.initialized = true;
        console.log('✅ Juego inicializado correctamente');
    }

    setupInput() {
        const input = document.getElementById('cmd-input');
        if (!input) {
            console.error('No se encontró el input de comandos');
            return;
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    // Mostrar eco del comando
                    this.renderer.printLog(`
                        <div class="cmd-echo">
                            <span class="user">player</span>@<span class="host">zork-palace</span>:<span class="path">~/nexus</span>$ ${command}
                        </div>
                    `);
                    
                    // Ejecutar
                    this.commands.execute(command);
                    
                    // Limpiar input
                    this.terminal.clearInput();
                    
                    // Actualizar stats
                    this.renderer.updateStats(this.gameState, this.simsEngine);
                }
            }
        });

        // Botones rápidos
        window.execQuick = (cmd) => {
            this.commands.execute(cmd);
        };
        
        window.execQuickSims = () => {
            this.terminal.toggleDrawer(true);
        };
        
        window.toggleSimsDrawer = (show) => {
            this.terminal.toggleDrawer(show);
        };
    }

    showBootSequence() {
        const bootText = [
            'ZORK MULTIVERSE NEXUS v' + CONFIG.VERSION,
            'Inicializando conexiones multiversales...',
            'Cargando personajes: ' + Object.keys(this.npcsDB).length + ' entidades',
            'Sistemas de romance: ONLINE',
            'Motor de combate: STANDBY',
            'Audio chiptune: READY',
            '----------------------------------------',
            'Bienvenido al Palacio de los Deseos.',
            'Escribe "ayuda" para comenzar.',
            ''
        ];

        let delay = 0;
        bootText.forEach((line, i) => {
            setTimeout(() => {
                this.renderer.printLog(`<span class="system-msg">${line}</span>`);
            }, delay);
            delay += i < 3 ? 300 : 100;
        });

        // Mostrar habitación inicial después del boot
        setTimeout(() => {
            this.commands.execute('mirar');
        }, delay + 500);
    }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
    
    // Exponer para debugging
    window.game = game;
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silenciar error
    });
}
// ============================================================================
// terminal.js - Gestión de la interfaz de terminal
// ============================================================================

export class TerminalUI {
    constructor() {
        this.terminal = document.getElementById('terminal-body');
        this.input = document.getElementById('cmd-input');
        this.drawer = document.getElementById('sims-drawer');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Focus automático
        document.addEventListener('click', () => {
            if (this.input && document.activeElement !== this.input) {
                this.input.focus();
            }
        });

        // Historial con flechas
        if (this.input) {
            this.history = [];
            this.historyIndex = -1;
            
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                        this.input.value = this.history[this.history.length - 1 - this.historyIndex] || '';
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                        this.input.value = this.history[this.history.length - 1 - this.historyIndex] || '';
                    } else {
                        this.historyIndex = -1;
                        this.input.value = '';
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    this.autocomplete();
                }
            });
        }
    }

    printLog(html, type = '') {
        if (!this.terminal) return;
        
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = html;
        entry.style.animation = 'fadeIn 0.2s ease-out';
        
        this.terminal.appendChild(entry);
        this.terminal.scrollTop = this.terminal.scrollHeight;
        
        // Limitar entradas para performance
        while (this.terminal.children.length > 100) {
            this.terminal.removeChild(this.terminal.firstChild);
        }
    }

    clearTerminal() {
        if (this.terminal) {
            this.terminal.innerHTML = '';
        }
    }

    getInput() {
        return this.input?.value || '';
    }

    clearInput() {
        if (this.input) {
            this.history.push(this.input.value);
            if (this.history.length > 50) this.history.shift();
            this.historyIndex = -1;
            this.input.value = '';
        }
    }

    autocomplete() {
        // Implementación básica de autocompletado
        const val = this.input.value.toLowerCase();
        if (!val) return;
        
        const comandos = ['mirar', 'ir', 'hablar', 'abrazar', 'besar', 'stats', 'ayuda', 'inventario'];
        const match = comandos.find(c => c.startsWith(val));
        if (match) {
            this.input.value = match + ' ';
        }
    }

    // Drawer (panel lateral)
    toggleDrawer(show) {
        if (!this.drawer) return;
        if (show) {
            this.drawer.classList.add('active');
        } else {
            this.drawer.classList.remove('active');
        }
    }

    updateDrawer(npc, simsEngine) {
        if (!npc) {
            this.toggleDrawer(false);
            return;
        }

        const afecto = simsEngine.getAffection(npc.id);
        const romance = simsEngine.getRomance(npc.id);
        
        // Actualizar elementos
        const updateEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        updateEl('drawer-npc-name', npc.name);
        updateEl('drawer-mental', npc.simsData?.mentalState || 'Neutral');
        updateEl('drawer-rel', `${afecto} / 100`);
        updateEl('drawer-romance', `${romance} / 100`);
        updateEl('drawer-outfit', npc.simsData?.outfit || 'Casual');
        updateEl('drawer-location', npc.room);
        updateEl('drawer-likes', (npc.simsData?.likes || []).join(', '));
        updateEl('drawer-dislikes', (npc.simsData?.dislikes || []).join(', '));
        updateEl('drawer-fetiches', (npc.simsData?.fetiches || []).join(', ') || 'Desconocido');
        
        // Stats RPG
        updateEl('drawer-hp', `${npc.hp}/${npc.hpMax}`);
        updateEl('drawer-fuerza', npc.fuerza);
        updateEl('drawer-defensa', npc.defensa);
        updateEl('drawer-mana', `${npc.mana}/${npc.manaMax}`);
        updateEl('drawer-alineacion', npc.alineacion);

        // Barra de progreso
        const barra = document.getElementById('drawer-progress');
        if (barra) {
            const lleno = Math.floor(afecto / 10);
            barra.textContent = '█'.repeat(lleno) + '░'.repeat(10 - lleno);
        }

        // Avatar
        const fallback = document.getElementById('avatar-fallback');
        const img = document.getElementById('avatar-img');
        if (fallback) fallback.textContent = npc.name.charAt(0).toUpperCase();
        if (img) {
            img.src = `assets/avatars/${npc.id}.png`;
            img.onerror = () => {
                img.style.display = 'none';
                if (fallback) fallback.style.display = 'flex';
            };
            img.onload = () => {
                img.style.display = 'block';
                if (fallback) fallback.style.display = 'none';
            };
        }

        this.toggleDrawer(true);
    }
}
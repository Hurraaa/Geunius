/**
 * Level Editor - Admin panel for visual level editing.
 * Drag-drop elements, edit properties, export JSON.
 */

const GAME_WIDTH = 600;
const GAME_HEIGHT = 560;
const GRID_SIZE = 10;

// Element type definitions with default properties
const ELEMENT_TYPES = {
  pet: {
    label: 'Pet',
    icon: '🐵',
    color: '#8B6914',
    defaults: { type: 'punch', x: 300, y: 200 },
    fields: [
      { key: 'type', label: 'Tur', type: 'select', options: ['punch', 'mini', 'jumbo'] },
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
    ],
    getRect: (el) => ({ x: el.x - 18, y: el.y - 18, w: 36, h: 36 }),
  },
  platform: {
    label: 'Platform',
    icon: '▬',
    color: '#8D6E63',
    defaults: { x: 300, y: 300, width: 100, height: 20, angle: 0 },
    fields: [
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 10, max: 600 },
      { key: 'height', label: 'Yukseklik', type: 'number', min: 5, max: 200 },
      { key: 'angle', label: 'Aci (derece)', type: 'number', min: -90, max: 90 },
    ],
    getRect: (el) => ({ x: el.x - el.width / 2, y: el.y - el.height / 2, w: el.width, h: el.height }),
  },
  hazard: {
    label: 'Tehlike',
    icon: '🔥',
    color: '#E74C3C',
    defaults: { type: 'fire', x: 300, y: 500, width: 200, height: 30 },
    fields: [
      { key: 'type', label: 'Tur', type: 'select', options: ['fire', 'lava', 'spikes', 'water'] },
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 10, max: 600 },
      { key: 'height', label: 'Yukseklik', type: 'number', min: 10, max: 200 },
    ],
    getRect: (el) => ({ x: el.x - el.width / 2, y: el.y - (el.height || 30) / 2, w: el.width, h: el.height || 30 }),
  },
  spawner: {
    label: 'Spawner',
    icon: '👾',
    color: '#9B59B6',
    defaults: { x: 300, y: 50, count: 3, interval: 2000, delay: 1000, speed: 2 },
    fields: [
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'count', label: 'Dusma Sayisi', type: 'number', min: 1, max: 20 },
      { key: 'interval', label: 'Aralik (ms)', type: 'number', min: 500, max: 10000 },
      { key: 'delay', label: 'Gecikme (ms)', type: 'number', min: 0, max: 10000 },
      { key: 'speed', label: 'Hiz', type: 'number', min: 0.5, max: 10, step: 0.1 },
      { key: 'radius', label: 'Yaricap', type: 'number', min: 5, max: 30 },
    ],
    getRect: (el) => ({ x: el.x - 15, y: el.y - 15, w: 30, h: 30 }),
  },
  trampoline: {
    label: 'Trambolin',
    icon: '🔄',
    color: '#2ECC71',
    defaults: { x: 300, y: 480, width: 100, force: 0.07 },
    fields: [
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 30, max: 300 },
      { key: 'force', label: 'Kuvvet', type: 'number', min: 0.01, max: 0.2, step: 0.01 },
    ],
    getRect: (el) => ({ x: el.x - (el.width || 100) / 2, y: el.y - 8, w: el.width || 100, h: 16 }),
  },
  portal: {
    label: 'Portal',
    icon: '🌀',
    color: '#9B59B6',
    defaults: { ax: 100, ay: 200, bx: 500, by: 400, color: '#9B59B6' },
    fields: [
      { key: 'ax', label: 'A - X', type: 'number', min: 0, max: 600 },
      { key: 'ay', label: 'A - Y', type: 'number', min: 0, max: 560 },
      { key: 'bx', label: 'B - X', type: 'number', min: 0, max: 600 },
      { key: 'by', label: 'B - Y', type: 'number', min: 0, max: 560 },
      { key: 'color', label: 'Renk', type: 'color' },
    ],
    // Portal has two circles - we handle hit testing separately
    getRect: (el) => ({ x: el.ax - 22, y: el.ay - 22, w: 44, h: 44 }),
    getRect2: (el) => ({ x: el.bx - 22, y: el.by - 22, w: 44, h: 44 }),
  },
  fan: {
    label: 'Fan',
    icon: '💨',
    color: '#3498DB',
    defaults: { x: 100, y: 300, width: 60, height: 200, direction: 'right', strength: 0.003 },
    fields: [
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 20, max: 300 },
      { key: 'height', label: 'Yukseklik', type: 'number', min: 20, max: 560 },
      { key: 'direction', label: 'Yon', type: 'select', options: ['up', 'down', 'left', 'right'] },
      { key: 'strength', label: 'Guc', type: 'number', min: 0.001, max: 0.01, step: 0.001 },
    ],
    getRect: (el) => ({ x: el.x - el.width / 2, y: el.y - el.height / 2, w: el.width, h: el.height }),
  },
  movingPlatform: {
    label: 'Hareketli Platform',
    icon: '↔',
    color: '#E67E22',
    defaults: { x1: 150, y1: 380, x2: 450, y2: 380, width: 90, speed: 0.0008 },
    fields: [
      { key: 'x1', label: 'Baslangic X', type: 'number', min: 0, max: 600 },
      { key: 'y1', label: 'Baslangic Y', type: 'number', min: 0, max: 560 },
      { key: 'x2', label: 'Bitis X', type: 'number', min: 0, max: 600 },
      { key: 'y2', label: 'Bitis Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 20, max: 300 },
      { key: 'speed', label: 'Hiz', type: 'number', min: 0.0001, max: 0.005, step: 0.0001 },
    ],
    getRect: (el) => ({ x: el.x1 - (el.width || 90) / 2, y: el.y1 - 10, w: el.width || 90, h: 20 }),
    getRect2: (el) => ({ x: el.x2 - (el.width || 90) / 2, y: el.y2 - 10, w: el.width || 90, h: 20 }),
  },
  gravityZone: {
    label: 'Yercekimi Bolgesi',
    icon: '⬆',
    color: '#1ABC9C',
    defaults: { x: 300, y: 300, width: 200, height: 200, type: 'reverse' },
    fields: [
      { key: 'type', label: 'Tur', type: 'select', options: ['reverse', 'zero', 'strong', 'left', 'right'] },
      { key: 'x', label: 'X', type: 'number', min: 0, max: 600 },
      { key: 'y', label: 'Y', type: 'number', min: 0, max: 560 },
      { key: 'width', label: 'Genislik', type: 'number', min: 20, max: 600 },
      { key: 'height', label: 'Yukseklik', type: 'number', min: 20, max: 560 },
    ],
    getRect: (el) => ({ x: el.x - el.width / 2, y: el.y - el.height / 2, w: el.width, h: el.height }),
  },
};

// Map element type to array key in level data
const TYPE_TO_ARRAY_KEY = {
  pet: 'pets',
  platform: 'platforms',
  hazard: 'hazards',
  spawner: 'spawners',
  trampoline: 'trampolines',
  portal: 'portals',
  fan: 'fans',
  movingPlatform: 'movingPlatforms',
  gravityZone: 'gravityZones',
};

const EDITOR_SAVE_KEY = 'geunius_editor_levels';

export class LevelEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Level metadata
    this.levelMeta = {
      id: 1,
      world: 1,
      name: 'Yeni Bolum',
      inkLimit: 500,
      surviveTime: 10,
      hints: [''],
      stars: { one: 500, two: 300, three: 150 },
    };

    // All elements in the level (each has _type and _id)
    this.elements = [];
    this._nextId = 1;

    // Editor state
    this.selectedElement = null;
    this.dragElement = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.dragTarget = null; // 'main' or 'secondary' for portal/movingPlatform
    this.showGrid = true;
    this.snapToGrid = true;
    this.gridSize = GRID_SIZE;

    // Saved levels list
    this.savedLevels = this._loadSavedLevels();
    this.currentSaveSlot = null;

    // HTML panel
    this._panel = null;
    this._createPanel();

    // Event handlers
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  activate() {
    this.canvas.addEventListener('mousedown', this._onMouseDown);
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('mouseup', this._onMouseUp);
    this.canvas.addEventListener('touchstart', this._onTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this._onMouseDown({ clientX: t.clientX, clientY: t.clientY, button: 0 });
    }, { passive: false });
    this.canvas.addEventListener('touchmove', this._onTouchMove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this._onMouseMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: false });
    this.canvas.addEventListener('touchend', this._onTouchEnd = (e) => {
      this._onMouseUp({});
    });
    document.addEventListener('keydown', this._onKeyDown);
    if (this._panel) this._panel.style.display = 'flex';
    this._updatePanel();
  }

  deactivate() {
    this.canvas.removeEventListener('mousedown', this._onMouseDown);
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('mouseup', this._onMouseUp);
    if (this._onTouchStart) this.canvas.removeEventListener('touchstart', this._onTouchStart);
    if (this._onTouchMove) this.canvas.removeEventListener('touchmove', this._onTouchMove);
    if (this._onTouchEnd) this.canvas.removeEventListener('touchend', this._onTouchEnd);
    document.removeEventListener('keydown', this._onKeyDown);
    if (this._panel) this._panel.style.display = 'none';
  }

  // ── PANEL CREATION ─────────────────────────────────

  _createPanel() {
    // Remove existing panel if any
    const existing = document.getElementById('level-editor-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'level-editor-panel';
    panel.style.cssText = `
      position: fixed; top: 0; right: 0; width: 320px; height: 100vh;
      background: #1a1a2e; color: #eee; font-family: Arial, sans-serif;
      font-size: 12px; overflow-y: auto; z-index: 1000;
      display: none; flex-direction: column; border-left: 2px solid #333;
      user-select: text;
    `;
    document.body.appendChild(panel);
    this._panel = panel;
  }

  _updatePanel() {
    if (!this._panel) return;

    const sel = this.selectedElement;
    const typeDef = sel ? ELEMENT_TYPES[sel._type] : null;

    let html = `
      <div style="padding:8px; background:#16213e; border-bottom:1px solid #333;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:16px; font-weight:bold;">Level Editor</span>
          <button onclick="window._editorBack()" style="background:#E74C3C; color:#fff; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:11px;">Geri</button>
        </div>
        <div style="display:flex; gap:4px; flex-wrap:wrap;">
          <button onclick="window._editorToggleGrid()" style="${this._btnStyle('#546E7A')}">${this.showGrid ? 'Grid: ON' : 'Grid: OFF'}</button>
          <button onclick="window._editorToggleSnap()" style="${this._btnStyle('#546E7A')}">${this.snapToGrid ? 'Snap: ON' : 'Snap: OFF'}</button>
        </div>
      </div>

      <!-- Level Meta -->
      <div style="padding:8px; border-bottom:1px solid #333;">
        <div style="font-weight:bold; margin-bottom:6px; color:#F1C40F;">Bolum Bilgileri</div>
        <div style="display:grid; grid-template-columns:80px 1fr; gap:4px; align-items:center;">
          <label>ID:</label><input type="number" value="${this.levelMeta.id}" onchange="window._editorMetaChange('id', +this.value)" style="${this._inputStyle()}">
          <label>Dunya:</label><input type="number" value="${this.levelMeta.world}" onchange="window._editorMetaChange('world', +this.value)" style="${this._inputStyle()}">
          <label>Isim:</label><input type="text" value="${this.levelMeta.name}" onchange="window._editorMetaChange('name', this.value)" style="${this._inputStyle()}">
          <label>Ink Limit:</label><input type="number" value="${this.levelMeta.inkLimit}" onchange="window._editorMetaChange('inkLimit', +this.value)" style="${this._inputStyle()}">
          <label>Sure (s):</label><input type="number" value="${this.levelMeta.surviveTime}" onchange="window._editorMetaChange('surviveTime', +this.value)" style="${this._inputStyle()}">
          <label>Ipucu:</label><input type="text" value="${this.levelMeta.hints[0] || ''}" onchange="window._editorMetaChange('hints', [this.value])" style="${this._inputStyle()}">
          <label>1 Yildiz:</label><input type="number" value="${this.levelMeta.stars.one}" onchange="window._editorStarChange('one', +this.value)" style="${this._inputStyle()}">
          <label>2 Yildiz:</label><input type="number" value="${this.levelMeta.stars.two}" onchange="window._editorStarChange('two', +this.value)" style="${this._inputStyle()}">
          <label>3 Yildiz:</label><input type="number" value="${this.levelMeta.stars.three}" onchange="window._editorStarChange('three', +this.value)" style="${this._inputStyle()}">
        </div>
      </div>

      <!-- Add Elements -->
      <div style="padding:8px; border-bottom:1px solid #333;">
        <div style="font-weight:bold; margin-bottom:6px; color:#3498DB;">Element Ekle</div>
        <div style="display:flex; gap:4px; flex-wrap:wrap;">
    `;

    for (const [type, def] of Object.entries(ELEMENT_TYPES)) {
      html += `<button onclick="window._editorAddElement('${type}')" style="${this._btnStyle(def.color)}" title="${def.label}">${def.icon} ${def.label}</button>`;
    }

    html += `
        </div>
      </div>

      <!-- Element List -->
      <div style="padding:8px; border-bottom:1px solid #333;">
        <div style="font-weight:bold; margin-bottom:6px; color:#2ECC71;">Elementler (${this.elements.length})</div>
        <div style="max-height:150px; overflow-y:auto;">
    `;

    for (const el of this.elements) {
      const def = ELEMENT_TYPES[el._type];
      const isSelected = sel && sel._id === el._id;
      const bg = isSelected ? '#2C3E50' : 'transparent';
      const name = this._elementLabel(el);
      html += `<div onclick="window._editorSelectById(${el._id})" style="padding:3px 6px; cursor:pointer; background:${bg}; border-radius:4px; display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
        <span>${def.icon} ${name}</span>
        <button onclick="event.stopPropagation(); window._editorDeleteById(${el._id})" style="background:#E74C3C; color:#fff; border:none; padding:1px 6px; border-radius:3px; cursor:pointer; font-size:10px;">X</button>
      </div>`;
    }

    html += `</div></div>`;

    // Selected element properties
    if (sel && typeDef) {
      html += `
        <div style="padding:8px; border-bottom:1px solid #333;">
          <div style="font-weight:bold; margin-bottom:6px; color:#E67E22;">${typeDef.icon} ${typeDef.label} Ozellikleri</div>
          <div style="display:grid; grid-template-columns:90px 1fr; gap:4px; align-items:center;">
      `;

      for (const field of typeDef.fields) {
        const val = sel[field.key];
        if (field.type === 'select') {
          html += `<label>${field.label}:</label><select onchange="window._editorFieldChange('${field.key}', this.value)" style="${this._inputStyle()}">`;
          for (const opt of field.options) {
            html += `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`;
          }
          html += `</select>`;
        } else if (field.type === 'color') {
          html += `<label>${field.label}:</label><input type="color" value="${val || '#9B59B6'}" onchange="window._editorFieldChange('${field.key}', this.value)" style="${this._inputStyle()}">`;
        } else {
          const step = field.step || (field.min < 1 ? 0.001 : 1);
          html += `<label>${field.label}:</label><input type="number" value="${val ?? ''}" step="${step}" min="${field.min ?? ''}" max="${field.max ?? ''}" onchange="window._editorFieldChange('${field.key}', +this.value)" style="${this._inputStyle()}">`;
        }
      }

      html += `
          </div>
          <button onclick="window._editorDuplicate()" style="${this._btnStyle('#8E44AD')}; width:100%; margin-top:6px;">Kopyala</button>
          <button onclick="window._editorDeleteSelected()" style="${this._btnStyle('#E74C3C')}; width:100%; margin-top:4px;">Sil</button>
        </div>
      `;
    }

    // Save / Load / Export
    html += `
      <div style="padding:8px; border-bottom:1px solid #333;">
        <div style="font-weight:bold; margin-bottom:6px; color:#F39C12;">Kaydet / Yukle</div>
        <div style="display:flex; gap:4px; margin-bottom:6px;">
          <button onclick="window._editorSave()" style="${this._btnStyle('#27AE60')}; flex:1;">Kaydet</button>
          <button onclick="window._editorExportJSON()" style="${this._btnStyle('#2980B9')}; flex:1;">JSON Kopyala</button>
        </div>
        <div style="margin-bottom:4px;">
          <button onclick="window._editorImportJSON()" style="${this._btnStyle('#8E44AD')}; width:100%;">JSON Yapistir (Import)</button>
        </div>
        <div style="margin-bottom:4px;">
          <select id="editor-load-select" style="${this._inputStyle()}; width:100%;">
            <option value="">-- Kayitli Bolum Sec --</option>
    `;

    for (let i = 0; i < this.savedLevels.length; i++) {
      const sl = this.savedLevels[i];
      const selected = this.currentSaveSlot === i ? 'selected' : '';
      html += `<option value="${i}" ${selected}>${sl.meta.name} (D${sl.meta.world}-B${sl.meta.id})</option>`;
    }

    html += `
          </select>
        </div>
        <div style="display:flex; gap:4px;">
          <button onclick="window._editorLoadSlot()" style="${this._btnStyle('#2980B9')}; flex:1;">Yukle</button>
          <button onclick="window._editorDeleteSlot()" style="${this._btnStyle('#E74C3C')}; flex:1;">Sil</button>
        </div>
      </div>

      <!-- Load from game levels -->
      <div style="padding:8px;">
        <div style="font-weight:bold; margin-bottom:6px; color:#1ABC9C;">Oyun Bolumlerinden Yukle</div>
        <div style="display:flex; gap:4px;">
          <select id="editor-game-world" style="${this._inputStyle()}; flex:1;">
            <option value="0">Dunya 1</option>
            <option value="1">Dunya 2</option>
            <option value="2">Dunya 3</option>
            <option value="3">Dunya 4</option>
          </select>
          <input id="editor-game-level" type="number" value="1" min="1" max="15" style="${this._inputStyle()}; width:50px;" placeholder="Bolum">
          <button onclick="window._editorLoadFromGame()" style="${this._btnStyle('#1ABC9C')};">Yukle</button>
        </div>
      </div>
    `;

    this._panel.innerHTML = html;
    this._registerCallbacks();
  }

  _btnStyle(bg) {
    return `background:${bg}; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:11px`;
  }

  _inputStyle() {
    return `background:#2C3E50; color:#eee; border:1px solid #444; padding:3px 6px; border-radius:3px; font-size:11px; width:100%`;
  }

  _registerCallbacks() {
    window._editorBack = () => { if (this.onBack) this.onBack(); };
    window._editorToggleGrid = () => { this.showGrid = !this.showGrid; this._updatePanel(); };
    window._editorToggleSnap = () => { this.snapToGrid = !this.snapToGrid; this._updatePanel(); };

    window._editorMetaChange = (key, val) => { this.levelMeta[key] = val; };
    window._editorStarChange = (key, val) => { this.levelMeta.stars[key] = val; };

    window._editorAddElement = (type) => { this._addElement(type); };
    window._editorSelectById = (id) => {
      this.selectedElement = this.elements.find(e => e._id === id) || null;
      this._updatePanel();
    };
    window._editorDeleteById = (id) => {
      this.elements = this.elements.filter(e => e._id !== id);
      if (this.selectedElement && this.selectedElement._id === id) this.selectedElement = null;
      this._updatePanel();
    };

    window._editorFieldChange = (key, val) => {
      if (this.selectedElement) {
        this.selectedElement[key] = val;
        this._updatePanel();
      }
    };

    window._editorDuplicate = () => {
      if (this.selectedElement) {
        const copy = { ...this.selectedElement, _id: this._nextId++ };
        // Offset the copy slightly
        if ('x' in copy) copy.x += 30;
        if ('y' in copy) copy.y += 30;
        if ('ax' in copy) { copy.ax += 30; copy.ay += 30; copy.bx += 30; copy.by += 30; }
        if ('x1' in copy) { copy.x1 += 30; copy.y1 += 30; copy.x2 += 30; copy.y2 += 30; }
        this.elements.push(copy);
        this.selectedElement = copy;
        this._updatePanel();
      }
    };

    window._editorDeleteSelected = () => {
      if (this.selectedElement) {
        this.elements = this.elements.filter(e => e._id !== this.selectedElement._id);
        this.selectedElement = null;
        this._updatePanel();
      }
    };

    window._editorSave = () => { this._saveLevel(); };
    window._editorExportJSON = () => { this._exportJSON(); };
    window._editorImportJSON = () => { this._importJSON(); };

    window._editorLoadSlot = () => {
      const select = document.getElementById('editor-load-select');
      if (select && select.value !== '') {
        const idx = parseInt(select.value);
        this._loadFromSlot(idx);
      }
    };

    window._editorDeleteSlot = () => {
      const select = document.getElementById('editor-load-select');
      if (select && select.value !== '') {
        const idx = parseInt(select.value);
        this.savedLevels.splice(idx, 1);
        this._saveLevelsList();
        this.currentSaveSlot = null;
        this._updatePanel();
      }
    };

    window._editorLoadFromGame = () => {
      const worldSelect = document.getElementById('editor-game-world');
      const levelInput = document.getElementById('editor-game-level');
      if (worldSelect && levelInput) {
        const worldIdx = parseInt(worldSelect.value);
        const levelIdx = parseInt(levelInput.value) - 1;
        if (this.onLoadFromGame) {
          this.onLoadFromGame(worldIdx, levelIdx);
        }
      }
    };
  }

  // ── ELEMENT MANAGEMENT ─────────────────────────────

  _addElement(type) {
    const def = ELEMENT_TYPES[type];
    const el = { ...def.defaults, _type: type, _id: this._nextId++ };
    this.elements.push(el);
    this.selectedElement = el;
    this._updatePanel();
  }

  _elementLabel(el) {
    const def = ELEMENT_TYPES[el._type];
    if (el._type === 'pet') return `${def.label} (${el.type})`;
    if (el._type === 'hazard') return `${def.label} (${el.type})`;
    if (el._type === 'fan') return `${def.label} (${el.direction})`;
    if (el._type === 'gravityZone') return `${def.label} (${el.type})`;
    return def.label;
  }

  // ── CANVAS RENDERING ───────────────────────────────

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Background
    ctx.fillStyle = '#E8F5E9';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Grid
    if (this.showGrid) {
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= GAME_WIDTH; x += this.gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y <= GAME_HEIGHT; y += this.gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH, y);
        ctx.stroke();
      }
      // Major grid lines every 50px
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= GAME_WIDTH; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y <= GAME_HEIGHT; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH, y);
        ctx.stroke();
      }
    }

    // Render elements (back to front like the game does)
    const renderOrder = ['gravityZone', 'fan', 'portal', 'hazard', 'platform', 'movingPlatform', 'trampoline', 'spawner', 'pet'];
    for (const type of renderOrder) {
      for (const el of this.elements) {
        if (el._type === type) this._renderElement(el);
      }
    }

    // Selection highlight
    if (this.selectedElement) {
      this._renderSelection(this.selectedElement);
    }

    // Coordinates display at top
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, GAME_WIDTH, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`LEVEL EDITOR - ${this.levelMeta.name} (D${this.levelMeta.world}-B${this.levelMeta.id})`, 10, 18);
    ctx.textAlign = 'right';
    ctx.font = '11px Arial';
    ctx.fillText(`Elements: ${this.elements.length} | Ink: ${this.levelMeta.inkLimit} | Sure: ${this.levelMeta.surviveTime}s`, GAME_WIDTH - 10, 18);
  }

  _renderElement(el) {
    const ctx = this.ctx;
    const def = ELEMENT_TYPES[el._type];

    switch (el._type) {
      case 'pet': {
        const r = el.type === 'jumbo' ? 22 : el.type === 'mini' ? 14 : 18;
        // Body
        ctx.fillStyle = '#8B6914';
        ctx.beginPath();
        ctx.arc(el.x, el.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#6B4F10';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Face
        ctx.fillStyle = '#FDDBB0';
        ctx.beginPath();
        ctx.ellipse(el.x, el.y + r * 0.12, r * 0.6, r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(el.x - r * 0.25, el.y - r * 0.1, 2.5, 0, Math.PI * 2);
        ctx.arc(el.x + r * 0.25, el.y - r * 0.1, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(el.type, el.x, el.y + r + 12);
        break;
      }

      case 'platform': {
        ctx.save();
        ctx.translate(el.x, el.y);
        if (el.angle) ctx.rotate(el.angle * Math.PI / 180);
        ctx.fillStyle = '#8D6E63';
        ctx.fillRect(-el.width / 2, -el.height / 2, el.width, el.height);
        ctx.strokeStyle = '#5D4037';
        ctx.lineWidth = 1;
        ctx.strokeRect(-el.width / 2, -el.height / 2, el.width, el.height);
        ctx.restore();
        break;
      }

      case 'hazard': {
        const h = el.height || 30;
        const colors = { fire: '#E74C3C', lava: '#D35400', spikes: '#E67E22', water: '#3498DB' };
        const icons = { fire: '🔥', lava: '🌋', spikes: '▲', water: '💧' };
        ctx.fillStyle = colors[el.type] || '#E74C3C';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(el.x - el.width / 2, el.y - h / 2, el.width, h);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colors[el.type] || '#E74C3C';
        ctx.lineWidth = 2;
        ctx.strokeRect(el.x - el.width / 2, el.y - h / 2, el.width, h);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(icons[el.type] || '!', el.x, el.y + 5);
        break;
      }

      case 'spawner': {
        ctx.fillStyle = 'rgba(155,89,182,0.3)';
        ctx.beginPath();
        ctx.arc(el.x, el.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#9B59B6';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('👾', el.x, el.y + 5);
        ctx.font = '9px Arial';
        ctx.fillStyle = '#9B59B6';
        ctx.fillText(`x${el.count}`, el.x, el.y + 24);
        break;
      }

      case 'trampoline': {
        const w = el.width || 100;
        ctx.fillStyle = el.color || '#2ECC71';
        ctx.fillRect(el.x - w / 2, el.y - 6, w, 12);
        ctx.strokeStyle = '#27AE60';
        ctx.lineWidth = 2;
        ctx.strokeRect(el.x - w / 2, el.y - 6, w, 12);
        // Spring legs
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        const legY = el.y + 6;
        for (let lx = el.x - w / 2 + 10; lx < el.x + w / 2; lx += 20) {
          ctx.beginPath();
          ctx.moveTo(lx, legY);
          ctx.lineTo(lx + 5, legY + 8);
          ctx.lineTo(lx + 10, legY);
          ctx.stroke();
        }
        break;
      }

      case 'portal': {
        const r = 22;
        // Portal A
        ctx.fillStyle = el.color || '#9B59B6';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(el.ax, el.ay, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = el.color || '#9B59B6';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('A', el.ax, el.ay + 4);

        // Portal B
        ctx.fillStyle = el.color || '#9B59B6';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(el.bx, el.by, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = el.color || '#9B59B6';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fillText('B', el.bx, el.by + 4);

        // Connection line
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = el.color || '#9B59B6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(el.ax, el.ay);
        ctx.lineTo(el.bx, el.by);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }

      case 'fan': {
        ctx.fillStyle = 'rgba(52,152,219,0.2)';
        ctx.fillRect(el.x - el.width / 2, el.y - el.height / 2, el.width, el.height);
        ctx.strokeStyle = '#3498DB';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(el.x - el.width / 2, el.y - el.height / 2, el.width, el.height);
        ctx.setLineDash([]);

        // Direction arrow
        const arrows = { up: '↑', down: '↓', left: '←', right: '→' };
        ctx.fillStyle = '#3498DB';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(arrows[el.direction] || '→', el.x, el.y + 6);
        ctx.font = '9px Arial';
        ctx.fillText(`${el.strength}`, el.x, el.y + 20);
        break;
      }

      case 'movingPlatform': {
        const w = el.width || 90;
        // Path line
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#E67E22';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x2, el.y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Start position
        ctx.fillStyle = '#E67E22';
        ctx.fillRect(el.x1 - w / 2, el.y1 - 8, w, 16);
        ctx.strokeStyle = '#D35400';
        ctx.lineWidth = 1;
        ctx.strokeRect(el.x1 - w / 2, el.y1 - 8, w, 16);
        ctx.fillStyle = '#fff';
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('S', el.x1, el.y1 + 3);

        // End position (ghost)
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#E67E22';
        ctx.fillRect(el.x2 - w / 2, el.y2 - 8, w, 16);
        ctx.strokeRect(el.x2 - w / 2, el.y2 - 8, w, 16);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.fillText('E', el.x2, el.y2 + 3);
        break;
      }

      case 'gravityZone': {
        const colors = { reverse: '#1ABC9C', zero: '#95A5A6', strong: '#E74C3C', left: '#3498DB', right: '#E67E22' };
        const icons = { reverse: '↑↑', zero: '~', strong: '↓↓', left: '←←', right: '→→' };
        ctx.fillStyle = colors[el.type] || '#1ABC9C';
        ctx.globalAlpha = 0.15;
        ctx.fillRect(el.x - el.width / 2, el.y - el.height / 2, el.width, el.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colors[el.type] || '#1ABC9C';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(el.x - el.width / 2, el.y - el.height / 2, el.width, el.height);
        ctx.setLineDash([]);
        ctx.fillStyle = colors[el.type] || '#1ABC9C';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(icons[el.type] || '?', el.x, el.y + 6);
        break;
      }
    }
  }

  _renderSelection(el) {
    const ctx = this.ctx;
    const def = ELEMENT_TYPES[el._type];

    const drawSelRect = (rect) => {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(rect.x - 3, rect.y - 3, rect.w + 6, rect.h + 6);
      ctx.setLineDash([]);

      // Corner handles
      const corners = [
        [rect.x - 3, rect.y - 3],
        [rect.x + rect.w + 3, rect.y - 3],
        [rect.x - 3, rect.y + rect.h + 3],
        [rect.x + rect.w + 3, rect.y + rect.h + 3],
      ];
      ctx.fillStyle = '#FFD700';
      for (const [cx, cy] of corners) {
        ctx.fillRect(cx - 3, cy - 3, 6, 6);
      }
    };

    const rect = def.getRect(el);
    drawSelRect(rect);

    // Secondary rect for portal B / movingPlatform end
    if (def.getRect2) {
      drawSelRect(def.getRect2(el));
    }

    // Position label
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    if ('x' in el && 'y' in el) {
      ctx.fillText(`(${Math.round(el.x)}, ${Math.round(el.y)})`, rect.x, rect.y - 8);
    } else if ('ax' in el) {
      ctx.fillText(`A(${Math.round(el.ax)}, ${Math.round(el.ay)})`, rect.x, rect.y - 8);
      const r2 = def.getRect2(el);
      ctx.fillText(`B(${Math.round(el.bx)}, ${Math.round(el.by)})`, r2.x, r2.y - 8);
    } else if ('x1' in el) {
      ctx.fillText(`S(${Math.round(el.x1)}, ${Math.round(el.y1)})`, rect.x, rect.y - 8);
      const r2 = def.getRect2(el);
      ctx.fillText(`E(${Math.round(el.x2)}, ${Math.round(el.y2)})`, r2.x, r2.y - 8);
    }
  }

  // ── INPUT HANDLING ─────────────────────────────────

  _getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  _snap(val) {
    if (!this.snapToGrid) return val;
    return Math.round(val / this.gridSize) * this.gridSize;
  }

  _hitTest(mx, my) {
    // Test in reverse render order (top elements first)
    const reverseOrder = ['pet', 'spawner', 'trampoline', 'movingPlatform', 'platform', 'hazard', 'portal', 'fan', 'gravityZone'];
    for (const type of reverseOrder) {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        const el = this.elements[i];
        if (el._type !== type) continue;
        const def = ELEMENT_TYPES[el._type];

        // Check secondary rect first for portal B / movingPlatform end
        if (def.getRect2) {
          const r2 = def.getRect2(el);
          if (mx >= r2.x && mx <= r2.x + r2.w && my >= r2.y && my <= r2.y + r2.h) {
            return { element: el, target: 'secondary' };
          }
        }

        const r = def.getRect(el);
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          return { element: el, target: 'main' };
        }
      }
    }
    return null;
  }

  _onMouseDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    const { x, y } = this._getCanvasPos(e);

    // Skip if click is in the top bar
    if (y < 28) return;

    const hit = this._hitTest(x, y);
    if (hit) {
      this.selectedElement = hit.element;
      this.dragElement = hit.element;
      this.dragTarget = hit.target;

      if (hit.target === 'secondary') {
        if ('bx' in hit.element) {
          this.dragOffsetX = x - hit.element.bx;
          this.dragOffsetY = y - hit.element.by;
        } else if ('x2' in hit.element) {
          this.dragOffsetX = x - hit.element.x2;
          this.dragOffsetY = y - hit.element.y2;
        }
      } else {
        if ('x' in hit.element) {
          this.dragOffsetX = x - hit.element.x;
          this.dragOffsetY = y - hit.element.y;
        } else if ('ax' in hit.element) {
          this.dragOffsetX = x - hit.element.ax;
          this.dragOffsetY = y - hit.element.ay;
        } else if ('x1' in hit.element) {
          this.dragOffsetX = x - hit.element.x1;
          this.dragOffsetY = y - hit.element.y1;
        }
      }
      this._updatePanel();
    } else {
      this.selectedElement = null;
      this.dragElement = null;
      this._updatePanel();
    }
  }

  _onMouseMove(e) {
    if (!this.dragElement) return;
    const { x, y } = this._getCanvasPos(e);
    const el = this.dragElement;
    const nx = this._snap(x - this.dragOffsetX);
    const ny = this._snap(y - this.dragOffsetY);

    if (this.dragTarget === 'secondary') {
      if ('bx' in el) { el.bx = nx; el.by = ny; }
      else if ('x2' in el) { el.x2 = nx; el.y2 = ny; }
    } else {
      if ('x' in el && 'y' in el) { el.x = nx; el.y = ny; }
      else if ('ax' in el) { el.ax = nx; el.ay = ny; }
      else if ('x1' in el) { el.x1 = nx; el.y1 = ny; }
    }
  }

  _onMouseUp() {
    if (this.dragElement) {
      this._updatePanel();
    }
    this.dragElement = null;
    this.dragTarget = null;
  }

  _onKeyDown(e) {
    // Delete selected element
    if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedElement) {
      // Don't delete if focus is on an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      this.elements = this.elements.filter(el => el._id !== this.selectedElement._id);
      this.selectedElement = null;
      this._updatePanel();
    }

    // Nudge with arrow keys
    if (this.selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      e.preventDefault();
      const step = e.shiftKey ? 1 : this.gridSize;
      const el = this.selectedElement;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;

      if ('x' in el) { el.x += dx; el.y += dy; }
      if ('ax' in el) { el.ax += dx; el.ay += dy; el.bx += dx; el.by += dy; }
      if ('x1' in el) { el.x1 += dx; el.y1 += dy; el.x2 += dx; el.y2 += dy; }
      this._updatePanel();
    }

    // Ctrl+C to copy JSON
    if (e.ctrlKey && e.key === 'c' && !e.target.closest('input, select, textarea')) {
      this._exportJSON();
    }
  }

  // ── SAVE / LOAD / EXPORT ───────────────────────────

  _toLevelData() {
    const data = {
      id: this.levelMeta.id,
      world: this.levelMeta.world,
      name: this.levelMeta.name,
      inkLimit: this.levelMeta.inkLimit,
      surviveTime: this.levelMeta.surviveTime,
      hints: this.levelMeta.hints.filter(h => h),
      stars: { ...this.levelMeta.stars },
      safeZone: null,
    };

    // Group elements by type and strip internal fields
    for (const [type, arrayKey] of Object.entries(TYPE_TO_ARRAY_KEY)) {
      const items = this.elements
        .filter(el => el._type === type)
        .map(el => {
          const copy = { ...el };
          delete copy._type;
          delete copy._id;
          return copy;
        });
      if (items.length > 0 || type === 'pet') {
        data[arrayKey] = items;
      }
    }

    return data;
  }

  _fromLevelData(data) {
    this.levelMeta = {
      id: data.id || 1,
      world: data.world || 1,
      name: data.name || 'Isimsiz',
      inkLimit: data.inkLimit || 500,
      surviveTime: data.surviveTime || 10,
      hints: data.hints || [''],
      stars: data.stars || { one: 500, two: 300, three: 150 },
    };

    this.elements = [];
    this._nextId = 1;

    for (const [type, arrayKey] of Object.entries(TYPE_TO_ARRAY_KEY)) {
      const items = data[arrayKey] || [];
      for (const item of items) {
        this.elements.push({ ...item, _type: type, _id: this._nextId++ });
      }
    }

    this.selectedElement = null;
    this._updatePanel();
  }

  _exportJSON() {
    const data = this._toLevelData();
    const json = JSON.stringify(data, null, 2);

    // Format for direct paste into world.js
    const formatted = this._formatAsCode(data);

    navigator.clipboard.writeText(formatted).then(() => {
      this._showToast('JSON panoya kopyalandi!');
    }).catch(() => {
      // Fallback: show in a prompt
      prompt('JSON (kopyala):', formatted);
    });
  }

  _formatAsCode(data) {
    let lines = ['  {'];
    lines.push(`    id: ${data.id},`);
    lines.push(`    world: ${data.world},`);
    lines.push(`    name: '${data.name}',`);
    lines.push(`    inkLimit: ${data.inkLimit},`);
    if (data.surviveTime !== 10) lines.push(`    surviveTime: ${data.surviveTime},`);

    // Pets
    if (data.pets && data.pets.length > 0) {
      if (data.pets.length === 1) {
        const p = data.pets[0];
        lines.push(`    pets: [{ type: '${p.type}', x: ${p.x}, y: ${p.y} }],`);
      } else {
        lines.push(`    pets: [`);
        for (const p of data.pets) {
          lines.push(`      { type: '${p.type}', x: ${p.x}, y: ${p.y} },`);
        }
        lines.push(`    ],`);
      }
    }

    // Arrays
    const arrayTypes = [
      { key: 'platforms', fields: ['x', 'y', 'width', 'height', 'angle'] },
      { key: 'hazards', fields: ['type', 'x', 'y', 'width', 'height'] },
      { key: 'spawners', fields: ['x', 'y', 'count', 'interval', 'delay', 'speed'] },
      { key: 'trampolines', fields: ['x', 'y', 'width', 'force'] },
      { key: 'portals', fields: ['ax', 'ay', 'bx', 'by', 'color'] },
      { key: 'fans', fields: ['x', 'y', 'width', 'height', 'direction', 'strength'] },
      { key: 'movingPlatforms', fields: ['x1', 'y1', 'x2', 'y2', 'width', 'speed'] },
      { key: 'gravityZones', fields: ['x', 'y', 'width', 'height', 'type'] },
    ];

    for (const { key, fields } of arrayTypes) {
      const arr = data[key];
      if (!arr || arr.length === 0) continue;

      lines.push(`    ${key}: [`);
      for (const item of arr) {
        const parts = fields.map(f => {
          const v = item[f];
          if (v === undefined || v === null) return null;
          return typeof v === 'string' ? `${f}: '${v}'` : `${f}: ${v}`;
        }).filter(Boolean);
        lines.push(`      { ${parts.join(', ')} },`);
      }
      lines.push(`    ],`);
    }

    lines.push(`    safeZone: null,`);

    if (data.hints && data.hints.length > 0 && data.hints[0]) {
      lines.push(`    hints: ['${data.hints[0]}'],`);
    }

    lines.push(`    stars: { one: ${data.stars.one}, two: ${data.stars.two}, three: ${data.stars.three} },`);
    lines.push(`  },`);

    return lines.join('\n');
  }

  _importJSON() {
    const input = prompt('Level JSON yapistir:');
    if (!input) return;

    try {
      // Try to parse as-is
      let data;
      try {
        data = JSON.parse(input);
      } catch {
        // Try wrapping in braces and fixing JS object notation
        const fixed = input
          .replace(/(\w+):/g, '"$1":')
          .replace(/'/g, '"')
          .replace(/,\s*([}\]])/g, '$1');
        data = JSON.parse(fixed);
      }
      this._fromLevelData(data);
      this._showToast('Bolum yuklendi!');
    } catch (err) {
      alert('JSON parse hatasi: ' + err.message);
    }
  }

  _saveLevel() {
    const data = {
      meta: { ...this.levelMeta },
      elements: this.elements.map(el => ({ ...el })),
      nextId: this._nextId,
      savedAt: Date.now(),
    };

    if (this.currentSaveSlot !== null && this.currentSaveSlot < this.savedLevels.length) {
      this.savedLevels[this.currentSaveSlot] = data;
    } else {
      this.savedLevels.push(data);
      this.currentSaveSlot = this.savedLevels.length - 1;
    }

    this._saveLevelsList();
    this._showToast('Kaydedildi!');
    this._updatePanel();
  }

  _loadFromSlot(idx) {
    if (idx < 0 || idx >= this.savedLevels.length) return;
    const data = this.savedLevels[idx];
    this.levelMeta = { ...data.meta };
    this.elements = data.elements.map(el => ({ ...el }));
    this._nextId = data.nextId || (Math.max(0, ...this.elements.map(e => e._id)) + 1);
    this.currentSaveSlot = idx;
    this.selectedElement = null;
    this._updatePanel();
    this._showToast('Yuklendi!');
  }

  _loadSavedLevels() {
    try {
      const data = JSON.parse(localStorage.getItem(EDITOR_SAVE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  _saveLevelsList() {
    try {
      localStorage.setItem(EDITOR_SAVE_KEY, JSON.stringify(this.savedLevels));
    } catch { /* ignore */ }
  }

  _showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: #2ECC71; color: #fff; padding: 10px 24px; border-radius: 8px;
      font-family: Arial; font-size: 14px; font-weight: bold; z-index: 2000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  destroy() {
    this.deactivate();
    if (this._panel) {
      this._panel.remove();
      this._panel = null;
    }
  }
}

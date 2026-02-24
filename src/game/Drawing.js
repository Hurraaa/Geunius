/**
 * Drawing system - handles mouse/touch input and converts drawn lines
 * into physics bodies.
 */
export class Drawing {
  constructor(canvas, physics) {
    this.canvas = canvas;
    this.physics = physics;
    this.ctx = canvas.getContext('2d');

    // Current drawing state
    this.isDrawing = false;
    this.currentPoints = [];
    this.drawnBodies = [];

    // Ink system
    this.maxInk = 500;
    this.usedInk = 0;

    // Visual settings
    this.lineColor = '#2C3E50';
    this.lineWidth = 8;
    this.previewColor = 'rgba(44, 62, 80, 0.6)';

    // Drawing is enabled/disabled
    this.enabled = true;

    this._bindEvents();
  }

  _bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this._onStart(e));
    this.canvas.addEventListener('mousemove', (e) => this._onMove(e));
    this.canvas.addEventListener('mouseup', (e) => this._onEnd(e));
    this.canvas.addEventListener('mouseleave', (e) => this._onEnd(e));

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this._onStart(e.touches[0]);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this._onMove(e.touches[0]);
    });
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this._onEnd(e);
    });
  }

  _getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  _onStart(e) {
    if (!this.enabled) return;
    if (this.usedInk >= this.maxInk) return;

    const pos = this._getPos(e);
    this.isDrawing = true;
    this.currentPoints = [pos];
  }

  _onMove(e) {
    if (!this.isDrawing || !this.enabled) return;

    const pos = this._getPos(e);
    const last = this.currentPoints[this.currentPoints.length - 1];

    // Minimum distance between points
    const dx = pos.x - last.x;
    const dy = pos.y - last.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) return;

    // Check ink limit
    if (this.usedInk + dist > this.maxInk) {
      // Use remaining ink
      const remaining = this.maxInk - this.usedInk;
      const ratio = remaining / dist;
      const clampedPos = {
        x: last.x + dx * ratio,
        y: last.y + dy * ratio,
      };
      this.currentPoints.push(clampedPos);
      this.usedInk = this.maxInk;
      this._onEnd();
      return;
    }

    this.currentPoints.push(pos);
    this.usedInk += dist;
  }

  _onEnd() {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (this.currentPoints.length < 2) {
      this.currentPoints = [];
      return;
    }

    // Convert drawn points to physics body
    const body = this.physics.createDrawnBody(this.currentPoints, this.lineWidth);
    if (body) {
      this.physics.addBody(body);
      this.drawnBodies.push({
        body,
        points: [...this.currentPoints],
      });
    }

    this.currentPoints = [];
  }

  /** Draw the current preview line and all completed lines */
  render(ctx) {
    // Draw completed lines
    for (const drawn of this.drawnBodies) {
      this._drawLine(ctx, drawn.body, this.lineColor);
    }

    // Draw current preview
    if (this.isDrawing && this.currentPoints.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = this.previewColor;
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(this.currentPoints[0].x, this.currentPoints[0].y);
      for (let i = 1; i < this.currentPoints.length; i++) {
        ctx.lineTo(this.currentPoints[i].x, this.currentPoints[i].y);
      }
      ctx.stroke();
    }
  }

  _drawLine(ctx, body, color) {
    // Draw each part of the compound body
    for (const part of body.parts) {
      if (part === body) continue; // skip parent
      const verts = part.vertices;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(verts[0].x, verts[0].y);
      for (let i = 1; i < verts.length; i++) {
        ctx.lineTo(verts[i].x, verts[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  /** Reset all drawings and ink */
  reset(maxInk) {
    for (const drawn of this.drawnBodies) {
      this.physics.removeBody(drawn.body);
    }
    this.drawnBodies = [];
    this.currentPoints = [];
    this.isDrawing = false;
    this.usedInk = 0;
    if (maxInk !== undefined) this.maxInk = maxInk;
  }

  /** Get ink usage ratio (0-1) */
  get inkRatio() {
    return this.usedInk / this.maxInk;
  }
}

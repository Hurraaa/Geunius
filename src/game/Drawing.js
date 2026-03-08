import Matter from 'matter-js';

/**
 * Drawing system - handles mouse/touch input and converts drawn lines
 * into physics bodies. Supports undo (last drawn line removal).
 *
 * Segments are individual static bodies (no compound body).
 * This avoids Matter.js convex hull ghost collisions.
 * When simulation starts, segments become dynamic (affected by gravity).
 */
export class Drawing {
  constructor(canvas, physics) {
    this.canvas = canvas;
    this.physics = physics;
    this.ctx = canvas.getContext('2d');

    // Current drawing state
    this.isDrawing = false;
    this.currentPoints = [];
    this.drawnLines = []; // { segments: [...], inkUsed }

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
    this._currentLineInk = 0;
  }

  _onMove(e) {
    if (!this.isDrawing || !this.enabled) return;

    const pos = this._getPos(e);
    const last = this.currentPoints[this.currentPoints.length - 1];

    const dx = pos.x - last.x;
    const dy = pos.y - last.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) return;

    if (this.usedInk + dist > this.maxInk) {
      const remaining = this.maxInk - this.usedInk;
      const ratio = remaining / dist;
      const clampedPos = {
        x: last.x + dx * ratio,
        y: last.y + dy * ratio,
      };
      this.currentPoints.push(clampedPos);
      this._currentLineInk += remaining;
      this.usedInk = this.maxInk;
      this._onEnd();
      return;
    }

    this.currentPoints.push(pos);
    this._currentLineInk += dist;
    this.usedInk += dist;
  }

  _onEnd() {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (this.currentPoints.length < 2) {
      this.currentPoints = [];
      return;
    }

    // Convert drawn points to individual static segment bodies
    const segments = this.physics.createDrawnSegments(this.currentPoints, this.lineWidth);
    if (segments) {
      for (const seg of segments) {
        this.physics.addBody(seg);
      }
      this.drawnLines.push({
        segments,
        inkUsed: this._currentLineInk || 0,
      });
    }

    this.currentPoints = [];
    this._currentLineInk = 0;
  }

  /** Undo last drawn line */
  undo() {
    if (this.drawnLines.length === 0) return false;

    const last = this.drawnLines.pop();
    for (const seg of last.segments) {
      this.physics.removeBody(seg);
    }
    this.usedInk = Math.max(0, this.usedInk - last.inkUsed);
    return true;
  }

  get canUndo() {
    return this.drawnLines.length > 0;
  }

  /** Convert all drawn segments from static to dynamic so gravity affects them */
  makeSegmentsDynamic() {
    for (const drawn of this.drawnLines) {
      for (const seg of drawn.segments) {
        Matter.Body.setStatic(seg, false);
        Matter.Body.setMass(seg, 0.4);
        seg.frictionAir = 0.01;
      }
    }
  }

  render(ctx) {
    // Draw completed lines using body vertices (static, stays where drawn)
    for (const drawn of this.drawnLines) {
      this._drawSegments(ctx, drawn.segments, this.lineColor);
    }

    // Draw current preview (not in physics yet)
    if (this.isDrawing && this.currentPoints.length > 1) {
      this._drawPreview(ctx, this.currentPoints, this.previewColor);
    }
  }

  _drawSegments(ctx, segments, color) {
    ctx.fillStyle = color;
    for (const seg of segments) {
      const verts = seg.vertices;
      ctx.beginPath();
      ctx.moveTo(verts[0].x, verts[0].y);
      for (let i = 1; i < verts.length; i++) {
        ctx.lineTo(verts[i].x, verts[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  _drawPreview(ctx, points, color) {
    if (!points || points.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  reset(maxInk) {
    for (const drawn of this.drawnLines) {
      for (const seg of drawn.segments) {
        this.physics.removeBody(seg);
      }
    }
    this.drawnLines = [];
    this.currentPoints = [];
    this.isDrawing = false;
    this.usedInk = 0;
    this._currentLineInk = 0;
    if (maxInk !== undefined) this.maxInk = maxInk;
  }

  get inkRatio() {
    return this.usedInk / this.maxInk;
  }
}

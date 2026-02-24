import { Game } from './game/Game.js';

try {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) throw new Error('Canvas element not found');
  const game = new Game(canvas);
  game.start();
} catch (err) {
  // Show error on screen for debugging
  document.body.style.color = '#fff';
  document.body.style.padding = '20px';
  document.body.style.fontFamily = 'monospace';
  document.body.innerHTML = `<h2>Hata:</h2><pre>${err.message}\n${err.stack}</pre>`;
  console.error(err);
}

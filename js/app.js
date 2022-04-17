import game from './game.js';
import './bootstrap.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('game', () => game);
});

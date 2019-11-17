import { game } from './dom-variables.js';
import { setAvatarInputOptions } from './game-items.js';
import { managePlayerOptions } from './game-events.js';
import { startGame } from './game-events.js';
import { startSlideShow } from './game-events.js';

startSlideShow();

managePlayerOptions();

setAvatarInputOptions(game.avatarImgs);

startGame();

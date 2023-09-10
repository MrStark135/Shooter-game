// here will be all common variables, used by many scripts
// this script is created separately to avoid cross dependency
import { Player } from './UserScripts/GameObjects/Player.js';
import { StatisticsManager } from './UserScripts/ManagerObjects/StatisticsManager.js';

export const canvas = document.getElementById('gameCanvas');
// canvas.toDataURL('image/png', 1.0);

export const ctx = canvas.getContext('2d');

// export const statsContainer = document.getElementById('overlay-container');

export const player = new Player(canvas.width / 2, canvas.height / 2, 10, '#00FF00');
export const stats = new StatisticsManager(player);

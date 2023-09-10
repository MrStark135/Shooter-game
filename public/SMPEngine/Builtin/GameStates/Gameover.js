import { GameObjectsManager } from '../../GameObjectsManager.js';
import { GameStatesManager } from '../../GameStatesManager.js';
import { Playing } from './Playing.js';
import { GameObject } from '../GameObjects/GameObject.js';
import { Game } from '../../Game.js';
import { canvas } from '../../common.js';
import { storage } from '../../../storage.js';
import { stats } from '../../common.js';

export const Gameover = 
{
	name: 'GAMEOVER',
	Init()
	{
		if (stats.score > storage.bestScore) storage.bestScore = stats.score;
		if (Game.time > storage.bestTime) storage.bestTime = Game.time;

		stats.bestScoreDiv.innerText = `BEST SCORE: ${storage.bestScore}`;
		stats.bestTimeDiv.innerText = `BEST TIME: ${(Math.floor((storage.bestTime / 60) * 100) / 100) + ''}s`;

		stats.initGameover();

		GameObjectsManager.gameObjects = [];
		GameObjectsManager.gameObjects.push(new GameObject(0, 0, canvas.width, canvas.height, '#F33'));
	},
	Update()
	{
		Game.GameObjectsManager.Update();
		Game.GameStatesManager.Update();
	},
	Render()
	{
		Game.GameObjectsManager.Render();
	}
}
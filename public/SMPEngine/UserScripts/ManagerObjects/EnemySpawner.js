import { canvas } from '../../common.js';
import { Game } from '../../Game.js';
import { Enemy } from '../GameObjects/Enemy.js';

export class EnemySpawner
{
	constructor(speed, player)
	{
		this.speed = speed;
		this.player = player;
	}
	
	Update()
	{
		if (Game.time % this.speed == 0)
		{
			let xFlat = (Math.random() >= 0.5); // just a binary random choice
			let x = xFlat ? ((Math.random() >= 0.5) ? canvas.width : 0) : (Math.random() * canvas.width);
			let y = xFlat ? (Math.random() * canvas.height) : ((Math.random() >= 0.5) ? canvas.height : 0);

			let radius = Math.random() * 20 + 10;

			Game.GameObjectsManager.gameObjects.push(new Enemy(x, y, radius, '#111', 0.02, this.player));

			this.speed -= 0.5;
		}
	}

	Render() {}
}
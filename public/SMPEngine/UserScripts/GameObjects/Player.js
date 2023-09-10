import { SpriteObject } from '../../Builtin/GameObjects/SpriteObject.js';
import { Circle } from '../../Builtin/GameObjects/Circle.js';
import { Bullet } from '../../UserScripts/GameObjects/Bullet.js';
import { Gameover } from '../../Builtin/GameStates/Gameover.js';
import { Input } from '../../Input.js';
import { Game } from '../../Game.js';

export class Player extends Circle
{
	constructor(x, y, radius, color)
	{
		super(x, y, radius, color);
		this.speed = 3;
		this.ammo = 5;
		this.killed = 0;
	}
	
	Update()
	{
		// input handling
		
		// movement
		if (Input.isKeyDown('ArrowUp'))
			this.y -= this.speed;
		if (Input.isKeyDown('ArrowDown'))
			this.y += this.speed;
		if (Input.isKeyDown('ArrowRight'))
			this.x += this.speed;
		if (Input.isKeyDown('ArrowLeft'))
			this.x -= this.speed;

		// shoot
		if (Input.isKeyDown('Space'))
		{
			if (Game.time % 2 == 0 && this.ammo > 0)
			{
				let radius = Math.random() * 20 + 10;
				let color = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
				let speed = { x: Math.random() * 8 - 4, y: Math.random() * 8 - 4 };
				
				Game.GameObjectsManager.gameObjects.push(new Bullet(this.center.x, this.center.y, radius, color, speed));
				this.ammo--;
			}
		}

		// refill ammo
		if (Game.time % 500 == 0) this.ammo += 7;

		super.Update();
	}
}

// custom collisionHandler
export function collisionPlayerEnemy(obj1, obj2, collisionData)
{
	Game.GameStatesManager.gameState = Gameover;
	Game.GameStatesManager.gameState.Init();
}
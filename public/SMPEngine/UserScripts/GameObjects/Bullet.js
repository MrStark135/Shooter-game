import { Circle } from '../../Builtin/GameObjects/Circle.js';
import { GameObjectsManager } from '../../GameObjectsManager.js';
import { canvas, stats } from '../../common.js';
import { Game } from '../../Game.js';

export class Bullet extends Circle
{
	constructor(x, y, radius, color, speed)
	{
		super(x, y, radius, color);

		this.speed = speed;
		this.bounce = 6; // max num of bounces before the bullet gets destroyed automatically
	}

	Update()
	{
		this.x += this.speed.x;
		this.y += this.speed.y;

		// bounce off the walls
		if (this.x <= 0)
		{
			this.x = 0;
			this.speed.x *= (-1);
			this.bounce--;
		}
		if (this.x + this.width >= canvas.width)
		{
			this.x = canvas.width - this.width;
			this.speed.x *= (-1);
			this.bounce--;
		}
		if (this.y <= 0)
		{
			this.y = 0;
			this.speed.y *= (-1);
			this.bounce--;
		}
		if (this.y + this.height >= canvas.height)
		{
			this.y = canvas.height - this.height;
			this.speed.y *= (-1);
			this.bounce--;
		}

		// after N bounces (defined by the initial value of this.bounce), destroy the bullet
		if (this.bounce <= 0)
		{
			for (let i = 0; i < GameObjectsManager.gameObjects.length; i++)
			{
				if (this === GameObjectsManager.gameObjects[i])
				{
					// remove the object
					GameObjectsManager.gameObjects.splice(i, 1);
				}
			}
		}

		// necessary because the center.x, y gets updated in super(), and they are necessary for Render()
		super.Update();
	}
}

export function collisionBulletEnemy(obj1, obj2, collisionData)
{
	// score keeping
	stats.score++;

	for (let i = 0; i < GameObjectsManager.gameObjects.length; i++)
	{
		if (obj1 === GameObjectsManager.gameObjects[i])
		{
			// remove the object
			GameObjectsManager.gameObjects.splice(i, 1);
		}
		if (obj2 === GameObjectsManager.gameObjects[i])
		{
			// remove the object
			GameObjectsManager.gameObjects.splice(i, 1);
			i--; // when an element is removed, the same 'i' points to a different element - in case obj1 and obj2 are next to each other - one might not get deleted
		}
	}
}
import { GameObjectsManager } from '../../GameObjectsManager.js';
import { Game } from '../../Game.js';

export const compTypes = 
{
	OBJTYPE: 'objectType',
	TAG: 'tag'
};
export class CircleCollisionManager
{
	constructor(comparisonType, id1, id2, collisionHandler = this.#defaultCollisionHandler)
	{
		this.id1 = id1;
		this.id2 = id2;
		
		this.collisionHandler = collisionHandler;
		
		switch(comparisonType)
		{
			case compTypes.OBJTYPE:
			{
				this.comparator = compareObjectTypes;
				break;
			}
			case compTypes.TAG:
			{
				this.comparator = compareTags;
				break;
			}
			default:
			{
				throw 'Comparison type invalid for the defined CollisionManager';
			}
		}
	}

	Update()
	{
		GameObjectsManager.gameObjects.forEach((obj1) => 
		{
			if (this.comparator(obj1, this.id1))
			{
				GameObjectsManager.gameObjects.forEach((obj2) => 
				{
					if (this.comparator(obj2, this.id2))
					{
						if (obj1 === obj2) return; // to avoid registering collisions with itself
						let collisionData = this.#collided(obj1, obj2);
						if (((collisionData.x) ** 2 + (collisionData.y) ** 2) < ((obj1.radius + obj2.radius) ** 2))
						{
							this.collisionHandler(obj1, obj2, collisionData);
						}
					}
				});
			}
		});
	}

	Render() {}

	#collided(obj1, obj2)
	{
		// negative values mean obj2.x > obj1.x, and opposite
		// also applies for Y-axis collisions ;)
		let collisionData =
		{
			x: obj1.center.x - obj2.center.x,
			y: obj1.center.y - obj2.center.y
		};
		
		return collisionData;
	}

	#defaultCollisionHandler(obj1, obj2, collisionData)
	{
		// the overlapping distance - the sum of radia (obj1+obj2) is the smallest distance allowed,
		// and the calculated expression is the actual distance (between the centers of the circles)
		let actDist = Math.sqrt((collisionData.x) ** 2 + (collisionData.y) ** 2);
		let overDist = (obj1.radius + obj2.radius) - actDist;
		let cosAngle = collisionData.x / actDist;
		let angle = Math.acos(cosAngle);
		
		let diffY = Math.sin(Math.PI - angle) * overDist * Math.sign(collisionData.y); // for some reason the sign has to be added manually
		let diffX = cosAngle * overDist;
		
		// because of the float imprecision, if you apply the whole diff amount, the objects may start vibrating causing strange behaviour
		// the solution is to apply a percentange of the whole diff - factor = {0 ... 1}, i.e. 0% to 100%
		// the larger the factor is, the higher is the chance of the strange vibrating behaviour
		// the smaller it is, more overlapping will be tolerated
		// set this value by experimenting with different values until the desired result is achieved  
		let factor = 0.15;

		obj1.y += diffY * factor;
		obj2.y -= diffY * factor;
		obj1.x += diffX * factor;
		obj2.x -= diffX * factor;
	}
}

function compareObjectTypes(obj, id)
{
	return obj.constructor.name === id.name;
}

function compareTags(obj, id)
{
	return obj.tag === id;
}
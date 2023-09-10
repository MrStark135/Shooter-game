// Cleans any object that completely exited from the viewport

import { GameObjectsManager } from "../../GameObjectsManager.js";
import { canvas } from "../../common.js";

export class GarbageCollector
{
	constructor(excludeObjects)
	{
		this.excludeObjects = excludeObjects;
	}
	
	Update()
	{
		GameObjectsManager.gameObjects.forEach((object, i) =>
		{
			if (object.x > canvas.width || (object.x + object.width) < 0)
			{
				// check if the object is in the list before deleting it
				for (let j = 0; j < this.excludeObjects.length; j++)
				{
					if (object instanceof this.excludeObjects[j]) return;
				}

				GameObjectsManager.gameObjects.splice(i, 1);
			}
			else if (object.y > canvas.height || (object.y + object.height) < 0)
			{
				for (let j = 0; j < this.excludeObjects.length; j++)
				{
					if (object instanceof this.excludeObjects[j]) return;
				}

				GameObjectsManager.gameObjects.splice(i, 1);
			}
		});
	}
	
	Render()
	{
		// doesn't render
	}
}
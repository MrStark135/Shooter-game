import { GameObjectsManager } from '../../GameObjectsManager.js';
import { GameStatesManager } from '../../GameStatesManager.js';
import { stats } from '../../common.js';

export const Start = 
{
	name: 'START',
	Init()
	{
		stats.initStart();
		GameObjectsManager.gameObjects = [];
	},
	Update()
	{
		GameStatesManager.Update();
	},
	Render() 
	{
		GameObjectsManager.Render();
	}
}
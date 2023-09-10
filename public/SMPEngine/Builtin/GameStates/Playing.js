import { Game } from "../../Game.js";
import { stats } from '../../common.js';

export const Playing = 
{
	name: 'PLAYING',
	Init()
	{
		stats.initPlaying();
		Game.GameObjectsManager.Init();
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
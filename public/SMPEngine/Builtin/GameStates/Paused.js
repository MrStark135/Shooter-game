import { Game } from "../../Game.js";

export const Paused = 
{
	name: 'PAUSED',
	Update()
	{
		Game.GameStatesManager.Update();
	},
	Render()
	{
		Game.GameObjectsManager.Render();
	}
}
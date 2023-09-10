import { Game } from '../../Game.js';

// this state, when entered at once, automatically breaks the gameloop() and exits the game engine
export const Exit = 
{
	name: 'EXIT',
	Update() {},
	Render() {}
}
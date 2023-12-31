// ----------------------- Transition Managers -------------------------
// Add transitions to and from a game state by making a transition manager function
// Transition manager should change GameStatesManager.gameState = <NEW_STATE>
// push() the function in GameStatesManager.transitionManagers array in Init()
// add short documentation for each function you add

// import ctx and canvas (for rendering): import { canvas, ctx } from "../common.js";
// import Input: import { Input } from "../Input.js";

import { Exit } from './GameStates/Exit.js';
import { Paused } from './GameStates/Paused.js';
import { Playing } from './GameStates/Playing.js';
import { Game } from '../Game.js';


// if 'Escape' pressed transition to GAMEOVER
export function quitGame()
{
	if (Game.Input.isKeyDown == 'KeyQ')
		this.gameState = Exit;
}

// if 'Space' is pressed toggle PAUSED state. Possible only when PLAYING
export function pauseGame()
{
	// toggles between PLAYING and PAUSED
	// NOTICE: game can be PAUSED only when PLAYING
	
	if (Game.Input.isKeyDown('Escape') && this.gameState.name == 'PLAYING')
		this.gameState = Paused;
	else if (Game.Input.isKeyDown('Escape') && this.gameState.name == 'PAUSED')
		this.gameState = Playing;
}
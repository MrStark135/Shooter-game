// This is an INTERFACE between the user scripts and the Engine
// Do not modify the Game Engine (except in case of errors in the code)
// Everything you want this game engine to do should be done in these files

// Add GameStates creating a singleton object like this:
// export const <STATE_NAME> =
// {
// 		name: <STRING_IDENTIFIER>,
// 		Update: function() { /* All Updates() that should be done during this state */ }
// 		Render: function() { /* All Renders() that should be done during this state */ }
// }

import { GameStatesManager } from '../GameStatesManager.js';
import { Start } from '../Builtin/GameStates/Start.js';
import { pauseGame, quitGame } from '../Builtin/transitionManagers.js';

export const GameStatesInterface = 
{
	Init()
	{
		// set the initial state
		GameStatesManager.gameState = Start;
		GameStatesManager.gameState.Init();

		// reset array every Init() to avoid duplicates and garbage
		GameStatesManager.transitionManagers = [];
		// add all transition managers
		GameStatesManager.transitionManagers.push(quitGame.bind(GameStatesManager));
		GameStatesManager.transitionManagers.push(pauseGame.bind(GameStatesManager));
	}
}

import { GameStatesInterface } from './InterfaceScripts/GameStatesInterface.js';

// frames passed since last transition after which new transition can occur
const lastTransitionThreshold = 20;

export const GameStatesManager = 
{
	// the current state
	gameState: {},
	// state transition functions
	transitionManagers: [],
	// Interface for the user
	GameStatesInterface: GameStatesInterface,
	// a helper var used to disable changing gameStates shortly after a change
	lastTransition: lastTransitionThreshold,
	
	Init()
	{		
		// Init GameStateInterface module
		this.GameStatesInterface = GameStatesInterface;
		this.GameStatesInterface.Init();
		
		console.log('[GameStatesManager]: Init done');
	},
	
	Update()
	{		
		// ------------- Transition related code --------------------
		let prevGameState = this.gameState.name;
		
		// first run all transition checks
		for(let i = 0; i < this.transitionManagers.length; i++)
		{
			// to prevent unwanted registering of multiple state changes during a short interval
			if(this.lastTransition > lastTransitionThreshold)
				this.transitionManagers[i]();
			
			// reset lastTransition after a change in gameState
			if(prevGameState != this.gameState.name) this.lastTransition = 0;
		}
		
		// log the state if there was a change
		if(prevGameState != this.gameState.name)
			console.log('[GameStatesManager] Current game state: ' + this.gameState.name);
			
		this.lastTransition++; // increase lastTransition every frame
	}
}
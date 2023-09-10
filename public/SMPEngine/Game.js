import { Input } from "./Input.js";
import { GameStatesManager } from "./GameStatesManager.js";
import { GameObjectsManager } from "./GameObjectsManager.js";
import { ctx } from "./common.js";

export const Game =
{
	// an array holding all the gameObjects
	GameObjectsManager: GameObjectsManager,
	// object containing input info
	Input: Input,
	// gameState, a string indicating the state
	GameStatesManager: GameStatesManager,
	// the renderer
	ctx: ctx,
	// counts frames since the Init() was called
	time: 0,
	
	// Init function, called once
	Init()
	{		
		this.time = 0;
		
		// setup the renderer
		this.ctx = ctx;
		
		// Init GameObjectsManager module
		this.GameObjectsManager = GameObjectsManager;
		this.GameObjectsManager.Init();
				
		// Init Input module
		this.Input = Input;
		this.Input.Init();
		
		// Init GameStatesManager module - should be loaded last
		this.GameStatesManager = GameStatesManager;
		this.GameStatesManager.Init();
	},
	
	// the Game Loop functions
	Update()
	{
		// according to the current state, the GameStatesManager Updates()
		this.GameStatesManager.gameState.Update();
		
		this.time++;
	},
	Render()
	{
		// according to the current state, the GameStatesManager Renders()
		this.GameStatesManager.gameState.Render();
	}
}
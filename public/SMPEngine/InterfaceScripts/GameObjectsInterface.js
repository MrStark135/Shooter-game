// This is an INTERFACE between the user scripts and the Engine
// Do not modify the Game Engine (except in case of errors in the code)
// Everything you want this game engine to do should be done in these files

// Add game objects to the scene by pushing them to gameObjects array
// GameObjects inherit from GameObject located in Builtin/GameObject.js
// All behaviour for your gameObjects should be done in Update()
// change Render() for different rendering behaviour

// import ctx and canvas (for rendering): import { canvas, ctx } from "../common.js";
// import Input: import { Input } from "../Input.js";

import { player, stats, canvas } from '../common.js';
import { GameObject } from '../Builtin/GameObjects/GameObject.js';
import { Circle } from '../Builtin/GameObjects/Circle.js';
import { Enemy } from '../UserScripts/GameObjects/Enemy.js';
import { Bullet, collisionBulletEnemy } from '../UserScripts/GameObjects/Bullet.js';
import { Player, collisionPlayerEnemy } from '../UserScripts/GameObjects/Player.js';
import { EnemySpawner } from '../UserScripts/ManagerObjects/EnemySpawner.js';
import { GarbageCollector } from '../Builtin/ManagerObjects/GarbageCollector.js'
import { GameObjectsManager } from '../GameObjectsManager.js';
import { SpriteObject } from '../Builtin/GameObjects/SpriteObject.js';
import { CircleCollisionManager, compTypes } from '../Builtin/ManagerObjects/CircleCollisionManager.js';

export const GameObjectsInterface = 
{
	Init()
	{		
		// reset array every Init() to avoid duplicates and garbage
		GameObjectsManager.gameObjects = [];
		
		// HERE ADD GameObjects to the scene
		player.x = canvas.width / 2;
		player.y = canvas.height / 2;
		GameObjectsManager.gameObjects.push(player);
		GameObjectsManager.gameObjects.push(stats);
		// GameObjectsManager.gameObjects.push(new Circle(300, 250, 40, '#FF0000'));
		GameObjectsManager.gameObjects.push(new EnemySpawner(100, player));
		// GameObjectsManager.gameObjects.push(new Enemy(350, 250, 20, '#0000FF', 0.02, player));

		// GameObjectsManager.gameObjects.push(new GameObject(0, 0, 690, 490, '#0000FF'));
		
		GameObjectsManager.gameObjects.push(new GarbageCollector([Player]));
		GameObjectsManager.gameObjects.push(new CircleCollisionManager(compTypes.OBJTYPE, Player, Enemy, collisionPlayerEnemy));
		GameObjectsManager.gameObjects.push(new CircleCollisionManager(compTypes.OBJTYPE, Player, Bullet));
		GameObjectsManager.gameObjects.push(new CircleCollisionManager(compTypes.OBJTYPE, Bullet, Enemy, collisionBulletEnemy));
		GameObjectsManager.gameObjects.push(new CircleCollisionManager(compTypes.OBJTYPE, Enemy, Enemy));
		GameObjectsManager.gameObjects.push(new CircleCollisionManager(compTypes.OBJTYPE, Bullet, Bullet));
		// GameObjectsManager.gameObjects.push(new RectCollisionManager(compTypes.OBJTYPE, Player, { constructor: {name: 'walls' }}, collisionHandlerWalls));
	}
}
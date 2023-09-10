import { Circle } from '../../Builtin/GameObjects/Circle.js';

export class Enemy extends Circle
{
	constructor(x, y, radius, color, speed, player)
	{
		super(x, y, radius, color);

		this.speed = speed;
		this.player = player;
	}
	
	Update()
	{
		this.x -= this.speed * (this.center.x - (this.player.x + this.player.width / 2));
		this.y -= this.speed * (this.center.y - (this.player.y + this.player.height / 2));
		
		super.Update();
	}
}
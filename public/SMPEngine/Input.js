import { canvas } from "./common.js";

export const Input = 
{
	keysDown: [], 
	isKeyDown(key)
	{
		if (this.keysDown.includes(key))
			return true;
		else
			return false;
	},
	mouse: 
	{
		X: 0,
		Y: 0,
		clicked: false
	},
	offset:
	{
		X: 0,
		Y: 0
	},
	
	Init()
	{
		// do a remove, in case there are some left
		document.removeEventListener('keydown', this.updateKeys.bind(this));
		document.removeEventListener('keyup', this.updateKeys.bind(this));
		canvas.removeEventListener('mousedown', this.updateMouse.bind(this));
		canvas.removeEventListener('mouseup', this.updateMouse.bind(this));
		canvas.removeEventListener('mousemove', this.updateMouse.bind(this));
		window.removeEventListener('resize', this.updateOffset.bind(this));
		window.removeEventListener('load', this.updateOffset.bind(this));

		// add the listeners
		document.addEventListener('keydown', this.updateKeys.bind(this));
		document.addEventListener('keyup', this.updateKeys.bind(this));
		canvas.addEventListener('mousedown', this.updateMouse.bind(this));
		canvas.addEventListener('mouseup', this.updateMouse.bind(this));
		canvas.addEventListener('mousemove', this.updateMouse.bind(this));
		window.addEventListener('resize', this.updateOffset.bind(this));
		window.addEventListener('load', this.updateOffset.bind(this));
		
		this.updateOffset(); // Run updateOffset() on Init() because the load event passed before the Init() was run
		
		console.log('[Input]: Init done');
	},
	updateKeys(event)
	{
		if (event.type == 'keydown')
		{
			if (!this.keysDown.includes(event.code))
				this.keysDown.push(event.code);
		}
		else if (event.type == 'keyup')
		{
			for (let i = 0; i < this.keysDown.length; i++)
			{
				if (event.code === this.keysDown[i])
				{
					// remove the object
					this.keysDown.splice(i, 1);
				}
			}
		}
	},
	updateMouse(event)
	{		
		if (event.type == 'mousedown') this.mouse.clicked = true;
		else if(event.type == 'mouseup') this.mouse.clicked = false;
		else if(event.type == 'mousemove')
		{
			// in the absence of a better fix, the offset has to be updated because of bug produced by specific resize events
			this.updateOffset();
					
			let constant;
			if(canvas.width / canvas.height < window.innerWidth / window.innerHeight) constant = window.innerHeight / canvas.height;
			else constant = window.innerWidth / canvas.width;
			
			this.mouse.X = (event.clientX - this.offset.X) / constant;
			this.mouse.Y = (event.clientY - this.offset.Y) / constant;
		}
		else console.log('error event');
	},
	updateOffset()
	{		
		let rect = canvas.getBoundingClientRect();
		this.offset.X = rect.left;
		this.offset.Y = rect.top;
		
		let overlay = document.getElementById('overlay-container');

		// Update CSS		
		if(canvas.width / canvas.height < window.innerWidth / window.innerHeight)
		{
			canvas.style.width = ((canvas.width / canvas.height) * 100) + 'vh';
			canvas.style.height = '100vh';

			overlay.style.width = ((canvas.width / canvas.height) * 100) + 'vh';
			overlay.style.height = '100vh';
		}
		else
		{
			canvas.style.height = ((canvas.height / canvas.width) * 100) + 'vw';
			canvas.style.width = '100vw';

			overlay.style.height = ((canvas.height / canvas.width) * 100) + 'vw';
			overlay.style.width = '100vw';
		}
	}
}
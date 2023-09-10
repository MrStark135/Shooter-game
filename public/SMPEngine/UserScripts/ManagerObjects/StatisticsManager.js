import { Game } from '../../Game.js';
import { Playing } from '../../Builtin/GameStates/Playing.js';

export class StatisticsManager
{
	constructor(player)
	{
		this.score = 0;
		this.player = player;

		this.scoreDiv = document.getElementById('score');
		this.timeDiv = document.getElementById('time');
		this.gameOverDiv = document.getElementById('game-over');
		this.bestScoreDiv = document.getElementById('best-score');
		this.bestTimeDiv = document.getElementById('best-time');
		this.playButton = document.getElementById('play');

		function startNewGame() { Game.Init(); Game.GameStatesManager.gameState = Playing; Game.GameStatesManager.gameState.Init(); };
		this.playButton.onclick = startNewGame;
	}
	Update()
	{

	}
	Render()
	{
		switch (Game.GameStatesManager.gameState.name)
		{
			case 'PLAYING':
			{
				// score, killed enemies
				this.scoreDiv.innerText = this.score;
				
				// time passed
				let timeStr = ((Math.floor((Game.time / 60) * 100) / 100)+'');
				let parts = timeStr.split('.');
				let whole = parts[0];
				let decimal = (parts[1] === undefined) ? '' : parts[1];

				whole = whole.padStart(3, '0');
				decimal = decimal.padEnd(2, '0');

				this.timeDiv.innerText = whole + '.' + decimal + 's';

				break;
			}
			case 'PAUSED':
			{
				break;
			}
			case 'GAMEOVER':
			{
				break;
			}
			default: break;
		}

	}
	initStart()
	{
		this.scoreDiv.style.visibility = "hidden";
		this.timeDiv.style.visibility = "hidden";
		this.gameOverDiv.style.visibility = "hidden";
		this.bestScoreDiv.style.visibility = "hidden";
		this.bestTimeDiv.style.visibility = "hidden";
		this.playButton.style.visibility = "visible";
		this.playButton.classList = "start-play";
	}
	initPlaying()
	{
		this.score = 0;

		this.scoreDiv.style.visibility = "visible";
		this.timeDiv.style.visibility = "visible";
		this.gameOverDiv.style.visibility = "hidden";
		this.bestScoreDiv.style.visibility = "hidden";
		this.bestTimeDiv.style.visibility = "hidden";
		this.playButton.style.visibility = "hidden";
	}
	initGameover()
	{
		this.scoreDiv.style.visibility = "visible";
		this.timeDiv.style.visibility = "visible";
		this.gameOverDiv.style.visibility = "visible";
		this.bestScoreDiv.style.visibility = "visible";
		this.bestTimeDiv.style.visibility = "visible";
		this.playButton.style.visibility = "visible";
		this.playButton.classList = "gameover-play";
	}
}
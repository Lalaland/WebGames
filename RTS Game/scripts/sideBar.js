define(["canvas", "assetManager","inputManager"] , function(canvas,assetManager,inputManager)
{
	"use strict";

	
	function SideBar()
	{
		assetManager.load("assets.json",function()
		{
			this.canvas = new canvas.Canvas("controlCanvas");
			
			this.inputManager = new inputManager.InputManager(this.canvas);

			this.inputManager.addClickHandler(function(x,y)
			{
				if (this.mode)
				{
					var convX = Math.floor(x/100);
					var convY = Math.floor((y-50)/50);


					var buttonIndex = convX  + convY * 2;
					var button = this.mode.buttons[buttonIndex];
					if (button)
						button.callback();
				}

			}.bind(this));


			window.requestAnimationFrame(this.mainLoop.bind(this));
			


		}.bind(this));	

	}

	

	SideBar.prototype.mainLoop = function(time)
	{
		
		window.requestAnimationFrame(this.mainLoop.bind(this));

		if (!this.lastTime)
			this.lastTime = time;

		this.update(time-this.lastTime);
		this.lastTime = time;
		this.draw();
	};


	SideBar.prototype.update = function(delta)
	{

	};

	SideBar.prototype.setMode = function(mode)
	{
		this.mode = mode;

	};

	SideBar.prototype.draw = function()
	{
		this.canvas.clear();
		this.canvas.drawImageSimple("controlMenu",0,0);

		if (this.mode)
		{
			this.canvas.ctx.textBaseline = "top";
			this.canvas.ctx.textAlign = "center";
			this.canvas.ctx.font = "21px sans-serif";
			this.canvas.ctx.fillText(this.mode.text,100,12.5);


			this.canvas.ctx.font = "15px sans-serif";
			for (var i = 0; i < this.mode.buttons.length;i++)
			{
				var button = this.mode.buttons[i];
				var row = Math.floor(i/2);
				var column = Math.floor(i%2);

				this.canvas.ctx.strokeRect(5 + 100*column,55+50*row,90,40);
				this.canvas.ctx.fillText(button.name,50+100*column,55 + 50*row);
			}

		}

		
	};

	var self = {};
	self.SideBar = SideBar;
	return self;
});
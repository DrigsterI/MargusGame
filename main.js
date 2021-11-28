const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let debug = true;

// Variables
let player;
let gravity;
let keys = {};
let obstacles = [];

let VelocityText;

// Event Listeners
document.addEventListener('keydown', function (evt) {
	keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
	keys[evt.code] = false;
});

class Player {
	constructor (x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

		this.VelocityX = 0;
		this.VelocityY = 0;
		this.jumpForce = 8;
		this.speed = 1.5;
		this.grounded = false;
		this.jumpTimer = 0;
	}

	Animate () {
		if (keys['Space'] || keys['KeyW']) {
			this.Jump();
		}
		if (keys['KeyD']) {
			this.Move(this.speed);
		} else if (keys['KeyA']){
			this.Move(this.speed * (-1));
		} /*else if (debug){
			if (keys['KeyS']){ //only for debug (collision) (ZAK)
				this.VelocityY = this.jumpForce;
			}
		}*/
		
		this.y += this.VelocityY;
		this.x += this.VelocityX;

		this.CheckCollisions();

		
		// Gravity
		if (this.y + this.height < canvas.height) {
			this.VelocityY += gravity;
			this.grounded = false;
		} else {
			this.VelocityY = 0;
			this.grounded = true;
			this.y = canvas.height - this.height;
		}

		this.x += this.VelocityX;

		if (this.x + this.width < canvas.width && this.x > 0) {
			if (this.VelocityX > 0) {
				this.VelocityX -= 0.5;
			}else if (this.VelocityX < 0) {
				this.VelocityX += 0.5;
			}
		} else {
			if (this.x + this.width > canvas.width) {
				this.VelocityX = 0;
				this.x = canvas.width - this.width;
			} else if (this.x < 0){
				this.VelocityX = 0;
				this.x = 0;
			}
		}

		this.Draw();
	}

	CheckCollisions () {
		for (let i = 0; i < obstacles.length; i++) {
			let obstacle = obstacles[i];
			
			//левый верхний угол
			if (this.x >= obstacle.x && this.x <= obstacle.x + obstacle.width &&
				this.y >= obstacle.y && this.y <= obstacle.y + obstacle.height)
			{
				//this.x = 200;
				//this.y = 200;
				this.CheckPart(obstacle);
			}
			
			//правый верхний угол
			if (this.x + this.width >= obstacle.x && this.x + this.width <= obstacle.x + obstacle.width &&
				this.y >= obstacle.y && this.y <= obstacle.y + obstacle.height)
			{
				//this.x = 200;
				//this.y = 200;
				this.CheckPart(obstacle);
			}
			
			//левый нижний угол 
			if (this.x >= obstacle.x && this.x <= obstacle.x + obstacle.width &&
				this.y + this.height >= obstacle.y && this.y + this.height <= obstacle.y + obstacle.height)
			{
				//this.x = 1200;
				//this.y = 200;
				this.CheckPart(obstacle);
			}
			
			//правый нижний угол
			if (this.x + this.width >= obstacle.x && this.x + this.width <= obstacle.x + obstacle.width &&
				this.y + this.height >= obstacle.y && this.y + this.height <= obstacle.y + obstacle.height)
			{
				//this.x = 200;
				//this.y = 200;
				this.CheckPart(obstacle);
			}
		}
	}
	
	
	CheckPart (obstacle) {
		
		let x;
		let y;
		
		// 1 четверть
		if (this.x >= obstacle.width / 2 && this.y + this.height <= obstacle.height / 2)
		{
			x = (obstacle.x + obstacle.width) - this.x;
			y = this.y - obstacle.y;			
			if (x > y)
			{
				//this.x += x;
				//this.x = obstacle.x + obstacle.width;
			}
			else 
			{
				//this.y += y;
				//this.y = obstacle.y - this.height;
				this.y = obstacle.y + this.height;
			}
			console.log("1");
		}

		// 2 четверть
		if (this.x + this.width <= ((obstacle.x) + obstacle.width / 2) && this.y + this.height <= ((obstacle.y) + obstacle.height / 2))
		{
			x = this.x - obstacle.x;
			y = this.y - obstacle.y;
			if (x > y)
			{
				//this.x -= x;
				this.x = obstacle.x - this.width;
			}
			else 
			{
				//this.y += y;
				this.y = obstacle.y - this.height-100;
				//this.y = obstacle.y + this.height;
			}
			console.log("2");
		}


		// 3 четверть
		if (this.x + this.width <= obstacle.width / 2 && this.y >= ((obstacle.y) + obstacle.height / 2) || 
			this.x <= ((obstacle.x) + obstacle.width / 2) && this.y <= ((obstacle.y) + obstacle.height / 2))
		{
			x = this.x - obstacle.x;
			y = (obstacle.y + obstacle.height) - this.y;
			if (x > y)
			{
				//this.x += x;
				this.x = obstacle.x - this.width;
			}
			else 
			{
				//this.y -= y;
				this.y = obstacle.y - this.height;
				
			}
				//console.log(this.x);
				//console.log(this.y);
				//console.log(" ");
				//console.log("ok");
				console.log("3");
		}



		// 4 четверть
		if (this.x >= ((obstacle.x) + obstacle.width / 2) && this.y >= ((obstacle.y) + obstacle.height / 2))
		{
			x = (obstacle.x + obstacle.width) - this.x;
			y = (obstacle.y + obstacle.height) - this.y;
			if (x < y)
			{
				//console.log("ok");
				//this.x -= x;
				this.x = obstacle.x + obstacle.width;
			}
			else 
			{
				//this.y -= y;
				this.y = obstacle.y + this.height;
			}
			console.log("4");
		}
		
		//console.log(x);
		//console.log(y);
		//console.log(" ");
		console.log(this.x);
		console.log(this.y);
		console.log(" ");
		
	}
	
	
	
	
	
	Move (speed) {
		this.VelocityX = speed;
	}

	Jump () {
		if (this.grounded) {
			this.VelocityY = -this.jumpForce;
		}
	}
	

	Draw () {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}

class Obstacle {
	constructor (x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
  
	Draw () {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}

class Text {
		constructor (t, x, y, a, c, s) {
			this.t = t;
			this.x = x;
			this.y = y;
			this.a = a;
			this.c = c;
			this.s = s;
		}
	
		Draw () {
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.font = this.s + "px sans-serif";
			ctx.textAlign = this.a;
			ctx.fillText(this.t, this.x, this.y);
			ctx.closePath();
		}
	}

function Start () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.font = "20px sans-serif";
	gravity = 0.2; 

	player = new Player(400, 800, 50, 50, '#FF5858');

	box = new Obstacle(500, 800, 50, 50, '#666');
	obstacles.push(box);

	VelocityText = new Text("Velocity: " + 0, 25, 25, "left", "#212121", "20");
	PosText = new Text("Pos: " + 0, 25, 50, "left", "#212121", "20");

	requestAnimationFrame(Update);
}

function Update () {
	requestAnimationFrame(Update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < obstacles.length; i++) {
		let obstacle = obstacles[i];

		obstacle.Draw();
	}
	player.Animate();

	if (debug) {
		
		VelocityText.t = "Velocity: " + player.VelocityX + ", " + player.VelocityY;
		VelocityText.Draw();
		PosText.t = "Pos: " + player.x + ", " + player.y;
		PosText.Draw();
	}
}

Start();
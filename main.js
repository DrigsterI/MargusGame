const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let debug = true;

// Variables
let player;
let coins = 0;
let gravity;
let keys = {};
let objects = [];



let VelocityText;

// Event Listeners
document.addEventListener('keydown', function (evt) {
	keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
	keys[evt.code] = false;
});

class Object {
	constructor (x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

		this.speed = 0;

		this.movable = false;
		this.collidable = true;

		this.velocityX = 0;
		this.velocityY = 0;
		this.grounded = false;
	}
	
	Animate () {
		//Physics calculation
		if (this.movable) {
			this.grounded = false;
			this.y += this.velocityY;
			this.x += this.velocityX;
		}
		if (this.collidable) {
			for (let i = 0; i < objects.length; i++) {
				let object = objects[i];
				if (this.CheckCollision(this, object) && object.collidable) {
					this.CheckPart(object);
					
				}
			}
		}
		if (this.movable) {
			if (!this.grounded){
				this.velocityY += gravity;
			} else {
				if (this.velocityX > 0) {
					this.velocityX -= 0.5;
				}else if (this.velocityX < 0) {
					this.velocityX += 0.5;
				}
				this.velocityY = 0;
			}
		}
		this.Draw();
	}

	CheckCollision (obj1, obj2) {
		if (obj1.x > obj2.x + obj2.width) {
			return false;
		}
		if (obj1.x + obj1.width < obj2.x) {
			return false;
		}
		if (obj1.y > obj2.y + obj2.height) {
			return false;
		}
		if (obj1.y + obj1.height < obj2.y) {
			return false;
		}
		return true;
	}
	
	CheckPart (object) {
		let x;
		let y;
		
		// 1 четверть
		if (this.x >= ((object.x) + object.width / 2) && this.y + this.height <= ((object.y) + object.height / 2) ||
			this.x >= ((object.x) + object.width / 2) && this.y <= ((object.y) + object.height / 2) ||
			this.x + this.width >= ((object.x) + object.width / 2) && this.y + this.height <= ((object.y) + object.height / 2)
		){
			x = ((object.x) + object.width) - this.x;
			y = (this.y + this.height) - ((object.y));	
		
			if (x < y){
				this.x = object.x + object.width;
			}
			else {
				this.y = object.y - this.height;
				this.grounded = true;
			}
		}
		
		// 2 четверть
		if (this.x + this.width <= ((object.x) + object.width / 2) && this.y + this.height <= ((object.y) + object.height / 2) ||
			this.x + this.width <= ((object.x) + object.width / 2) && this.y <= ((object.y) + object.height / 2) ||
			this.x <= ((object.x) + object.width / 2) && this.y + this.height <= ((object.y) + object.height / 2)
		){
			x = (this.x + this.width) - object.x;
			y = (this.y + this. height) - object.y;
			
			if (x < y){
				this.x = object.x - this.width;
			}
			else {
				this.y = object.y - this.height;
				this.grounded = true;
			}   
		}
		
		// 3 четверть
		if (this.x + this.width <= ((object.x) + object.width / 2) && this.y >= ((object.y) + object.height / 2) ||
			this.x <= ((object.x) + object.width / 2) && this.y >= ((object.y) + object.height / 2) ||
			this.x + this.width <= ((object.x) + object.width / 2) && this.y + this.height >= ((object.y) + object.height / 2)
		){
			x = (this.x + this.width) - object.x;
			y = (object.y + object.height) - this.y ;
			
			if (x < y){
				this.x = object.x - this.width;
			}
			else {
				this.y = (object.y + object.height);
			}
		}

		// 4 четверть
		if (this.x >= ((object.x) + object.width / 2) && this.y >= ((object.y) + object.height / 2) ||
			this.x + this.width >= ((object.x) + object.width / 2) && this.y >= ((object.y) + object.height / 2) ||
			this.x >= ((object.x) + object.width / 2) && this.y + this.height >= ((object.y) + object.height / 2)
		){
			x = (object.x + object.width) - this.x;
			y = (object.y + object.height) - this.y;
			
			if (x < y) {
				this.x = object.x + object.width;
			}
			else {
				this.y = object.y + this.height; // mb bug
			}
		}
	}

	Move (speed) {
		this.velocityX = speed;
	}

	Draw () {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}


class Player extends Object {
	constructor (x, y, width, height, color) {
		super(x, y, width, height, color);
		
		this.jumpForce = 8;
		this.grounded = false;
		this.movable = true;
		this.speed = 4;
		this.health = 100;
	}

	Animate(){
		// Keys check
		if (keys['Space'] || keys['KeyW']) {
			this.Jump();
		}
		if (keys['KeyD']) {
			this.Move(this.speed);
		} else if (keys['KeyA']){
			this.Move(this.speed * (-1));
		}

		super.Animate();

		if (player.y > 5000) {
			player.y = -500;
		}
	}

	Jump () {
		if (this.grounded) {
			this.velocityY = -this.jumpForce;
		}
	}
}

class Coin extends Object {
	constructor (x, y, width, height, color) {
		super(x, y, width, height, color);
		this.exists = true;
		super.collidable = false;
		
	}
	
	Pick () {
			coins++;
			this.exists = false;
			this.x = -100;
			this.y = -100;
	}
	Animate() {
		super.Animate();
		for (let i = 0; i < objects.length; i++) {
				let object = objects[i];
				if (this.CheckCollision(this, object)) {
					if (typeof(object) == Player){
						coin.pick();
					}
					
				}
			}
			
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

class Map {
	constructor (file) {
		readF
		const data = JSON.parse();
	}
}

function Start () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.font = "20px sans-serif";
	gravity = 0.2; 

	player = new Player(400, 800, 50, 100, '#FF5858');

	box1 = new Object(0, canvas.height - 10, canvas.width, 20, '#666');
	objects.push(box1);

	box = new Object(900, 760, 100, 200, '#666');
	objects.push(box);
	
	box2 = new Object(700, 760, 10, 100, '#666');
	objects.push(box2);
	
	coin1 = new Coin (600, 700, 10, 10, '#ECFF00');
	objects.push(coin1);
	
	
	VelocityText = new Text("Velocity: " + 0, 25, 25, "left", "#212121", "20");
	PosText = new Text("Pos: " + 0, 25, 50, "left", "#212121", "20");
	CoinText = new Text("Coins: " + 0, 25, 75, "left", "#212121", "20");

	requestAnimationFrame(Update);
}

function Update () {
	requestAnimationFrame(Update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < objects.length; i++) {
		let object = objects[i];

		object.Draw();
	}
	/*for (let i = 0; i < coinsInGame.length; i++) {
		let coin = coinsInGame[i];

		coin.Draw();
	}*/
	player.Animate();

	if (debug) {
		
		VelocityText.t = "Velocity: " + player.velocityX + ", " + player.velocityY;
		VelocityText.Draw();
		PosText.t = "Pos: " + player.x + ", " + player.y;
		PosText.Draw();
		CoinText.t = "Coins:" + coins;
		CoinText.Draw();
	}
}

Start();
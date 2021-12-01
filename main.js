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

function Start () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.font = "20px sans-serif";
	gravity = 0.2; 

	if (debug){
		object = new Object(100, 300, 1000, 20, '#666');
		objects.push(object);
		button = new Button(600, 250, 10, 10, '#0003FF', 1);
		objects.push(button);
		
		button1 = new Button(700, 250, 10, 10, '#47FF00', 2);
		objects.push(button1);
		
		Aobject = new ActiveObject(200, 200, 50, 100, '#666', 1, 100, 200);
		objects.push(Aobject);
	}
	map = new Map("map1");

	player = new Player(100, 950, 50, 50, '#FF5858');
	objects.push(player);
	
	VelocityText = new Text("Velocity: " + 0, 25, 25, "left", "#212121", "20");
	PosText = new Text("Pos: " + 0, 25, 50, "left", "#212121", "20");
	CoinText = new Text("Coins: " + 0, 25, 75, "left", "#212121", "20");
	HealthText = new Text("HP: " + 0, 25, 100, "left", "#212121", "20");

	requestAnimationFrame(Update);
}

function Stop() {
	objects = [];
	player;
	cancelAnimationFrame(Update);
}

function Update () {
	requestAnimationFrame(Update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < objects.length; i++) {
		let object = objects[i];

		object.Animate();
	}
	
	if (debug) {
		
		VelocityText.t = "Velocity: " + player.velocityX + ", " + player.velocityY;
		VelocityText.Draw();
		PosText.t = "Pos: " + player.x + ", " + player.y;
		PosText.Draw();
		CoinText.t = "Coins:" + coins;
		CoinText.Draw();
		HealthText.t = "HP:" + player.health;
		HealthText.Draw();
	}
}
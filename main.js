const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let debug = true;

// Variables
let xView = 0;
let yView = 0;
let player;
let coins = 0;
let gravity;
let keys = {};
let objects = [];
let mousePos;
let runningId = -1;
let deltaTime;

let VelocityText;

// Event Listeners
document.addEventListener('keydown', function (evt) {
	keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
	keys[evt.code] = false;
});
document.addEventListener("click", function (evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

function Start () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	ctx.font = "20px sans-serif";
	gravity = 0.2;
	let fpslimit = 120;
	let INTERVAL = 1000 / fpslimit;
	deltaTime = INTERVAL / 1000;

	if (debug){
		object = new Object(100, 300, 1000, 20, '#666');
		//objects.push(object);
		button = new Button(600, 250, 10, 10, '#0003FF', 1);
		//objects.push(button);
		
		button1 = new Button(700, 250, 10, 10, '#47FF00', 2);
		//objects.push(button1);
		
		Aobject = new ActiveObject(200, 200, 50, 100, '#666', 1, 100, 200);
		//objects.push(Aobject);
	}
	map = new Map("map1");

	player = new Player(100, 950, 50, 50, '#FF5858');
	objects.push(player);
	
	var vWidth = Math.min(map.sizeX, canvas.width);
	var vHeight = Math.min(map.sizeY, canvas.height);
	
	var camera = new Camera(0, 0, vWidth, vHeight, map.sizeX, map.sizeY);
	camera.follow(player, vWidth / 2, vHeight / 2);
	
	
	CoinText = new Text("Coins: " + 0, 25, 25, "left", "#212121", "20");
	HealthText = new Text("HP: " + 0, 25, 50, "left", "#212121", "20");
	VelocityText = new Text("Velocity: " + 0, 25, 75, "left", "#212121", "20");
	PosText = new Text("Pos: " + 0, 25, 100, "left", "#212121", "20");
	CursorPos = new Text("CursorPos: " + 0, 25, 125, "left", "#212121", "20");
	isGrounded = new Text("isGrounded: " + 0, 25, 150, "left", "#212121", "20");

	if (runningId == -1) {
		runningId = setInterval(function() {
			Update();
		}, INTERVAL);
	}
}

function Stop() {
	objects = [];
	player;
	map = [];
	clearInterval(runningId);
	runningId = -1;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function Update () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	camera.Update();
	
	for (let i = 0; i < objects.length; i++) {
		let object = objects[i];

		object.Animate();
	}
	
	
	
	CoinText.text = "Coins:" + coins;
	CoinText.Draw();
	HealthText.text = "HP:" + player.health;
	HealthText.Draw();
	if (debug) {
		VelocityText.text = "Velocity: " + player.velocityX + ", " + player.velocityY;
		VelocityText.Draw();
		PosText.text = "Pos: " + player.x + ", " + player.y;
		PosText.Draw();
		CursorPos.text = "CursorPos:" + mousePos.x + ", " + mousePos.y;
		CursorPos.Draw();
		isGrounded.text = "isGrounded:" + player.grounded;
		isGrounded.Draw();
	}
}
class Object {
	constructor (x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

		this.speed = 0;
		this.friction = 1;

		this.movable = false;
		this.collidable = true;

		this.velocityX = 0;
		this.velocityY = 0;
		this.friction = 0.5;
		this.grounded = false;
	}
	
	Animate () {
		//Physics calculation
		if (this.movable) {
			if (this.velocityX > 0) {
				this.velocityX = Math.ceil((this.velocityX + Number.EPSILON) * 10) / 10;
			}
			else{
				this.velocityX = Math.floor((this.velocityX + Number.EPSILON) * 10) / 10;
			}
			this.velocityY = Math.floor((this.velocityY + Number.EPSILON) * 10) / 10;
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			this.grounded = false;
			this.y += this.velocityY;
			this.x += this.velocityX;
			this.airFrictionMultiplier = 0.35;
			this.groundFrictionMultiplier = 0.5;
			if (this.collidable) {
				for (let i = 0; i < objects.length; i++) {
					let object = objects[i];
					if (object != this) {
						if (this.CheckCollision(this, object) && object.collidable) {
							if (object.movable) {
								this.CheckForMove(object);
							} else {
								this.CheckPart(object);
							}
						}
					}
				}
			}
			if (!this.grounded){
				this.velocityY += gravity;
				if (this.velocityX > this.friction * this.airFrictionMultiplier) {
					this.velocityX -= this.friction * this.airFrictionMultiplier;
				} else if (this.velocityX < -this.friction * this.airFrictionMultiplier) {
					this.velocityX += this.friction * this.airFrictionMultiplier;
				} else {
					this.velocityX = 0;
				}
			} else {
				if (this.velocityX > this.friction * this.groundFrictionMultiplier) {
					this.velocityX -= this.friction * this.groundFrictionMultiplier;
				} else if (this.velocityX < -this.friction * this.groundFrictionMultiplier) {
					this.velocityX += this.friction * this.groundFrictionMultiplier;
				} else {
					this.velocityX = 0;
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
				this.velocityX = 0;
			} else {
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
				this.velocityX = 0;
			} else {
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
				this.velocityX = 0;
			} else {
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
				this.velocityX = 0;
			} else {
				this.y = (object.y + object.height); // mb bug
			}
		}
	}
	
	CheckForMove (object) {
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
				object.x -= x;
			} else {
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
				object.x += x;
			} else {
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
				object.x += x;
			} else {
				object.y -= y;
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
				object.x -= x;
			} else {
				object.y -= y;
			}
		}
	}

	Move (speed) {
		if (this.velocityX < this.speed && this.velocityX > -this.speed) {
			this.velocityX += speed * 10 * deltaTime;
		}
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
		this.movable = true;
		this.speed = 3.5;
		this.health = 100;
		this.dead = false;

		this.jumpCycle = 0;
	}

	Animate(){
		// Keys check
		if (!this.dead) {
			if (keys['Space'] || keys['KeyW']) {
				this.Jump();
			}
			if (keys['KeyD']) {
				this.Move(this.speed);
			} else if (keys['KeyA']){
				this.Move(-this.speed);
			}
		} else {
			let num1 = this.height / 10;
			let num2 = this.width / 10;
			for (let i = 0; i < num1; i++) {
				for (let j = 0; j < num2; j++) {
					let obj = new MovableObject(this.x + i * 10, this.y + j * 10, 10, 10, this.color = "#000");
					obj.velocityX = this.velocityX + 3;
					obj.velocityY = this.velocityY - 10;
					objects.push(obj);
				}
			}
			player.x = 10000;
			player.y = 10000;
			player.movable = false;
			player.dead = false;
			//objects.splice(objects.indexOf(this));
		}

		super.Animate();

		if (player.y > 5000) {
			player.y = -500;
		}
	}
	
	Damage (damage) {
		if (this.health - damage <= 0){
			this.health = 0;
			this.dead = true;
		} else {
			this.health -= damage;
		}
	}

	Jump () {
		if (this.grounded) {
			this.jumpCycle = 1;
			if (this.velocityY > -this.jumpForce) {
				this.velocityY = -this.jumpForce / 20;
			}
		}
		else if (this.jumpCycle > 0 && this.jumpCycle < 15) {
			this.jumpCycle++;
			this.velocityY = -(this.jumpForce / 1.4) - (this.jumpCycle / 50);
		}
	}
}

class Coin extends Object {
	constructor (x, y, width, height, color) {
		super(x, y, width, height, color);
		this.exists = true;
		this.collidable = false;
	}
	
	Pick () {
		coins++;
		this.exists = false;
		for( var i = 0; i < objects.length; i++){
			if ( objects[i] == this) {
				objects.splice(i, 1);
			}
		}
	}

	Animate() {
		super.Animate();
		for (let i = 0; i < objects.length; i++) {
			let object = objects[i];
			if (object != this) {
				if (this.CheckCollision(this, object) && object.collidable) {
					this.Pick();
				}
			}
		}
	}
}

class Spike extends Object {
	constructor (x, y, width, height, color) {
		super(x, y, width, height, color);
		this.damage = 1;
	}
	
	Animate() {
		super.Animate();
		for (let i = 0; i < objects.length; i++) {
			let object = objects[i];
			if (object != this) {
				if (this.CheckCollision(this, object) && object.collidable) {
					if (object.constructor === Player) {
						player.Damage(this.damage);
					}
				}
			}
		}
	}
}

class Button extends Object {
	constructor (x, y, width, height, color, id) {
		super(x, y, width, height, color);
		this.id = id;
		this.collidable = false;
	}
	
	Animate() {
		super.Animate();
		for (let i = 0; i < objects.length; i++) {
			let object = objects[i];
			if (object != this) {
				if (this.CheckCollision(this, object) && object.collidable) {
					if (object.constructor === Player) {
						this.ActivateObject();
						
					}
				}
			}
		}
	}
	
	ActivateObject() {
		for (let i = 0; i < objects.length; i++) {
			let object = objects[i];
			if (object != this) {
				if (object.constructor == ActiveObject) {
					if (this.id == object.id) { object.Activate(); }
				}
				
			}
		}
	}
}

class ActiveObject extends Object {
	constructor (x, y, width, height, color, id, moveX, moveY) {
		super(x, y, width, height, color);
		this.id = id;
		this.startX = x;
		this.startY = y;
		this.moveX = moveX;
		this.moveY = moveY;
		this.activated = false; // в движении ли объект
		this.pos = false; // false - исходная позиция, true - новая позиция
	}
	
	MoveNow() {
		if (this.activated == true){
			if (this.pos == false){
				if (this.x < this.moveX){ this.x += 1; }
				else { this.x -= 1; }
				
				if (this.y < this.moveY){ this.y += 1; }
				else { this.y -= 1; }
			}
			else if (this.pos == true){
				if (this.x > this.startX){ this.x -= 1; }
				else { this.x += 1; }
				
				if (this.y > this.startY){ this.y -= 1; }
				else { this.y += 1; }	
			}
			if (this.x == this.moveX && this.y == this.moveY){
				this.pos = true;
				this.activated = false;
			} else if (this.x == this.startX && this.y == this.startY){
				this.pos = false;
				this.activated = false;
			}
		}
	}
	
	Activate(){
		this.activated = true;
	}
	
	Animate() {
		super.Animate();
		if (this.activated == true) { this.MoveNow(); }
	}
}

class MovableObject extends Object{
	constructor (x, y, width, height, color) {
		super(x, y, width, height, color);
		this.movable = true;
	}
}

class Text {
	constructor (text, x, y, align, color, size) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.align = align;
		this.color = color;
		this.size = size;
	}

	Draw () {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.font = this.s + "px sans-serif";
		ctx.textAlign = this.a;
		ctx.fillText(this.text, this.x, this.y);
		ctx.closePath();
	}
}

class Map {
	constructor (mapIndex) {
		this.map = Maps[mapIndex];
		for (let i = 0; i < this.map.objects.length; i++) {
			let mapObject = this.map.objects[i];
			objects.push(mapObject);
		}
	}
}
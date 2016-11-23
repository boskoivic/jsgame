


function spriteClass (imageClass,x,y,rotation=0){
	this.imageClass = imageClass;
	this.x = x;
	this.y = y;
	this.width = imageClass.sourceWidth;              //width and height will in almost all cases be same as sourceWidth and sourceHeight,
	this.height = imageClass.sourceHeight;            //this code allows for them to be changed with spriteClass.width/height = something;
	this.rotation = rotation;
	sprites.push(this);
	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	}
}


function aspriteClass (imageClass, x, y, rotation=0){
	this.imageClass = imageClass;
	this.x = x;
	this.y = y;
	this.dx =
	this.width = imageClass.sourceWidth;              //width and height will in almost all cases be same as sourceWidth and sourceHeight,
	this.height = imageClass.sourceHeight;            //this code allows for them to be changed with spriteClass.width/height = something;
	this.rotation = rotation;
	sprites2.push(this);
	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	},
	this.render = function render(ctx) {
		ctx.drawImage( 
			imageClass.imageFile,
		 	imageClass.sourceX,
		  	imageClass.sourceY,
			this.width, 
			this.height
			);
	}
}

/***LESSON ON private properties
// By convention, private properties are always prefixed by an underscore character (_). The underscore
// indicates that you shouldn’t change the property directly in your main game code, but only access or change
// it through a getter/setter. That’s because the object might need to validate a value or do some calculation
// before it can return the value.
*/


class DisplayObject {
	constructor() {
		//The sprite's position and size
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		//Rotation, alpha, visible, and scale properties
		this.rotation = 0;
		this.alpha = 1;
		this.visible = true;
		this.scaleX = 1;
		this.scaleY = 1;
		//`pivotX` and `pivotY` let you set the sprite's axis of rotation
		//(o.5 represents the sprite's center point)
		this.pivotX = 0.5;
		this.pivotY = 0.5;
		//Add `vx` and `vy` (velocity) variables that will help you move the sprite
		this.vx = 0;
		this.vy = 0;
		//A "private" `_layer` property
		this._layer = 0;
		//A `children` array on the sprite that will contain all the
		//child sprites in this container
		this.children = [];
		//The sprite's `parent` property
		this.parent = undefined;
		//The sprite's `children` array
		this.children = [];
		//Optional drop shadow properties.
		//Set `shadow` to `true` if you want the sprite to display a shadow
		this.shadow = false;
		this.shadowColor = "rgba(100, 100, 100, 0.5)";
		this.shadowOffsetX = 3;
		this.shadowOffsetY = 3;
		this.shadowBlur = 3;
		//Optional blend mode property
		this.blendMode = undefined;
		//Properties for advanced features:
		//Image states and animation
		this.frames = [];
		this.loop = true;
		this._currentFrame = 0;
		this.playing = false;
		//Can the sprite be dragged?
		this._draggable = undefined;
		//Is the sprite circular? If it is, it will be given a `radius`
		//and `diameter`
		this._circular = false;
		//Is the sprite `interactive`? If it is, it can become clickable
		//or touchable
		this._interactive = false;
	}
	/* Essentials */
	//Global position
	get gx() {
		if (this.parent) {
			//The sprite's global x position is a combination of
			//its local x value and its parent's global x value
			return this.x + this.parent.gx;
		} else {
			return this.x;
		}
	}
	get gy() {
			if (this.parent) {
				return this.y + this.parent.gy;
			} else {
				return this.y;
			}
		}
	//Depth layer
	get layer() {
		return this._layer;
	}
	set layer(value) {
			this._layer = value;
			if (this.parent) {
				this.parent.children.sort((a, b) => a.layer - b.layer);
			}
		}
	//The `addChild` method lets you add sprites to this container
	addChild(sprite) {
		if (sprite.parent) {
			sprite.parent.removeChild(sprite);
		}
		sprite.parent = this;
		this.children.push(sprite);
	}
	removeChild(sprite) {
		if (sprite.parent === this) {
			this.children.splice(this.children.indexOf(sprite), 1);
		} else {
			throw new Error(sprite + "is not a child of " + this);
		}
	}
	//Getters that return useful points on the sprite
	get halfWidth() {
		return this.width / 2;
	}
	get halfHeight() {
		return this.height / 2;
	}
	get centerX() {
		return this.x + this.halfWidth;
	}
	get centerY() {
			return this.y + this.halfHeight;
		}
	/* Conveniences */
	//A `position` getter. It returns an object with x and y properties
	get position() {
			return {
				x: this.x,
				y: this.y
			};
		}
	//A `setPosition` method to quickly set the sprite's x and y values
	setPosition(x, y) {
			this.x = x;
			this.y = y;
		}
	//The `localBounds` and `globalBounds` methods return an object
	//with `x`, `y`, `width`, and `height` properties that define
	//the dimensions and position of the sprite. This is a convenience
	//to help you set or test boundaries without having to know
	//these numbers or request them specifically in your code.
	get localBounds() {
		return {
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		};
	}
	get globalBounds() {
			return {
				x: this.gx,
				y: this.gy,
				width: this.gx + this.width,
				height: this.gy + this.height
			};
		}
	//`empty` is a convenience property that will return `true` or
	//`false` depending on whether this sprite's `children`
	//array is empty
	get empty() {
			if (this.children.length === 0) {
				return true;
			} else {
				return false;
			}
		}
	//The following "put" methods help you position
	//another sprite in and around this sprite. You can position
	//sprites relative to this sprite's center, top, right, bottom or
	//left sides. The `xOffset` and `yOffset`
	//arguments determine by how much the other sprite's position
	//should be offset from this position.
	//In all these methods, `b` is the second sprite that is being
	//positioned relative to the first sprite (this one), `a`
	//Center `b` inside `a`
	putCenter(b, xOffset = 0, yOffset = 0) {
			let a = this;
			b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
			b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;
		}
	//Position `b` above `a`
	putTop(b, xOffset = 0, yOffset = 0) {
			let a = this;
			b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
			b.y = (a.y - b.height) + yOffset;
		}
	//Position `b` to the right of `a`
	putRight(b, xOffset = 0, yOffset = 0) {
			let a = this;
			b.x = (a.x + a.width) + xOffset;
			b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;
		}
	//Position `b` below `a`
	putBottom(b, xOffset = 0, yOffset = 0) {
		let a = this;
		b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
		b.y = (a.y + a.height) + yOffset;
	}
	//Position `b` to the left of `a`
	putLeft(b, xOffset = 0, yOffset = 0) {
			let a = this;
			b.x = (a.x - b.width) + xOffset;
			b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;
		}
	//Some extra conveniences for working with child sprites
	//Swap the depth layer positions of two child sprites
	swapChildren(child1, child2) {
			let index1 = this.children.indexOf(child1),
				index2 = this.children.indexOf(child2);
			if (index1 !== -1 && index2 !== -1) {
				//Swap the indexes
				child1.childIndex = index2;
				child2.childIndex = index1;
				//Swap the array positions
				this.children[index1] = child2;
				this.children[index2] = child1;
			} else {
				throw new Error(`Both objects must be a child of the caller ${this}`);
			}
		}
	//`add` and `remove` let you add and remove many sprites at the same time
	add(...spritesToAdd) {
		spritesToAdd.forEach(sprite => this.addChild(sprite));
	}
	remove(...spritesToRemove) {
			spritesToRemove.forEach(sprite => this.removeChild(sprite));
		}
	/* Advanced features */
	//If the sprite has more than one frame, return the
	//value of `_currentFrame`
	get currentFrame() {
			return this._currentFrame;
		}
	//The `circular` property lets you define whether a sprite
	//should be interpreted as a circular object. If you set
	//`circular` to `true`, the sprite is given `radius` and `diameter`
	//properties. If you set `circular` to `false`, the `radius`
	//and `diameter` properties are deleted from the sprite
	get circular() {
		return this._circular;
	}
	set circular(value) {
			//Give the sprite `diameter` and `radius` properties
			//if `circular` is `true`
			if (value === true && this._circular === false) {
				Object.defineProperties(this, {
					diameter: {
						get() {
							return this.width;
						},
						set(value) {
							this.width = value;
							this.height = value;
						},
						enumerable: true,
						configurable: true
					},
					radius: {
						get() {
							return this.halfWidth;
						},
						set(value) {
							this.width = value * 2;
							this.height = value * 2;
						},
						enumerable: true,
						configurable: true
					}
				});
				//Set this sprite's `_circular` property to `true`
				this._circular = true;
			}
			//Remove the sprite's `diameter` and `radius` properties
			//if `circular` is `false`
			if (value === false && this._circular === true) {
				delete this.diameter;
				delete this.radius;
				this._circular = false;
			}
		}
		//Is the sprite draggable by the pointer? If `draggable` is set
		//to `true`, the sprite is added to a `draggableSprites`
		//array. All the sprites in `draggableSprites` are updated each
		//frame to check whether they're being dragged.
		//(You’ll learn how to implement this in Chapter 6.)
	get draggable() {
		return this._draggable;
	}
	set draggable(value) {
			if (value === true) {
				draggableSprites.push(this);
				this._draggable = true;
			}
			//If it's `false`, remove it from the `draggableSprites` array
			if (value === false) {
				draggableSprites.splice(draggableSprites.indexOf(this), 1);
			}
		}
		//Is the sprite interactive? If `interactive` is set to `true`,
		//the sprite is run through the `makeInteractive` function.
		//`makeInteractive` makes the sprite sensitive to pointer
		//actions. It also adds the sprite to the `buttons` array,
		//which is updated each frame.
		//(You’ll learn how to implement this in Chapter 6.)
	get interactive() {
		return this._interactive;
	}
	set interactive(value) {
		if (value === true) {
			//Add interactive properties to the sprite
			//so that it can act like a button
			makeInteractive(this);
			//Add the sprite to the global `buttons` array so
			//it can be updated each frame
			buttons.push(this);
			//Set this sprite’s private `_interactive` property to `true`
			this._interactive = true;
		}
		if (value === false) {
			//Remove the sprite's reference from the
			//`buttons` array so that it's no longer affected
			//by mouse and touch interactivity
			buttons.splice(buttons.indexOf(this), 1);
			this._interactive = false;
		}
	}
}

function remove(...spritesToRemove) {
	spritesToRemove.forEach(sprite => {
		sprite.parent.removeChild(sprite);
	});
}

/* Chapter 4■ Making Sprites and a Scene Graph page 154*/
class Spriter extends DisplayObject {
	constructor(source, x = 0, y = 0) {
		//Call the DisplayObject's constructor
		super();
		//Assign the argument values to this sprite
		Object.assign(this, {
			x,
			y
		});
		//Is the source a JavaScript Image object?
		if(source instanceof Image) {
			this.createFromImage(source);
		}
		//It must be an array of image objects
		else if (source[0] instanceof Image){
			this.createFromImages(source);
		}			
	}
	createFromImage(source){
		//Throw an error if the source is not an Image object
		if (!(source instanceof Image)) {
			throw new Error(`${source} is not an image object`);
		}
		//Otherwise, create the sprite using an Image
		else {
			this.source = source;
			this.sourceX = 0;
			this.sourceY = 0;
			this.width = source.width;
			this.height = source.height;
			this.sourceWidth = source.width;
			this.sourceHeight = source.height;
		}
	}
	
	createFromImages(source) {
			this.frames = source;
			this.source = source[0];
			this.sourceX = 0;
			this.sourceY = 0;
			this.width = source[0].width;
			this.height = source[0].width;
			this.sourceWidth = source[0].width;
			this.sourceHeight = source[0].height;
		}
		//Add a `gotoAndStop` method to go to a specific frame
	gotoAndStop(frameNumber) {
			if (this.frames.length > 0 && frameNumber < this.frames.length) {
				//a. Frames made from tileset subimages.
				//If each frame is an array, then the frames were made from an
				//ordinary Image object using the `frames` method
				if (this.frames[0] instanceof Array) {
					this.sourceX = this.frames[frameNumber][0];
					this.sourceY = this.frames[frameNumber][1];
				}
				//b. Frames made from texture atlas frames.
				//If each frame isn't an array, and it has a subobject called `frame`,
				//then the frame must be a texture atlas ID name.
				//In that case, get the source position from the atlas's `frame` object
				else if (this.frames[frameNumber].frame) {
					this.sourceX = this.frames[frameNumber].frame.x;
					this.sourceY = this.frames[frameNumber].frame.y;
					this.sourceWidth = this.frames[frameNumber].frame.w;
					this.sourceHeight = this.frames[frameNumber].frame.h;
					this.width = this.frames[frameNumber].frame.w;
					this.height = this.frames[frameNumber].frame.h;
				}
				//c. Frames made from individual Image objects.
				//If neither of the above is true, then each frame must be
				//an individual Image object
				else {
					this.source = this.frames[frameNumber];
					this.sourceX = 0;
					this.sourceY = 0;
					this.width = this.source.width;
					this.height = this.source.height;
					this.sourceWidth = this.source.width;
					this.sourceHeight = this.source.height;
				}
				//Set the `_currentFrame` value to the chosen frame
				this._currentFrame = frameNumber;
			}
			//Throw an error if this sprite doesn't contain any frames
			else {
				throw new Error(`Frame number ${frameNumber} does not exist`);
			}
		}
		//The `render` method
	render3(ctx) {
		ctx.drawImage(this.source, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, -this.width * this.pivotX, -this.height * this.pivotY, this.width, this.height);
	}
}

//A higher-level wrapper
function sprite(source, x, y) {
	let sprite = new Spriter(source, x, y);
	stage.addChild(sprite);
	return sprite;
}





function physicsClass (imageClass,x,y,rotation=0,airResistance=0.2,velocityY=0,velocityX=0){
 	this.velocityY = velocityY;
	this.velocityX = velocityX;
	this.airResistance = airResistance;				//trenje zraka na objekt, MORA BITI IZMEĐU 0 i 1
	spriteClass.call(this,imageClass,x,y,rotation);
	physicals.push(this);
}



function shipClass (imageClass,x,y,health=50,airResistance=0.2,acceleration=0){
	this.acceleration = acceleration;
	this.maxHealth=health;
	this.health=health;
	this.AI=null;											//snaga pogona objekta, tj. koliko brzo može ubrzati
	this.collisionRadius = (imageClass.sourceWidth+imageClass.sourceHeight)/4.55;			
	physicsClass.call(this,imageClass,x,y,0,airResistance,0,0);
	ships.push(this);
	solids.push(this);

	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	}

	this.createAi = function(target = playership){
		this.AI= new pilotAiClass(target);
		AIs.push(this);
	}

		//this function is the BRAIN of the AI, it determines what commands it gives, so it only runs for AI's object instances each loop
	this.updateAi = function(){

		// calculating desired rotation of the AI
		this.rotation = this.rotation % 360;
		let angle = Math.atan2 (this.y - this.AI.target.y,this.x - this.AI.target.x) / Math.PI * 180;

		//calculating in which direction to turn to achieve desired rotation the fastest
		let angleCheck = Math.abs ((this.rotation - (angle)) % 360);
		//console.log(angleCheck+"ddddddd"+(angleCheck-180));
		
		//turning
		if (angleCheck > 0 && angleCheck < 180){
			this.AI.moveLeft = true;
			this.AI.moveRight = false;
		}else{

			this.AI.moveLeft = false;
			this.AI.moveRight = true;			
		}

		//console.log(Math.sqrt (Math.pow (this.ship.y - this.target.y,2) + Math.pow (this.ship.x - this.target.x,2)));
		if (180 - angleCheck < 15) {
			if (this.AI.broadsideRange > Math.sqrt (Math.pow (this.y - this.AI.target.y,2) + Math.pow (this.x - this.AI.target.x,2))){
				this.AI.moveUp = false;
				this.AI.shoot = true;
			}else{
				this.AI.moveUp = true;
				this.AI.shoot = false;
			}
		}else{
			this.AI.shoot = false;
			this.AI.moveUp = false;
		}
	}



	//this function CARRIES OUT commands in the pilotAiClass Object, whether they were put there by the player or pilotAiClass.update(),
	//as such, this function must run each loop for the player's pilotAiClass Object aswell as for all of the AI's object instances 
	this.inputProcesorAi = function() {
		//reacts to input
		//Up
		if ( this.AI.moveUp ) {
			this.velocityY += this.acceleration * Math.sin( this.rotation * Math.PI / 180 );
			this.velocityX += this.acceleration * Math.cos( this.rotation * Math.PI / 180 );
			//draw thruster plume particle effect
			thrusterPlume(this.x + this.width / 2 - 20 * Math.cos( this.rotation * Math.PI / 180 ) ,this.y+this.height/2 -20 * Math.sin(this.rotation * Math.PI / 180 ),this.rotation );
		}
		//shoot
		if ( this.AI.shoot ) {
			new bulletClass(this.rotation,this.x+this.width/2+30 * Math.cos( this.rotation * Math.PI / 180 ),this.y+this.height/2+30 * Math.sin( this.rotation * Math.PI / 180 ));
		}

		//Left
		if ( this.AI.moveLeft ) {
			this.rotation -= 5;
		}
		//Right
		if ( this.AI.moveRight ) {
			this.rotation += 5;
		}
	}

}



function pilotAiClass (ship,target = playership){
	this.target = target;
	this.moveUp = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.shoot = false;
	this.broadsideRange = 400;
}



function solidClass (imageClass,x,y,health=25,airResistance=0.2){
	this.collisionRadius = (imageClass.sourceWidth + imageClass.sourceHeight) / 4.55;
	this.maxHealth = health;
	this.health = health;		
	physicsClass.call (this,imageClass,x,y,0,airResistance,0,0);
	solids.push (this);

	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	}
}



function bulletClass (rotation,x,y,damage=3,velocity=30) {
	let velocityY = velocity * Math.sin( rotation * Math.PI / 180 );
	let velocityX = velocity * Math.cos( rotation * Math.PI / 180 );
	this.damage=damage;
	this.collisionRadius = (bulletImg.sourceWidth + bulletImg.sourceHeight) / 7;
	physicsClass.call (this,bulletImg,x-10,y-6,rotation,0,velocityY,velocityX);
	bullets.push (this);
}










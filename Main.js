

let canvas = makeCanvas(2524, 1650);
/*The stage is the root parent container for all the sprites, 
// so that’s the first new thing we should make. 
// The stage is just a sprite that doesn’t display any of its own graphics. 
// That means you can create the stage directly from the DisplayObject, with this syntax: */

var stage = new DisplayObject();
stage.width = canvas.width;
stage.height = canvas.height;



//Game map setup
var mapWidth = 7400;
var mapHeight = 4700;
var backgroundZoom = 1;   //1 is normal, less than 1 is zoom IN, more than 1 is zoom OUT

/*backgroundImg.sourceWidth = screenWidth*backgroundZoom;
backgroundImg.sourceHeight = screenHeight*backgroundZoom;
var background = new spriteClass(backgroundImg,0,0,0);  //creating the background sprite
removeObject(background, sprites);     //remove background sprite from sprites rendering array because it has it's own rendering code

*///The canvas and its drawing surface
/*var canvas = document.querySelector( "canvas" );
var canvas.ctx = canvas.getContext( "2d" );
var screenHeight = canvas.height;
var screenWidth = canvas.width;
var halfScreenWidth = screenWidth/2;     //these 2 half variables are used a lot in the program so they are calculated here for optimization
var halfScreenHeight = screenHeight/2;*/

canvas.ctx.font = "130px Arial";
canvas.ctx.fillText("Hello World Hello World Hello World vvHello World Hello World ",1133,2333);

//------------ SETING UP PLAYER INPUT LISTENERS ------------
//Player commands
var Controlls = { // NOT YET IMPLEMENTED
	 moveUp : false,
	 moveDown : false,
	 moveRight : false,
	 moveLeft : false,
	 shoot : false,
}

//Player commands
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
var shoot = false;
var toogleUI = false;

//Used keys key codes
var keyboardKeys = {
	UP : 38,
	DOWN : 40,
	RIGHT : 39,
	LEFT : 37,
	SPACE : 32,
	A : 56,
	S : 83,
	D : 68,
	ALT : 16,
	CTRL : 17,
	SHIFT : 9,
	NUMBER_1 : 49,
	NUMBER_2 : 50,
	NUMBER_3 : 51,
	NUMBER_4 : 52,
};


//Add keyboard listeners
window.addEventListener( "keydown", function( event ) {
	switch ( event.keyCode ) {
		case keyboardKeys.UP:
			playership.AI.moveUp = true;
			break;
		case keyboardKeys.LEFT:
			playership.AI.moveLeft = true;
			break;
		case keyboardKeys.RIGHT:
			playership.AI.moveRight = true;
			break;
		case keyboardKeys.SPACE:
			playership.AI.shoot = true;
			break;
		case keyboardKeys.S:
			toogleUI = true;
			break;
	}
}, false );
window.addEventListener( "keyup", function( event ) {
	switch ( event.keyCode ) {
		case keyboardKeys.UP:
			playership.AI.moveUp = false;
			break;
		case keyboardKeys.LEFT:
			playership.AI.moveLeft = false;
			break;
		case keyboardKeys.RIGHT:
			playership.AI.moveRight = false;
			break;
		case keyboardKeys.SPACE:
			playership.AI.shoot = false;
			break;
		case keyboardKeys.S:
			toogleUI = false;
			console.log("render3 "+render3(canvas));
			console.log("stage children "+stage.children);
			break;
	}
}, false );

/*var Earth = new spriteClass(earthImg, 1511,2101);
var Moon = new spriteClass(moonImg, 2211,601);
Earth.resize(0.6);
Moon.resize(0.07);
var arrow = new spriteClass(arrowImg, 611,2101,90);
*/var arrow2 = new sprite(arrowImg, 611,1101,-90);

var Earth2 = new sprite(earthImg, 1511,2101);
var Moon2 = new sprite(moonImg, 2211,601);
/*Earth2.resize(2);
Moon2.resize(0.07);*/
var arrow2 = new sprite(arrowImg, 661,2101,90);
var arrow22 = new sprite(arrowImg, 0, 0);
var arrow25 = new sprite(arrowImg, 0, 0);
console.log(arrow22);

/*var dash = new spriteClass(dashImg, 781,1801,-90);
dash.resize(1.5);
var dash2 = new spriteClass(dashImg, 1171,2201,90);
dash2.resize(1.5);
*/
var chat1 = new spriteClass(chat1Img, 1561,2021);

canvas.ctx.font = "130px Arial";
canvas.ctx.fillText("Hello World Hello World Hello World vvHello World Hello World ",1133,2333);


var bosko = new spriteClass(boskoImg, 1511,2101);
bosko.resize(0.3);
var bosko2 = new aspriteClass(boskoImg, 1011,501);
bosko2.resize(3);

//creating player object
var playership = new shipClass(playerImg,1133,2333,1000,0.1,1);
playership.resize(0.5);
playership.createAi();//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk bug možda
removeObject(playership, AIs);


//some environment objects
var player2 = new shipClass(playerImg,533,2633);
var comet = new solidClass(meteorImg,1111,2111);
comet.resize(2.3);
new solidClass(meteorImg,1861,1511);
new solidClass(meteorImg,2861,2001);
new solidClass(meteorImg,61,1001);
new solidClass(meteorImg,211,201);
new solidClass(meteorImg,711, 4101);

var mesto = ["1","asa","asdss"];
mesto.forEach(sprite => {
	console.log("EVO 1 !");
		//Display a sprite

	});
/*var enemy = new shipClass(playerImg, 1500, 2000,33,0.1,1);
enemy.resize(0.5);
enemy.airResistance=0.1;
enemy.createAi();

var enemy2 = new shipClass(playerImg, 1000, 2000,100,0.1,1);
enemy2.resize(1.3);
enemy2.createAi();

var enemy3 = new shipClass(charmanderImg, 2000, 2000,33,0.1,1);
enemy3.createAi();*/

var meteorImg = new Image();
meteorImg.addEventListener("load", loadHandler, false);
meteorImg.src = "PlaceholderGraphics/Meteor2.png";

/*var head = new solidClass(commanderImg, 711,2101);
head.health = 100;
*/
var spaceStation = new solidClass(spaceStationImg, 851,1801);
spaceStation.resize(0.5);
spaceStation.maxHealth = 1000;
spaceStation.health = 1000;

assets.load([
	"PlaceholderGraphics/Meteor2.png",
	"PlaceholderGraphics/spaceship.png",
	"PlaceholderGraphics/spaceship.png"
]);

var Meteor = assets["PlaceholderGraphics/Meteor2.png"];
var bosko = new Spriter(Meteor, 1511,2101);
console.log(bosko);

function loadHandler() {
	update();
}




function update() {
	var playerUI = $('.player');
		if ( toogleUI ) {
			playerUI.css( "display", "block" );
		}
		else{
			playerUI.css( "display", "none" );
		}
	//The animation loop
	requestAnimationFrame( update, canvas );
	//Run the game's AIs and react to player's and AI's input commands
	inputsProcesor();
	//center the camera on the player
	centerCamera(playership.x,playership.y);
	//keep the player inside the map
	mapBoundaryCollision();
	//apply physics to all sprites
	physics();
	//check for collisions
	collisionDetect();
	//Render all sprites
	render3();
}



function inputsProcesor() {
	AIs.forEach(ship =>{
		ship.updateAi();
		ship.inputProcesorAi();
	});
	playership.inputProcesorAi();
}



function physics() {
	physicals.forEach(drawPhysics);
	//applyes physics to all objects in the game
		function drawPhysics (physicals) {
			//Move the sprite
			physicals.x += physicals.velocityX;
			physicals.y += physicals.velocityY;
			//Lower the physicals's velocity to simulate air resistance
			physicals.velocityY -= physicals.velocityY * physicals.airResistance;
			physicals.velocityX -= physicals.velocityX * physicals.airResistance;
		}
}



function collisionDetect() {     // KOMPLEKSNOST  O(n2)  !!!!!  treba biti optimizirano

	var solidsLen=solids.length;
	if ( solidsLen !== 0 ) {
		if ( bullets.length !== 0 ) {
			//check if any bullet is colliding with any solid
			for (var i = 0 ; i < bullets.length; i++ ){
				let bullet =  bullets[ i ];
				//Check if bullets[i] is out of screen, if it is, delete that bullet
				if ( outOfScreen(bullet.x ,bullet.y) ) {
					removeObject(bullet,physicals);
					removeObject(bullet,bullets);
					removeObject(bullet,sprites);
				}
				else{
					//check if bullets[i] is colliding with any solid
					for ( var y = 0; y <  solidsLen; y++ ) {
						hitTestCircle (bullet, solids[y]);
						if (hitTestCircle (bullet, solids[y]) ){
							smallExplosion (bullet.x,bullet.y);
							solids[y].health -= bullet.damage;
							removeObject (bullet, bullets);
							removeObject (bullet, sprites);
							if ( solids[y].health < 0 ){
								removeAi (solids[y]);
								removeObject (solids[y], sprites);
								removeObject (solids[y], physicals);
								removeObject (solids[y], AIs);
								removeObject (solids[y], solids);
						
							}
						}
					}	

				}
			}
		}
		//check whether any solid is colliding with any other solid
		for(var i=0 ; i < solidsLen; i++ ){
			for(var  y = i+1 ; y < solidsLen; y++ ){
				if (hitTestCircle(solids[i], solids[y])){
					//handle all the aspects of collision betwen 2 solids
					solidsHaveCollided(solids[i],solids[y]);
				}
			}
		}
	}
}



function render() {

	//Get a reference to the drawing context
	let ctx = canvas.ctx;
	//Clear the previous animation frame
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	//Loop through each sprite object in the stage's `children` array
	//draw the background
	ctx.drawImage( backgroundImg.imageFile, backgroundImg.sourceX, backgroundImg.sourceY, backgroundImg.sourceWidth, backgroundImg.sourceHeight, 0, 0,
	canvas.width * backgroundZoom, canvas.height * backgroundZoom );
	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			let sprite = sprites[ i ];
			let spriteImage = sprite.imageClass;
			if ( true ) {
				//Save the current state of the drawing surface before it's rotated
				ctx.save();
				//Rotate the canvas
				ctx.translate( Math.floor( sprite.x + ( sprite.width / 2 ) )-cameraPosX, Math.floor( sprite.y + ( sprite.height / 2 ) ) -cameraPosY);
				//rotiranje sprajta
				ctx.rotate( ( sprite.rotation ) * Math.PI / 180 );
				ctx.drawImage( spriteImage.imageFile, spriteImage.sourceX, spriteImage.sourceY, spriteImage.sourceWidth, spriteImage.sourceHeight, -sprite.width / 2, -sprite.height / 2,
				sprite.width, sprite.height );
				//Restore the drawing surface to its state before it was rotated
				ctx.restore();
			}
		}
	}
	//calculate and render particle system
	moveAndRenderParticles();
	//draw healthbars
	solids.forEach(drawHealthBar);
}

function render2() {
	//Get a reference to the drawing context
	let ctx = canvas.ctx;
	//Clear the previous animation frame
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	//Loop through each sprite object in the stage's `children` array
	sprites2.forEach(sprite => {
		displaySprite(sprite);
	});
	//Loop through all the sprites and use their properties to display them
	function displaySprite(sprite) {
		let spriteImage = sprite.imageClass;
		//Save the current state of the drawing surface before it's rotated
		ctx.save();
		//Rotate the canvas
		ctx.translate( Math.floor( sprite.x + ( sprite.width / 2 ) )-cameraPosX, Math.floor( sprite.y + ( sprite.height / 2 ) ) -cameraPosY);
		//rotiranje sprajta
		ctx.rotate( ( sprite.rotation ) * Math.PI / 180 );		
		//Use the sprite's own `render` method to draw the sprite
		sprite.render(ctx);	
		//Restore the drawing surface to its state before it was rotated
		ctx.restore();

	}
	//calculate and render particle system
	moveAndRenderParticles();
	//draw healthbars
	solids.forEach(drawHealthBar);
}

// A Full-featured Render Function
// Chapter 4 Making Sprites and a Scene Graph
// page 141
function render3() {
	//Get a reference to the context
	let ctx = canvas.ctx;
	//Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Loop through each sprite object in the stage's `children` array
	stage.children.forEach(sprite => {
		//Display a sprite
		displaySprite(sprite);
	});

	function displaySprite(sprite) {
		//Only display the sprite if it's visible
		//and within the area of the canvas
		if (sprite.visible && sprite.gx < canvas.width + sprite.width && sprite.gx + sprite.width >= -sprite.width && sprite.gy < canvas.height + sprite.height && sprite.gy + sprite.height >= -sprite.height) {
			//Save the canvas's present state
			ctx.save();
			//Shift the canvas to the center of the sprite's position
			ctx.translate(sprite.x + (sprite.width * sprite.pivotX), sprite.y + (sprite.height * sprite.pivotY));
			//Set the sprite's `rotation`, `alpha` and `scale`
			ctx.rotate(sprite.rotation);
			ctx.globalAlpha = sprite.alpha * sprite.parent.alpha;
			ctx.scale(sprite.scaleX, sprite.scaleY);
			//Display the sprite's optional drop shadow
			if (sprite.shadow) {
				ctx.shadowColor = sprite.shadowColor;
				ctx.shadowOffsetX = sprite.shadowOffsetX;
				ctx.shadowOffsetY = sprite.shadowOffsetY;
				ctx.shadowBlur = sprite.shadowBlur;
			}
			//Display the optional blend mode
			if (sprite.blendMode) ctx.globalCompositeOperation = sprite.blendMode;
			//Use the sprite's own `render` method to draw the sprite
			if (sprite.render) sprite.render(ctx);
			if (sprite.children && sprite.children.length > 0) {
				//Reset the context back to the parent sprite's top-left corner,
				//relative to the pivot point
				ctx.translate(-sprite.width * sprite.pivotX, -sprite.height * sprite.pivotY);
				//Loop through the parent sprite's children
				sprite.children.forEach(child => {
					//display the child
					displaySprite(child);
				});
			}
			//Restore the canvas to its previous state
			ctx.restore();
		}
	}
}
//----------------------- MANJE FUNKCIJE KOJE SE KORISTE U VELIKIMA -----------------------------

function solidsHaveCollided(solid1,solid2){
	let k = 1; //koeficijent restitucije, tj. mjera elastičnosti sudara, mora biti između 0 i 1, 0 je potpuno neelastičan, a 1 potpuno elastičan
	let center1x = solid1.x + solid1.width / 2;
	let center1y = solid1.y + solid1.height / 2;
	let center2x = solid2.x + solid2.width / 2;
	let center2y = solid2.y + solid2.height / 2;
	let combinedRadius = solid1.collisionRadius + solid2.collisionRadius;
	let impactX = center1x + (center2x - center1x) * (solid1.collisionRadius / combinedRadius);
	let impactY = center1y + (center2y - center1y) * (solid1.collisionRadius / combinedRadius);
	collisionSparks(impactX, impactY);
	console.log(impactX - solid1.x + impactY - solid1.y);
	solid1.x = solid1.x - (impactX - solid1.x) * 0.2;
	solid1.y = solid1.y - (impactY - solid1.y) * 0.2;
	solid2.x = solid2.x - (impactX - solid2.x) * 0.2;
	solid2.y = solid2.y - (impactY - solid2.y) * 0.2;	
	/*
	//calculating object speeds after the impact
	var momentumX=solid1.collisionRadius*solid1.velocityX+solid2.collisionRadius*solid2.velocityX;
	var momentumY=solid1.collisionRadius*solid1.velocityY+solid2.collisionRadius*solid2.velocityY;

	var solid1NewVelX=(momentumX+k*solid2.collisionRadius*(solid2.velocityX-solid1.velocityX))/combinedRadius;
	var solid1NewVelY=(momentumY+k*solid2.collisionRadius*(solid2.velocityY-solid1.velocityY))/combinedRadius;

	var solid2NewVelX=(momentumX+k*solid1.collisionRadius*(solid1.velocityX-solid2.velocityX))/combinedRadius;
	var solid2NewVelY=(momentumY+k*solid1.collisionRadius*(solid1.velocityY-solid2.velocityY))/combinedRadius;

	solid1.velocityX=solid1NewVelX;
	solid1.velocityY=solid1NewVelY;
	solid2.velocityX=solid2NewVelX;
	solid2.velocityY=solid2NewVelY;


	solid1.velocityX=((solid1.collisionRadius-solid2.collisionRadius)*solid1.velocityX+2*solid2.collisionRadius*solid2.velocityX)/combinedRadius;
	solid1.velocityY=((solid1.collisionRadius-solid2.collisionRadius)*solid1.velocityY+2*solid2.collisionRadius*solid2.velocityY)/combinedRadius;
	solid2.velocityX=((solid2.collisionRadius-solid1.collisionRadius)*solid1.velocityX+2*solid1.collisionRadius*solid1.velocityX)/combinedRadius;
	solid2.velocityY=((solid2.collisionRadius-solid1.collisionRadius)*solid1.velocityY+2*solid1.collisionRadius*solid1.velocityY)/combinedRadius;
	*/
}



function moveAndRenderParticles(){
	if ( particles.length !== 0 ) {
		for ( var i = 0; i < particles.length; i++ ) {
			var particle = particles[ i ];
			canvas.ctx.fillStyle=particle.color;
			canvas.ctx.fillRect(particle.x-cameraPosX-2,particle.y-cameraPosY-2,4,4);
			particle.x+=particle.velocityX;
			particle.y+=particle.velocityY;
			canvas.ctx.fillRect(particle.x-cameraPosX-2,particle.y-cameraPosY-2,4,4);
			particle.ttl--;
			if (particle.ttl<1){
				removeObject(particles[i], particles);
			}
		}
	}
}


function hitTestSprite(sprite) {
	//The `hit` variable will become `true` if the pointer is
	//touching the sprite and remain `false` if it isn't
	let hit = false;
	//Is the sprite ¸thouchable?
	if (sprite.thouchable) {
		//Yes, it is.
		//Get the position of the sprite's edges using global
		//coordinates
		let left = sprite.x,
			right = sprite.x + sprite.width,
			top = sprite.y,
			bottom = sprite.y + sprite.height;
		//Find out if the pointer is intersecting the rectangle.
		//`hit` will become `true` if the pointer is inside the
		//sprite's area
		hit = this.x > left && this.x < right && this.y > top && this.y < bottom;
	}
	return hit;
}

canvas.addEventListener("mousedown", hitTsestSprite,false);
function hitTsestSprite(event) {
	//Get the element that's firing the event
	let element = event.target;
	var sex = element.offsetLeft;
	console.log("playership "+ sex+ "levo"+sex.left);

	let x = event.clientX;
	let y = event.pageX;
/*	console.log("X "+ x +", pageX: "+ y);
*/}

function mapBoundaryCollision(){
	if (cameraPosX<0){
		playership.x=canvas.halfScreenWidth;
	}
	if (cameraPosY<0){
		playership.y=canvas.halfScreenHeight;
	}
	if (cameraPosX+canvas.width>mapWidth){
		playership.x=mapWidth-canvas.halfScreenWidth;
	}
	if (cameraPosY+canvas.height>mapHeight){
		playership.y=mapHeight-canvas.halfScreenHeight;
	}
}



function centerCamera(cenX,cenY){
	let x = cenX - canvas.halfScreenWidth;
	let y = cenY - canvas.halfScreenHeight;
	cameraPosX = x;
	cameraPosY = y;
	backgroundImg.sourceX = x;
	backgroundImg.sourceY = y;
}



function outOfScreen(x, y) {
	if (x < cameraPosX - 100 || y > cameraPosY + canvas.height + 100 || y < cameraPosY - 100 || x > cameraPosX + canvas.width + 100) {
		return true;
	}
	return false;
}

function removeObject(objectToRemove, array)
{
	let i = array.indexOf(objectToRemove);
	if (i !== -1)
	{
		array.splice(i, 1);
	}
}


function hitTestCircle(physicsClass1, physicsClass2){
	//Calculate the vector between the circles' center points
	let vx = physicsClass1.x + (physicsClass1.width/2) - physicsClass2.x - (physicsClass2.width/2);
	let vy = physicsClass1.y + (physicsClass1.height/2) - physicsClass2.y - (physicsClass2.height/2);
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	let magnitude = Math.sqrt(vx * vx + vy * vy);
	//Add together the circles' total radii
	let totalRadi = physicsClass1.collisionRadius + physicsClass2.collisionRadius;
	//Set hit to true if the distance between the circles is
	//less than their totalRadii
	return magnitude < totalRadi;
}

function customHitTestCircle(physicsClass1, physicsClass2){
	//Calculate the vector between the circles' center points
	let vx = physicsClass1.x + (physicsClass1.width/2) - physicsClass2.x - (physicsClass2.width/2);
	let vy = physicsClass1.y + (physicsClass1.height/2) - physicsClass2.y - (physicsClass2.height/2);
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	let vectorLenght = Math.sqrt(vx * vx + vy * vy);
	//Set hit to true if the distance between the circles is
	//less than their totalRadii
	console.log("hitTestCircle " + hitTestCircle);
	this.testRange = function(customRange){
		//Add together the circles' total radii
		var totalRadi = this.physicsClass1.customRange + this.physicsClass2.customRange;
		if (vectorLenght < totalRadi) {
			console.log("totalRadi " +totalRadi);
			return	vectorLenght < totalRadi
		}
	}
	return vectorLenght;
}



function distance(obj1, obj2){
	//Calculate the vector between the circles' center points
	let vx = obj1.x + (obj1.width/2) - obj2.x - (obj2.width/2);
	let vy = obj1.y + (obj1.height/2) - obj2.y - (obj2.height/2);
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	let magnitude = Math.sqrt(vx * vx + vy * vy);

	return magnitude;
}



function drawHealthBar(solid){
	let size=solid.maxHealth/solid.width;
	canvas.ctx.fillStyle="#FF0000";
	canvas.ctx.fillRect(solid.x-cameraPosX,solid.y-cameraPosY,Math.floor(solid.maxHealth/size),4);
	canvas.ctx.fillStyle="#00FF00";
	canvas.ctx.fillRect(solid.x-cameraPosX,solid.y-cameraPosY,Math.floor(solid.health/size),4);
} 
/*
//function drawPlayerUI(){
	//this.x = solid.x - cameraPosX;
	//this.y = solid.Y - cameraPosY;
	//this.$OuterDiv = document.createElement('div').append($('#player_ui').addClass("player"));

	//console.log($OuterDiv);
//}
//drawPlayerUI();*/
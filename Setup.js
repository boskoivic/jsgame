
//-------- LOADING ALL GRAPHICAL RESOURCES ---------

//Arrays to store all the objects in, so later main program functions only need to loop through an array specific to their purpose
var sprites = [];
var sprites2 = [];
var physicals = [];
var solids = [];      //doesn't have it's own object type, but uses physicsClass who's subclasses instances are added to it
var ships = [];
//var players = [];
var bullets = [];
var particles = [];
var AIs = [];
var weapons = [];

function makeCanvas(
	width = 2524, height = 1650,
	border = "1px black",
	backgroundColor = "white"
	){	
		//Make the canvas element and add it to the DOM
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.halfScreenWidth = canvas.width/2;
		canvas.halfScreenHeight = canvas.height/2;
		canvas.style.border = border;
		canvas.style.backgroundColor = backgroundColor;
		document.body.appendChild(canvas);
		//Create the context as a property of the canvas
		canvas.ctx = {};
		canvas.ctx = canvas.getContext("2d");
		
	//Return the canvas
	return canvas;
}

let assets = {
	//Properties to help track the assets being loaded
	toLoad: 0,
	loaded: 0,
	//File extensions for different types of assets
	imageExtensions: ["png", "jpg", "gif"],
	//The `load` method creates and loads all the assets. Use it like this:
	//`assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`
	load(sources) {
		//The `load` method will return a Promise when everything has loaded
		return new Promise(resolve => {
			//The `loadHandler` counts the number of assets loaded, compares
			//it to the total number of assets that need to be loaded, and
			//resolves the Promise when everything has loaded
			let loadHandler = () => {
				this.loaded += 1;
				console.log(this.loaded);
				//Check whether everything has loaded
				if (this.toLoad === this.loaded) {
					//Reset `toLoad` and `loaded` to `0` so you can use them
					//to load more assets later if you need to
					this.toLoad = 0;
					this.loaded = 0;
					console.log("Assets finished loading");
					//Resolve the promise
					resolve();
				}
			};
			//Display a console message to confirm that the assets are
			//being loaded
			console.log("Loading assets...");
			//Find the number of files that need to be loaded
			this.toLoad = sources.length;
			//Loop through all the source filenames and find out how
			//they should be interpreted
			sources.forEach(source => {
				//Find the file extension of the asset
				let extension = source.split(".").pop();
				//Load images that have file extensions that match
				//the imageExtensions array
				if (this.imageExtensions.indexOf(extension) !== -1) {
					this.loadImage(source, loadHandler);
				}
				//Display a message if a file type isn't recognized
				else {
					console.log("File type not recognized: " + source);
				}
			});
		});
	},
	loadImage(source, loadHandler) {
		//Create a new image and call the `loadHandler` when the image
		//file has loaded
		let image = new Image();
		image.addEventListener("load", loadHandler, false);
		//Assign the image as a property of the `assets` object so
		//you can access it like this: `assets["path/imageName.png"]`
		this[source] = image;
		//Set the image's `src` property to start loading the image
		image.src = source;
	}
}





//--- The sprite object 
function imageClass(src,sourceX,sourceY,sourceWidth,sourceHeight){
	this.imageFile = new Image();
	this.imageFile.src = src;				 //ja dodao, sadrži sliku sprajta objekta, treba je definirati za svaki novi objekt
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.sourceWidth = sourceWidth;
	this.sourceHeight = sourceHeight;
}



//Load all the images
var playerImg 		= new imageClass("PlaceholderGraphics/spaceship.png",0,0,128,128);
var bulletImg 		= new imageClass("PlaceholderGraphics/Bullet.png",0,0,20,12);
var backgroundImg 	= new imageClass("PlaceholderGraphics/Background.jpg",0,0,0,0); //last 4 arguments are changed in the main loop as player moves
var meteorImg 		= new imageClass("PlaceholderGraphics/Meteor2.png",0,0,56,59);
var charmanderImg	= new imageClass("PlaceholderGraphics/Charmander.gif",0,0,256,256);
var commanderImg 	= new imageClass("PlaceholderGraphics/head.png",0,0,556,556);
var commanderImg 	= new imageClass("PlaceholderGraphics/head.png",0,0,556,556);
var earthImg 		= new imageClass("PlaceholderGraphics/planet.png",0,0,1856,1856);
var moonImg 		= new imageClass("PlaceholderGraphics/moon.png",0,0,1856,1856);
var spaceStationImg = new imageClass("PlaceholderGraphics/spaceStation.png",0,0,1256,556);
var boskoImg 		= new imageClass("PlaceholderGraphics/me_as_neo.png",0,0,2556,2556);
var chat1Img 		= new imageClass("PlaceholderGraphics/chat1.png",0,0,2556,2556);
var arrowImg 		= new imageClass("http://www.pngall.com/wp-content/uploads/2016/07/Arrow-PNG-HD.png",0,0,556,556);
var dashImg 		= new imageClass("http://www.pngall.com/wp-content/uploads/2016/07/Arrow-PNG-File.png",0,0,556,556);

// ---------------------------- BUGS TO BE FIXED LATER !!! ----------------------------

//	AI rotation blindspot at a tiny angle to the right
//	collision reaction to be replaced with a bouncing system
//	bullet exit point not being scaled with the size of ship that is fireing it
 

/*  Chapter 3 ■ Working with Game Assets  */
/*let assets = {
		//Properties to help track the assets being loaded
		toLoad: 0,
		loaded: 0,
		//File extensions for different types of assets
		imageExtensions: ["png", "jpg", "gif"],
		fontExtensions: ["ttf", "otf", "ttc", "woff"],
		jsonExtensions: ["json"],
		audioExtensions: ["mp3", "ogg", "wav", "webm"],
		//The `load` method creates and loads all the assets. Use it like this:
		//`assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`
		load(sources) {
			//The `load` method will return a Promise when everything has loaded
			return new Promise(resolve => {
						//The `loadHandler` counts the number of assets loaded, compares
						//it to the total number of assets that need to be loaded, and
						//resolves the Promise when everything has loaded
						let loadHandler = () => {
							this.loaded += 1;
							console.log(this.loaded);
							//Check whether everything has loaded
							if (this.toLoad === this.loaded) {
								//Reset `toLoad` and `loaded` to `0` so you can use them
								//to load more assets later if you need to
								this.toLoad = 0;
								this.loaded = 0;
								console.log("Assets finished loading");
								//Resolve the promise
								resolve();
							}
						};
						//Display a console message to confirm that the assets are
						//being loaded
						console.log("Loading assets...");
						//Find the number of files that need to be loaded
						this.toLoad = sources.length;
						//Loop through all the source filenames and find out how
						//they should be interpreted
						sources.forEach(source => {
								//Find the file extension of the asset
								let extension = source.split(".").pop();
								//Load images that have file extensions that match
								//the imageExtensions array
								if (this.imageExtensions.indexOf(extension) !== -1) {
									this.loadImage(source, loadHandler);
								}
								//Load fonts
								else if (this.fontExtensions.indexOf(extension) !== -1) {
									this.loadFont(source, loadHandler);
								}
								//Load JSON files
								else if (this.jsonExtensions.indexOf(extension) !== -1) {
									this.loadJson(source, loadHandler);
								}
								//Load audio files
								else if (this.audioExtensions.indexOf(extension) !== -1) {
									this.loadSound(source, loadHandler);
								}
									//Display a message if a file type isn't recognized
									else {
										console.log("File type not recognized: " + source);
									}
								});
						});
				},
				loadImage(source, loadHandler) {
					//Create a new image and call the `loadHandler` when the image
					//file has loaded
					let image = new Image();
					image.addEventListener("load", loadHandler, false);
					//Assign the image as a property of the `assets` object so
					//you can access it like this: `assets["path/imageName.png"]`
					this[source] = image;
					//Set the image's `src` property to start loading the image
					image.src = source;
				},
				loadFont(source, loadHandler) {
					//Use the font's filename as the `fontFamily` name
					let fontFamily = source.split("/").pop().split(".")[0];
					//Append an `@afont-face` style rule to the head of the HTML document
					let newStyle = document.createElement("style");
					let fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}";
					newStyle.appendChild(document.createTextNode(fontFace));
					document.head.appendChild(newStyle);
					//Tell the `loadHandler` we're loading a font
					loadHandler();
				},
				loadJson(source, loadHandler) {
					//Create a new `xhr` object and an object to store the file
					let xhr = new XMLHttpRequest();
					//Use xhr to load the JSON file
					xhr.open("GET", source, true);
					//Tell xhr that it's a text file
					xhr.responseType = "text";
					//Create an `onload` callback function that
					//will handle the file loading
					xhr.onload = event => {
						//Check to make sure the file has loaded properly
						if (xhr.status === 200) {
							//Convert the JSON data file into an ordinary object
							let file = JSON.parse(xhr.responseText);
							//Get the filename
							file.name = source;
							//Assign the file as a property of the assets object so
							//you can access it like this: `assets["file.json"]`
							this[file.name] = file;
							//Texture atlas support:
							//If the JSON file has a `frames` property then
							//it's in Texture Packer format
							if (file.frames) {
								//Create the tileset frames
								this.createTilesetFrames(file, source, loadHandler);
							} else {
								//Alert the load handler that the file has loaded
								loadHandler();
							}
						}
					};
					//Send the request to load the file
					xhr.send();
				},
				createTilesetFrames(file, source, loadHandler) {
					//Get the tileset image's file path
					let baseUrl = source.replace(/[^\/]*$/, "");
					//Use the `baseUrl` and `image` name property from the JSON
					//file's `meta` object to construct the full image source path
					let imageSource = baseUrl + file.meta.image;
					//The image's load handler
					let imageLoadHandler = () => {
						//Assign the image as a property of the `assets` object so
						//you can access it like this:
						//`assets["images/imageName.png"]`
						this[imageSource] = image;
						//Loop through all the frames
						Object.keys(file.frames).forEach(frame => {
							//The `frame` object contains all the size and position
							//data for each sub-image.
							//Add the frame data to the asset object so that you
							//can access it later like this: `assets["frameName.png"]`
							this[frame] = file.frames[frame];
							//Get a reference to the source so that it will be easy for
							//us to access it later
							this[frame].source = image;
						});
						//Alert the load handler that the file has loaded
						loadHandler();
					};
					//Load the tileset image
					let image = new Image();
					image.addEventListener("load", imageLoadHandler, false);
					image.src = imageSource;
				},
				loadSound(source, loadHandler) {
					console.log("loadSound called – see Chapter 10 for details");
				}
		};



//THIS IS HOW YOU LOAD ASSETS
assets.load(["PlaceholderGraphics/chat1.png"¸, "PlaceholderGraphics/spaceship.png", ""]);
*/

// READ Chapter 3 ■ Working with Game Assets
// PAGE 105
// Using a Texture Atlas 
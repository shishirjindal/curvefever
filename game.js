var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
document.body.appendChild(canvas);

//Background Image
var bgimage = false;
var backimage = new Image();
backimage.onload = function(){
	bgimage = true;
};
//backimage.src = "images/background.jpg";

//Player1 image
var image1 = false;
var player1image = new Image();
player1image.onload = function(){
	image1 = true;
};
player1image.src = "images/player1.jpg";

//Player2 image
var image2 = false;
var player2image = new Image();
player2image.onload = function(){
	image2 = true;
};
player2image.src = "images/player2.jpg";

//down keys
var keydown = {};

//add key
addEventListener("keydown", function (e) {
	keydown[e.keyCode] = true;
}, false);

//remove key
addEventListener("keyup", function (e) {
	delete keydown[e.keyCode];
}, false);


//Player1 Object
var player1 = {
	speed: 70,
	omega: 200,
	theta: Math.floor(Math.random()*360 + 1),
	p1color: "white"
}

//Player2 Object
var player2 = {
	speed: 70,
	omega: 200,
	theta: Math.floor(Math.random()*360 + 1),
	p2color: "white"
}

//reset function
var reset = function(){
	player1.x = Math.floor(Math.random()*200 + 150);
	player1.y = Math.floor(Math.random()*200 + 150);
	player2.x = Math.floor(Math.random()*200 + 150);
	player2.y = Math.floor(Math.random()*200 + 150);
	ctx.fillRect(0,0,canvas.width,canvas.height);
	player1.theta =  Math.floor(Math.random()*360 + 1);
	player2.theta =  Math.floor(Math.random()*360 + 1);
};

//render function
var render = function(){
	if(bgimage){
		ctx.drawImage(backimage,0,0,canvas.width,canvas.height);
	}
	if(image1){
		ctx.drawImage(player1image,player1.x,player1.y,4,4);
	}
	if(image2){
		ctx.drawImage(player2image,player2.x,player2.y,4,4);
	}
};

//update function
var update = function(mod){

	//Player1

	if(player1.x <= 0 || player1.x >= canvas.width-5  || player1.y <= 0 || player1.y >= canvas.height-5)
	{
		reset();
	}
	if(37 in keydown){
		player1.theta -= player1.omega*mod;
	}
	if(39 in keydown){
		player1.theta += player1.omega*mod;
	}
	p1color = ctx.getImageData(player1.x+5*player1.speed*Math.cos(Math.PI*player1.theta/180)*mod,player1.y+5*player1.speed*Math.sin(Math.PI*player1.theta/180)*mod,1,1).data[0];
	if(p1color != 0){
		reset();
	}
	player1.x += player1.speed*Math.cos(Math.PI*player1.theta/180)*mod;
	player1.y += player1.speed*Math.sin(Math.PI*player1.theta/180)*mod;

	//Player2
	if(player2.x <= 0 || player2.x >= canvas.width-5  || player2.y <= 0 || player2.y >= canvas.height-5)
	{
		reset();
	}
	if(83 in keydown){
		player2.theta -= player2.omega*mod;
	}
	if(68 in keydown){
		player2.theta += player2.omega*mod;
	}
	p2color = ctx.getImageData(player2.x+5*player2.speed*Math.cos(Math.PI*player2.theta/180)*mod,player2.y+5*player2.speed*Math.sin(Math.PI*player2.theta/180)*mod,1,1).data[0];
	if(p2color != 0){
			reset();
		}
	player2.x += player2.speed*Math.cos(Math.PI*player2.theta/180)*mod;
	player2.y += player2.speed*Math.sin(Math.PI*player2.theta/180)*mod;
};

var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
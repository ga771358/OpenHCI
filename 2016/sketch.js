var canvas;


//dots
var dotX = [80.89, 66.84, 182.42, 262.89, 412.7, 612.76, 776.09, 994.39, 1034.39, 1174.74, 1310.08, 1328.54, 1373.7, 1396.28, 1440];
var dotY = [632.91, 382.34, 404.11, 266.51, 162.66, 118.89, 138.06, 322.66, 169.74, 402.58, 263.32, 443.63, 498.29, 581.13, 401.26];
// var dotR = [19.78, 10.94, 8.15, 10.15, 9.2, 4.27, 5.26, 10.15, 5.26, 8.16, 5.26, 9.32, 5.26, 12.58, 16.5];
var dotR = [30, 15, 12, 15, 13.5, 6, 7.5, 15, 7.4, 12, 7.5, 13.5, 7.5, 18, 24];
var curDotX = [], curDotY = [], dotState = [];
var dotCoreX, dotCoreY, dotNum, dotColor = [236, 18, 91];

//lines or img
var lineState = [];
var lineOpa = [];
var lineNum;
var lineStartX = [0];
var lineStartY = [0];
var lineEndX = [550];
var lineEndY = [550];

//horns
var hornStartX = [140, 272.200, 446.830, 557.220, 860, 1081.748, 1280, 1256.545, 1100, 1035.606, 329.600];
var hornStartY = [630, 495.420, 479.560, 728.060, 749.952, 688.333, 660, 544.137, 540, 435.106, 667.670];
var hornEndX = [100, 258.112, 385.890, 472.880, 920, 1140, 1363.045, 1303.466, 1130, 1081.215, 258.112];
var hornEndY = [494.450, 434.09, 391.220, 551.240, 580, 570, 568.268, 475.797, 460, 333.988, 532.703];

// var hornStartR = [52.610, 30.235, 30.233, 83.622, 83.622, 83.622, 52.609, 40.011, 33.477, 32.393, 83.621];
var hornStartR = [85, 45.3525, 45.3495, 180, 180, 125.433, 78.9135, 60.0165, 50.2155, 48.5895, 125.4315];
var hornEndR = [6.374, 10.132, 5.523, 10.131, 10.132, 10.132, 6.374, 6.911, 6.910, 10.316, 10.316];
var hornStartColor = [236, 18, 91], hornEndColor = [0, 168, 160];
var hornCurX = [];
var hornCurY = [];
var hornState = [];
var hornNum;


function setup() {
	//setup framerate
	frameRate(30);

	//setup canvas
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("animation");

	//setup dots
	dotCoreX = windowWidth / 2;
	dotCoreY = 460;
	dotNum = 15;
	for(var i = 0;i < dotNum;i++) {
		curDotX[i] = dotCoreX;
		curDotY[i] = dotCoreY;
		dotState[i] = true;
	}

	//setup lines
	lineNum = 1;
	for(var i = 0;i < lineNum;i++) {
		lineOpa[i] = 255;
		lineState[i] = true;
	}

	//setup horns
	hornNum = 11;
	for(var i = 0;i < hornNum;i++) {
		hornState[i] = 1;
		hornStartX[i] -= (1440 - windowWidth) / 2;
		hornEndX[i] -= (1440 - windowWidth) / 2;
		hornCurX[i] = hornStartX[i];
		hornCurY[i] = hornStartY[i];
	}
}

function drawDots() {
	noStroke();
	fill(dotColor[0], dotColor[1], dotColor[2]);
	for(var i = 0;i < dotNum;i++) {
		var v = createVector(dotX[i] - dotCoreX, dotY[i] - dotCoreY);
		v.normalize();
		if(dotState[i] == true) {
			// going outward
			fill(dotColor[0], dotColor[1], dotColor[2]);
			curDotX[i] += v.x * 2;
			curDotY[i] += v.y * 2;
			ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
		}
		else {
			// going inward
			curDotX[i] -= v.x * 2;
			curDotY[i] -= v.y * 2;
			ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
		}
		if(dist(curDotX[i], curDotY[i], dotX[i], dotY[i]) < 1)
			dotState[i] = false;
		if(dist(curDotX[i], curDotY[i], dotCoreX, dotCoreY) < 1)
			dotState[i] = true;
	}
}

function drawLines() {
	for(var i = 0;i < lineNum;i++) {
		stroke(255, lineOpa[i]);
		line(lineStartX[i], lineStartY[i], lineEndX[i], lineEndY[i]);
		if(lineState[i] == true) lineOpa[i]--;
		else lineOpa[i]++;

		if(lineOpa[i] == 255) lineState[i] = true;
		if(lineOpa[i] == 127) lineState[i] = false;
	}
}

function drawHorns() {
	noStroke();
	for(var i = 0;i < hornNum;i++) {
		if(dist(hornCurX[i], hornCurY[i], hornStartX[i], hornStartY[i]) < 1)
			hornState[i] = 1;
		// if(dist(mouseX, mouseY, hornStartX[i], hornStartY[i]) < hornStartR[i]) {
		// 	if(hornState[i] != 1)hornState[i] = 1;
		// }
		// else {
		// 	if(hornState[i] == 1) hornState[i] = -1;
		// }
		if(dist(hornCurX[i], hornCurY[i], hornEndX[i], hornEndY[i]) < 1)
			hornState[i] = -1;
		if(hornState[i] == 0) continue;
		var v = createVector(hornEndX[i] - hornStartX[i], hornEndY[i] - hornStartY[i]);
		v.normalize();
		
		var tx = hornStartX[i], ty = hornStartY[i], tr = hornStartR[i], tc = createVector(hornStartColor[0], hornStartColor[1], hornStartColor[2]);		
		var unit = 0;
		while(1) {
			fill(tc.x, tc.y, tc.z);
			ellipse(tx, ty, tr, tr);
			if(abs(tx - hornCurX[i]) < 1 || abs(ty - hornCurY[i]) < 1) {
				break;
			}
			tx += v.x, ty += v.y; 
			var ratio = dist(tx, ty, hornStartX[i], hornStartY[i]) / dist(hornStartX[i], hornStartY[i], hornCurX[i], hornCurY[i]);
			tr = -ratio * (hornStartR[i] - hornEndR[i]) + hornStartR[i];
			tc.x = -ratio * (hornStartColor[0] - hornEndColor[0]) + hornStartColor[0];
			tc.y = -ratio * (hornStartColor[1] - hornEndColor[1]) + hornStartColor[1];
			tc.z = -ratio * (hornStartColor[2] - hornEndColor[2]) + hornStartColor[2];
		}
		if(hornState[i] == 1) {
			//growing outward
			hornCurX[i] += v.x;
			hornCurY[i] += v.y;
		}
		else if(hornState[i] == -1) {
			//growing inward
			hornCurX[i] -= v.x;
			hornCurY[i] -= v.y;
		}
	}
}

function draw() {
	clear();
	drawDots();
	//drawLines();
	drawHorns();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
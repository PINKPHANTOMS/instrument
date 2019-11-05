let osc
let frequency = 5
let reverb
let env
let circle_radius = 0
let circlex = 0
let circley = 0
let coswave = []
let size = 0
let cam;
let aud
let vid;
let xoff = 0.0;

let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 20;

let graphics

function preload(){

	song = loadSound('Solace.mp3');


	gif = createVideo('yeet.mov')
	gif1 = createVideo('no.mov')
	gif2 = createVideo('yes.mov')

}


function setup(){


	  fft = new p5.FFT();

		gif.play();
		gif1.play();
		gif2.play();
		gif.loop()
		gif1.loop()
		gif2.loop()

		gif.hide()
		gif1.hide()
		gif2.hide()



	let canvas = createCanvas(windowWidth, windowHeight, WEBGL)
	cam = createCapture(VIDEO);
	// aud = createCapture(AUDIO);
	cam.hide()

	canvas.parent("p5")
	osc = new p5.Oscillator()
	osc.setType("square")
	osc.freq(100)
	osc.amp(0)


	env = new p5.Envelope()
	env.setADSR(.001, .2, .2, .15)

	reverb = new p5.Reverb();
	reverb.process(osc, 1, 1)

	// for (var i = 0; i < 6; i++) {
 //    if (i === 2) {
 //      sliderGroup[i] = createSlider(10, 400, 200);
 //    } else {
 //      sliderGroup[i] = createSlider(-400, 400, 0);
 //    }
 //    h = map(i, 0, 6, 5, 85);
 //    sliderGroup[i].position(10, height + h);
 //    sliderGroup[i].style('width', '80px');
 //  }

}

function draw(){

	gif.play();
		gif1.play();
		gif2.play();
		gif.loop()
		gif1.loop()
		gif2.loop()



	graphics = createGraphics(10, 10)
	graphics.image(gif)
	graphics.image(gif1)
	graphics.image(gif2)



	ambientLight(56, 56, 56)
	ambientMaterial(random(200), random(100))
	let dirX = (mouseX / width - 0.5) * 2;
  	let dirY = (mouseY / height - 0.5) * 2;
  	directionalLight(250, 250, 250, -dirX, -dirY, -1);

	background(40,40,40)
	translate(0,0, 50)
	texture(gif2)
	plane(windowWidth, windowHeight, 6, 6);







	osc.amp(circle_radius)
	noStroke()

	xoff = xoff + 0.01;
  	let n = noise(xoff) * width/2;
  	if(n<200){
  	rotateX(frameCount*.008*n)
  	rotateY(frameCount*.0009*n)
  	rotateZ(frameCount* .0007*n)
  	texture(gif)
  	box(n)

  }else if(n>200 && n<400){
  	rotateX(frameCount * 0.00002*n)
  	rotateY(frameCount * 0.00009*n)
  	rotateY(frameCount * 0.00008*n)
  	  	texture(cam)

  	box(n)
  }else if(n>400){

 	texture(cam)
 	box(n)

  }


	fill(map(frequency, 2000, 50, 0, 255), 0, map(frequency, 2000, 50, 0, 255))

		if(circle_radius< 20 &&  circle_radius > 0){
			  		angleMode(DEGREES);

		// for (var i = 0; i <= 180; i+=.05) {
		// // let amount = map(i, 0, 180, -180, 180)
		// print(i)

		// coswave[i] = cos(i);
		// let pan = coswave[i];

		// // print(coswave[i])
		// osc.pan(pan)
	// }



	texture(cam)
	ellipsoid(mouseY/2, map(frequency, 0, 100, circley, circlex))

	}

	fill(50, 0, 50)
	texture(gif1)
	torus(mouseY, circle_radius, 8)


	if( circle_radius > 0 && mouseIsPressed == false){
		map(frameCount, 0, 1, circlex, circley)
		rotateX(frameCount * .001)
		rotateZ(frameCount * .001*n)
		rotateY(frameCount * circle_radius/100)
		circle_radius -= 1

	}

		if(mouseIsPressed == false){
		fill(0, 0, 23)
		texture(gif2)
		ellipsoid(circlex, circley, circle_radius, circle_radius)

	}


  let waveform = fft.waveform();

  beginShape();
  stroke(255,0,n/1.5); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    rotateZ(frameCount*.0009/n)
    rotateX(frameCount*.003/n)
    cone(x/5,y/5);
  }
  endShape();


}

function WindowResized(){

	resizeCanvas(windowWidth, windowHeight)
}
function mousePressed(){


	  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }

	size = 100
	circlex = mouseX
	circley = mouseY
	circle_radius = 50
	// osc.start();
	osc.amp(env)
	// env.triggerAttack()
	mouseDragged()
}

function mouseReleased(){

	// circle_radius = 0
	// osc.stop()
	// env.triggerRelease();
}
function mouseDragged(){
	frequency = map(mouseY, 0 , height, 100, 0)
	osc.freq(frequency)
/*
	if(mouseX < width/2){
		osc.setType("sine")
	}else{
		osc.setType("sawtooth")
	}*/


}

function mouseClicked(){

	
}

function touchStarted(){
	mousePressed()
	mouseClicked()
}
function touchEnded(){
	mouseReleased()
}

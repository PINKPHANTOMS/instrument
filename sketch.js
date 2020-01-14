let xoff = 0.0;
let noiseScale=0.02;
let img;

function preload(){

      img = loadImage('images/albumart/hh.png')


}


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
 canvas.position(0,0);

 canvas.style("z-index",'-1')
   canvas.parent('sketch');

}
function draw() {
   background(0)
  xoff = xoff + 0.01;
  let n = noise(xoff) * mouseX/10;
  texture(img)
  rotateX(millis()/1000000*n)
    rotateZ(millis()/1000000*n)
    translate(n,n-mouseY,n+mouseY)

  box(n, 0, n, mouseY);

    rotateX(millis()/1000000*n/3)
    rotateZ(millis()/1000000*n/2)
    translate(n+mouseX,n+mouseY,n-mouseY)
  box(n, 0, n, mouseY);
    rotateX(millis()/1000000*n/3)
    rotateZ(millis()/1000000*n/2)
    translate(n+mouseY,n+mouseX,n-mouseX)
    box(n, 0, n, mouseX);



    for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(noiseVal*255);
    // line(x, mouseY+noiseVal*80, x, height);
  }
}
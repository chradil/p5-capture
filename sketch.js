var capture;

function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 300, 50, width, width * capture.height / capture.width);

}

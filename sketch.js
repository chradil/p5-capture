var capture;

function setup() {
  createCanvas(600, 600);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);

}

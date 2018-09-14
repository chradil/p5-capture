var capture;
let poseNet;
let poses = [];


function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  
  poseNet = ml5.poseNet(capture, modelReady);
  
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  capture.hide();
}
function modelReady(){
  select('#status').html('Model Loaded');
}

function draw() {
  image(capture, 300, 50, width, width * capture.height / capture.width);
  
  drawKeypoints();
  drawSkeleton();

}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = pose[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255,0,0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


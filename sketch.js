// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
//let photo;
let poseNet;
let poses = [];

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  //photo = loadImage("imaging_1.jpg");
  video.size(width, height);
//photo.size(width,height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
 // image(photo, 0, 0, width, height);
  
  
drawBody();
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  
  textSize(36);
  text('HOLD POSE', 325, 500);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      
//EXPERIMENTAL
      
      //defining variables for glitching animation
      let rightWrist = pose.keypoints[10];
      let leftWrist = pose.keypoints[9];
      let nose = pose.keypoints[0];
      
      
      //glitching animation - right hand
      if (rightWrist.position.y < nose.position.y) {
        fill(rightWrist.position.x%255,0, rightWrist.position.y%255, random(100));
        stroke(255,0,0);
        quad(rightWrist.position.x-random(50), rightWrist.position.y-random(100),
            rightWrist.position.x+random(50), rightWrist.position.y-random(100),
            rightWrist.position.x+random(50), rightWrist.position.y-random(100),
            rightWrist.position.x-random(50), rightWrist.position.y-random(100)
            );
        
              //glitching other keypoints
      if ( (rightWrist.position.x - keypoint.position.x < 20) && (rightWrist.position.y - keypoint.position.y < 20)){
        fill(255);
        ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
        }
        
             }
      
      //glitching animation - left hand
       if (leftWrist.position.y < nose.position.y) {
        fill(leftWrist.position.y%255,0, leftWrist.position.x%255, random(100));
        quad(leftWrist.position.x-random(50), leftWrist.position.y-random(100),
            leftWrist.position.x+random(50), leftWrist.position.y-random(100),
            leftWrist.position.x+random(50), leftWrist.position.y-random(100),
            leftWrist.position.x-random(50), leftWrist.position.y-random(100)
            );
       }
      
      
      
 // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function drawBody() {
  fill(0, 200);
  stroke(255,0,0);
  beginShape();
  vertex(0,0);
  vertex(800,0);
  vertex(800,600);
  vertex(0, 600);
  
  beginContour();
  vertex(600,600);
  vertex(600,500);
  vertex(760,260);
  vertex(510,20);
  vertex(440,100);
  vertex(600,260);
  vertex(500,360);
  vertex(300,360);
  vertex(200,260);
  vertex(360,100);
  vertex(280,20);
  vertex(40,260);
  vertex(200,500);
  vertex(200,600);
  endContour();
  
  beginContour();
    vertex(480,340);
    vertex(480,180);  
  vertex(320,180);
  vertex(320,340);




  endContour();

  endShape(CLOSE);
}

  

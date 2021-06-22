noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup() {
  video = createCapture(VIDEO);
  video.size(500, 500);

  canvas = createCanvas(500, 420);
  canvas.position(700, 135);
  video.position(100, 100);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function draw() {
  fill("#42ddf5");
  square(noseX, noseY, difference);
  document.getElementById("square_side").innerHTML="height and width = "+difference;

}

function modelLoaded() {
  console.log("modelLoaded");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("nose x and y positions are " + noseX, noseY);
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
    console.log(
      "left and right wrist positions are " + leftWristX,
      rightWristX
    );
    console.log("difference is " + difference);
  }
}

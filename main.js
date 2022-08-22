  Webcam.set({
      height: 400,
      width: 450,
     image_format: 'png',
     png_quality: 90
    
  });

  var camera = document.getElementById("camera");
  Webcam.attach(camera);

  function clickSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = '<img id="captured_image" src="'+ data_uri+'">';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KbpuXi68o/model.json', modelLoaded);

function modelLoaded() {
  console.log("Model had Loaded!");
}

function identifySnapshot() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResults);
}

function gotResults(error, results) {
  if(error){
      console.error("An error has occured.", error);
  }
  else{
      console.log(results);
      document.getElementById("object_name").innerHTML = results[0].label;
      document.getElementById("object_accuracy").innerHTML =  (results[0].confidence * 100).toFixed(2) + " %";
  }
}
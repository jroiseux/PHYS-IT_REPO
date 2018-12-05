//JavaScript for the dianosis.html page

//Retrieving the local variables
var patientid = localStorage.getItem('patientid');
var bodyPart = localStorage.getItem('bodypart');

//Accessing the database for patient information.
var patientList = firebase.database().ref("Patients/" + patientid);

//Display the patient first and last name from the database.
patientList.on('value', function(snap) {
  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);
});

//Displays the list of exercises that are specific to the body part.
function displayList() {
  var ref = firebase.database().ref("exercises/" + bodyPart);
  ref.on(
    "value",
    function(snap) {
      snap.forEach(function(snapshot) {
        var ex = snapshot.val();
        $('.dropdown-content').append('<a onclick="addExercise(\'' + ex + '\')">' + ex + '</a>');
      });
    });
}

/* Displays a list of the patient's exercises that are already in the
database upon page load.*/
function displayExercises() {
  $('#exerciseList').html("<ul id='list'>");
  firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
    .once('value', function(snap) {
      exercises = snap.val();
      snap.forEach(function(e) {
        $('#list').append('<li id="' + e.key + '">' + e.val().exercise +
          '<img onclick="removeExercise(\'' + e.key + '\'); displayExercises()" class="deleteimage" src="images/delete.svg"></li>');
      });
      $('#list').append("</ul>");
    });
}

//Adds an exercise from the list to the database and to the page.
function addExercise(text) {
  var newPostKey = firebase.database().ref().child("Patients/" + patientid + "/MedicalInfo/Exercises").push().key;
  var updates = {};
  updates["Patients/" + patientid + "/MedicalInfo/Exercises/" + newPostKey] = {
    'exercise': text
  };
  firebase.database().ref().update(updates);
  $('#Exercises').html('');
  $('#list').append('<li id="' + newPostKey + '">' + text + '<img class="deleteimage" src="images/delete.svg"onclick="removeExercise(\'' + newPostKey + '\'); displayExercises()"></li>');
}

//Remove and exercise from the list and the database.
function removeExercise(key) {
  firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
    .child(key).remove();
}

//Creates and downloads a PDF with the list of exercises for the patient.
function createPDF() {
  var doc = new jsPDF()
  var specialElementHandlers = {
    '#editor': function(element, renderer) {
      return true;
    }
  };
  var content = "";
  patientList.on('value', function(snap) {
    doc.text(snap.val().FirstName + " " + snap.val().LastName, 10, 15);
    doc.text("Exercises:", 10, 25);
    var height = 35;
    firebase.database()
      .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
      .once('value', function(snap) {
        exercises = snap.val();
        snap.forEach(function(e) {
          doc.text("  - " + e.val().exercise, 10, height);
          height = height + 10;
        });
      });
  });
  doc.save('exercises.pdf')
}

//Sets the image on the page based on which part of the body is clicked.
function setImage() {
  if (bodyPart === 'shoulder') {
    $("#patientimage").attr("src", "images/shoulder.jpg");
  } else if (bodyPart === 'knee') {
    $("#patientimage").attr("src", "images/knee.jpg");
  } else if (bodyPart === 'elbow') {
    $("#patientimage").attr("src", "images/elbow.jpeg");
  } else if (bodyPart === 'hip') {
    $("#patientimage").attr("src", "images/hip.jpg");
  }
}

//Functions that are called when the document is loaded.
$(document).ready(function() {
  displayText('Diagnosis', 'diagnosisTextarea');
  displayText('Diagnosis', 'Diagnosis');
  displayList();
  setImage();
  displayExercises();

});

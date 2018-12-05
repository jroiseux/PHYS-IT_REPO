//JavaScript for the patientprofile.html

//Retrieving the local storage.
var patientid = localStorage.getItem('patientid');

//Accessing the database.
var patientList = firebase.database().ref("Patients/" + patientid);

//Displays the patient information from the database on the page.
patientList.on('value', function(snap) {
  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);
  $('#age').html("Age: " + snap.val().sAge);
  $('#weight').html("Weight: " + snap.val().Weight);
  $('#disease').html("Disease Alert: " + snap.val().Disease);
});

//Sets local storage and loads a new page when the knee is clicked.
function kneeClick() {
  localStorage.setItem('bodypart', 'knee');
  window.location = "diagnosis.html?knee";
};

//Sets local storage and loads a new page when the shoulder is clicked.
function shoulderClick() {
  localStorage.setItem('bodypart', 'shoulder');
  window.location = "diagnosis.html?shoulder";
};

//Sets local storage and loads a new page when the elbow is clicked.
function elbowClick() {
  localStorage.setItem('bodypart', 'elbow');
  window.location = "diagnosis.html?elbow";
};

//Sets local storage and loads a new page when the hip is clicked.
function hipClick() {
  localStorage.setItem('bodypart', 'hip');
  window.location = "diagnosis.html?hip";
};

//Functions that are called when the document is ready.
$(document).ready(function() {
  displayText('Symptoms', 'symptomsTextarea');
  displayText('Symptoms', 'Symptoms');
  displayText('OtherFindings', 'otherTextarea');
  displayText('OtherFindings', 'OtherFindings');
});

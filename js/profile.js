//patientprofile
var patientid = localStorage.getItem('patientid');
var patientList = firebase.database().ref("Patients/" + patientid);

patientList.on('value', function(snap) {

  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);
  $('#age').html("Age: " + snap.val().sAge);
  $('#weight').html("Weight: " + snap.val().Weight);
  $('#disease').html("Disease Alert: " + snap.val().Disease);

});

$(document).ready(function() {
  displayText('Symptoms', 'symptomsTextarea');
  displayText('Symptoms', 'Symptoms');
  displayText('OtherFindings', 'otherTextarea');
  displayText('OtherFindings', 'OtherFindings');
});

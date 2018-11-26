var patientid = localStorage.getItem('patientid');
var patientList = firebase.database().ref("Patients/" + patientid);

patientList.on('value', function(snap) {

  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);

});

$(document).ready(function() {
  displayText('Diagnosis', 'diagnosisTextarea');
  displayText('Diagnosis', 'Diagnosis');
  //displayText('Exercises', 'exercisesTextarea');
  //displayText('Exercises', 'Exercises');
  displayExercises('exercisesTextarea');
});

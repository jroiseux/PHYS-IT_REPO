var patientid = localStorage.getItem('patientid');
var patientList = firebase.database().ref("Patients/" + patientid);

patientList.on('value', function(snap) {

  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);

});


function saveExercise(text) {
  var newPostKey = firebase.database().ref().child("Patients/" + patientid + "/MedicalInfo/Exercises").push().key;
  var updates = {};
  updates["Patients/" + patientid + "/MedicalInfo/Exercises/" + newPostKey] = {'exercise': text};
  firebase.database().ref().update(updates);
  $('#Exercises').html('');

};

function displayExercises(textareaid) {
  //$('#' + textareaid).html("");
  firebase.database()
  .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
  .on('value', function(snap) {
    exercises = snap.val();
    $('#' + textareaid).html("");
    snap.forEach(function(e){
      $('#' + textareaid).append(e.val().exercise + '\n');
    });
  });
}


function createPDF(){
  var doc = new jsPDF()
  var specialElementHandlers = {
    '#editor': function (element, renderer) {
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
      snap.forEach(function(e){
        doc.text("  - " + e.val().exercise, 10, height);
        height = height + 10;
      });
    });
  });
  doc.save('exercises.pdf')
}

$(document).ready(function() {
  displayText('Diagnosis', 'diagnosisTextarea');
  displayText('Diagnosis', 'Diagnosis');
  //displayText('Exercises', 'exercisesTextarea');
  //displayText('Exercises', 'Exercises');
  displayExercises('exercisesTextarea');

});

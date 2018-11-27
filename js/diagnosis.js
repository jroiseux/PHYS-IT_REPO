var patientid = localStorage.getItem('patientid');
var patientList = firebase.database().ref("Patients/" + patientid);

patientList.on('value', function(snap) {

  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);

});


function createPDF(){
  var doc = new jsPDF()
  var content = "";
  patientList.on('value', function(snap) {
    content +='<ul>';
    firebase.database()
      .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
      .once('value', function(snap) {
            exercises = snap.val();
            snap.forEach(function(e){
              content += '<li>' + snap.val().exercises +'</li>';
            });
    });
    content += '</ul>'


  //  content += '<td>' + snap.val().LastName + '</td>';
    //content += '<td>' + snap.val().PhoneNumber + '</td>';
    //content += '<td>' + snap.val().AppointmentTime + '</td>';

    //doc.text(snap.val().FirstName+" "+snap.val().LastName, 10, 10);
  //  doc.text(firstName, 20, 20);
    //doc.text();
    //doc.text("Age: " + snap.val().sAge);
    //$('#myWeight').html("Weight: " + snap.val().Weight);
    //$('#myDisease').html("Disease Alert: " + snap.val().Disease);

  });

  doc.text(content, 10, 10)
  doc.save('a4.pdf')
}

$(document).ready(function() {
  displayText('Diagnosis', 'diagnosisTextarea');
  displayText('Diagnosis', 'Diagnosis');
  //displayText('Exercises', 'exercisesTextarea');
  //displayText('Exercises', 'Exercises');
  displayExercises('exercisesTextarea');

});

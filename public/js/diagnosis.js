var patientid = localStorage.getItem('patientid');
var patientList = firebase.database().ref("Patients/" + patientid);
var bodyPart = localStorage.getItem('bodypart');

patientList.on('value', function(snap) {

  $('#firstName').html(snap.val().FirstName);
  $('#lastName').html(snap.val().LastName);

});

function displayList() {
  var ref = firebase.database().ref("exercises/" + bodyPart);
  ref.on(
    "value",
    function(snap) {
      snap.forEach(function(snapshot){
        var ex = snapshot.val();
        $('.dropdown-content').append('<a onclick="addExercise(\''+ex+'\')">'+ex+'</a>');
      });
    });
  }

  function displayExercises() {
    $('#exerciseList').html("<ul id='list'>");
    firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
    .once('value', function(snap) {
      exercises = snap.val();
      snap.forEach(function(e){
        $('#list').append('<li id="'+e.key+'">' + e.val().exercise
        + '<img onclick="removeExercise(\''+e.key+'\'); displayExercises()" class="deleteimage" src="images/delete.svg"></li>');
      });
      $('#list').append("</ul>");
    });
  }

  function addExercise(text){
    var newPostKey = firebase.database().ref().child("Patients/" + patientid + "/MedicalInfo/Exercises").push().key;
    var updates = {};
    updates["Patients/" + patientid + "/MedicalInfo/Exercises/" + newPostKey] = {'exercise': text};
    firebase.database().ref().update(updates);
    $('#Exercises').html('');
    $('#list').append('<li id="'+newPostKey+'">' + text + '<img class="deleteimage" src="images/delete.svg"onclick="removeExercise(\''+newPostKey+'\'); displayExercises()"></li>');
  }

  function removeExercise(key){
    firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
    .child(key).remove();
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

function setImage() {
    if (bodyPart === 'shoulder'){
    $("#patientimage").attr("src", "images/shoulder.jpg");
    }
    else if (bodyPart === 'knee'){
    $("#patientimage").attr("src", "images/knee.jpg");
    }
     else if (bodyPart === 'elbow'){
    $("#patientimage").attr("src", "images/elbow.jpeg");
    }
     else if (bodyPart === 'hip'){
    $("#patientimage").attr("src", "images/hip.jpg");
    }
}
  $(document).ready(function() {
    displayText('Diagnosis', 'diagnosisTextarea');
    displayText('Diagnosis', 'Diagnosis');
    displayList();
    setImage();
    displayExercises();

  });

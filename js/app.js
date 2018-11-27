// Initialize Firebase
var config = {
  apiKey: "AIzaSyBHkznc6I46EAtk3L8bKm3h3t2Yx9NUyZI",
  authDomain: "phys-it.firebaseapp.com",
  databaseURL: "https://phys-it.firebaseio.com",
  projectId: "phys-it",
  storageBucket: "phys-it.appspot.com",
  messagingSenderId: "960737516865"
};
firebase.initializeApp(config);

function displayText(key, textareaid) {
  var ref = firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/" + key);
  ref.on('value', function(snap) {
    $('#' + textareaid).val(snap.val());
  });
}

function saveMedicalInfo(key) {
  var text = $('#' + key).val();
  firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo")
    .update({
      [key]: text
    });
};

function saveExercise(text) {
  var newPostKey = firebase.database().ref().child("Patients/" + patientid + "/MedicalInfo/Exercises").push().key;
  var updates = {};
  updates["Patients/" + patientid + "/MedicalInfo/Exercises/" + newPostKey] = {'exercise': text};
  firebase.database().ref().update(updates);
  //$('#Exercises').html('');

};

function displayExercises(textareaid) {
  //$('#' + textareaid).html("");
  firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo/Exercises/")
    .once('value', function(snap) {
          exercises = snap.val();
          snap.forEach(function(e){
            $('#' + textareaid).append(e.val().exercise + '\n');
          });
    });
}

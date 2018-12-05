//JavaScript file for features that are used multiple times throughout
//the application.

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

//Displays the text from the database in the text areas.
function displayText(key, textareaid) {
  var ref = firebase.database()
  .ref("Patients/" + patientid + "/MedicalInfo/" + key);
  ref.on('value', function(snap) {
    $('#' + textareaid).val(snap.val());
  });
};

//Saves Symptoms and Other Findings to the database.
function saveMedicalInfo(key) {
  var text = $('#' + key).val();
  firebase.database()
  .ref("Patients/" + patientid + "/MedicalInfo")
  .update({
    [key]: text
  });
};

//The log-out function for the application.
function sign_out_function(){
  location.href="./index.html";
  firebase.auth().signOut()
};

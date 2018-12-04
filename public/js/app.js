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
};

function saveMedicalInfo(key) {
  var text = $('#' + key).val();
  firebase.database()
    .ref("Patients/" + patientid + "/MedicalInfo")
    .update({
      [key]: text
    });
};

function sign_out_function(){
location.href="./index.html";
firebase.auth().signOut()
};

function kneeClick() {
    localStorage.setItem('bodypart', 'knee');
    window.location = "diagnosis.html?knee";
};

function shoulderClick() {
    localStorage.setItem('bodypart', 'shoulder');
    window.location = "diagnosis.html?shoulder";
};

function elbowClick() {
    localStorage.setItem('bodypart', 'elbow');
    window.location = "diagnosis.html?elbow";
};

function hipClick() {
    localStorage.setItem('bodypart', 'hip');
    window.location = "diagnosis.html?hip";
};

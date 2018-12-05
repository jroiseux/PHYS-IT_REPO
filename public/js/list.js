//JavaScript file for the patientlist.html file.
//The app autenticates the user.
var physioUID;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    physioUID = user.uid;
    var id = physioUID
  }

  //var name, email;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  /*Display all the user's patients from the database and add them to the table
  in the patient list*/
  var ref = firebase.database().ref("Users/" + physioUID);
  ref.once(
    "value",
    function(snap) {
      snap.forEach(function(snapshot){
        var patientid = snapshot.key;
        var patientref = firebase.database().ref("Patients/" + patientid);
        patientref.on(
          "value",
          function(snap) {
            function setPatientId(obj){
              localStorage.setItem('patientid', obj.value);
            }
            var content = '';
            content +='<tr>';
            content += '<td>' + snap.val().FirstName +'</td>';
            content += '<td>' + snap.val().LastName + '</td>';
            content += '<td>' + snap.val().PhoneNumber + '</td>';
            content += '<td>' + snap.val().AppointmentTime + '</td>';
            content += '<td><button><a href="patientprofile.html"'
            + 'onclick="localStorage.setItem(\'patientid\', \'' + patientid + '\');">'
            + 'View</a></button></td>';
            content += '</tr>';
            $('#patients').append(content);
          });
        });
      });
    });

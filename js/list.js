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

  var ref = firebase.database().ref("Users/" + physioUID);
  ref.on(
    "value",
    function(snap) {

      snap.forEach(function(snapshot){
        var patientid = snapshot.key;
        console.log(patientid)
        var patientref = firebase.database().ref("Patients/" + patientid);
        patientref.on(
          "value",
          function(snap) {
            function setPatientId(obj){
              localStorage.setItem('patientid', obj.value);
              console.log(obj.value);
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

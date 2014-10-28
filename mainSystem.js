//Made by Tom Peregrine 16:00 27/08/14
//Last Edited by Tom Peregrine 10:46 28/08/14
//Jquery and firebase are required
//Define the location of the firebase
var fb = new Firebase("https://everlesslychatting.firebaseio.com/");
$(document).ready(function() {
  //Two different submit methods
  $("#sendButton").click(function() {
    submitMessageToFireBase();
  });

  $('#nameInput').keypress(function(e){
    if (e.keyCode == 13 ){
      submitMessageToFireBase()
    }
  })
  $('#messageInput').keypress(function(e){
    if (e.keyCode == 13 ){
      submitMessageToFireBase()
    }
  })

  function submitMessageToFireBase(){
    var name = $('#nameInput').val().trim();
    var text = $('#messageInput').val().trim();
    isNameValid = isValidMsg(name);
    isMsgValid = isValidMsg(text);
    if (isNameValid && isMsgValid) {
      fb.push({
        name: name,
        text: text
      });
      $('#messageInput').val('');
    }
    else {
      alert("Invalid inputs \n" + "Is name valid: " +
      boolToYN(isNameValid) + "\n" + "Is message valid: " + boolToYN(isMsgValid))
    }
  }

  fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
});

function boolToYN(boolVal) {
  if (boolVal == true) {
    return "Yes";
  } else {
    return "No";
  }
}

function isValidMsg(msg) {
  var spaces = 0;
  //Check if value is a string
  if (!(typeof msg == "string")) {
  //  alert("String not detected");
    return false;
  }

  if (msg.trim().length == 0) {
    return false;
  }
  return true;
}

function displayChatMessage(name, text) {
  $messageToDisplay = "<div class='message'> <em class='userNameDisplayer'>" + name + "</em>  :" + "&#9;&#9;&#9;" + text + "</div>";
  $('#allMessagesBox').append($messageToDisplay);
};

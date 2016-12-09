
//GLOBAL VAR
var messageObject;
var messageArray = [];
var numberOfMessages = 0;
var jsonFiles = ["message1.json", "message2.json", "message3.json", "message4.json", "message5.json"];
var index;




//Create Function to disable clearMessageBoard button if no messages
//Also checks to see if messages to know whether to activate or disable button

var checkForMessages = function () {
  //test for empty string
  if (document.querySelector('.messageContainer').innerHTML.trim() === "") {
  //if empty, disable button
  clearBoardBut.setAttribute("disabled", "disabled");
  //else, keep button active/ make button active
  } else  {
      clearBoardBut.removeAttribute("disabled", "disabled");
    }
}



//Loads Default Messages into Page

function addDefaultMessages(){
    for (var i = 0; i < messageArray.length; i++) {

        document.querySelector('.messageContainer').insertAdjacentHTML('beforeend', `<div>

                                                                                        <span class="userName">${messageArray[i].user} </span><span class="messageContent">${messageArray[i].message} </span><span class="messageTime"> ${messageArray[i].time}</span><button class="editButton btn btn-default">Edit</button><button class="deleteButton btn btn-default">Delete</button>

                                                                                    </div`)
        numberOfMessages++;
    }
    //console.log(numberOfMessages)
}



//Function deletes messages on the individual delete message button


function deleteMessage(event){

    if (event.target.className.split(' ')[0] === "deleteButton") {

        var removeThisDiv = event.target.parentElement
        event.target.parentElement.parentNode.removeChild(removeThisDiv);
    }
    checkForMessages();

}

// function that brings up an input to edit old message on button press

function editMessage(event){


    if (event.target.className.split(' ')[0] === "editButton") {

      console.log(event.path[1])

      var currentMessageText = event.path[1].querySelector('.messageContent').innerText;

      event.path[1].querySelector('.messageContent').outerHTML = `<input type="text" id="edit-message-field" class="form-control form-control-edit" value="${currentMessageText}">`

    }
    // checkForMessages();
}



// Function to add a dark theme to page

function addDarkTheme (e) {

    if (document.getElementById('theme').checked && document.getElementById('textSize').checked) {

      document.querySelector('body').className = 'darkThemeBody';

      document.getElementById("message-container").setAttribute("style", "color: white; font-size: 30px;");

      //document.querySelector('#message-container').setAttribute("style", "font-size: 30px;");

    }
    else if(document.getElementById('theme').checked === false && document.getElementById('textSize').checked) {
      document.querySelector('body').className = '';
      document.getElementById("message-container").setAttribute("style", "color: black;")
      document.querySelector('#message-container').setAttribute("style", "font-size: 30px;");
    }

    else if (document.getElementById('theme').checked) {
        document.querySelector('body').className = 'darkThemeBody';

        document.getElementById("message-container").setAttribute("style", "color: white;");

    } else {

        document.querySelector('body').className = '';

        document.getElementById("message-container").setAttribute("style", "color: black;")

    }
}

//  Function to add larger text to page

function addLargeText (e) {

    if (document.getElementById('theme').checked && document.getElementById('textSize').checked) {
      document.querySelector('body').className = 'darkThemeBody';

      document.getElementById("message-container").setAttribute("style", "color: white; font-size: 30px;");
    }
    else if(document.getElementById('theme').checked && document.getElementById('textSize').checked === false) {
       document.querySelector('body').className = 'darkThemeBody';

      document.getElementById("message-container").setAttribute("style", "color: white; font-size: 17px");
    }

    else if (document.getElementById('textSize').checked) {
        document.querySelector('#message-container').setAttribute("style", "font-size: 30px;");

    }

    else  {

        document.querySelector('#message-container').setAttribute("style", "font-size: 17px;");

    }
}



document.getElementById('theme').addEventListener('change', addDarkTheme);

document.getElementById('textSize').addEventListener('change', addLargeText);

//  Function that adds New Message to Message Container

function addMessage() {

    var newDate = new Date();
    console.log(newDate);
    var user = document.getElementById("selectUser").value;
    var newMessage = document.getElementById('message-field').value;
// <<<<<<< HEAD
//     var newMessageHTML = `<span class="messageContent">${newMessage}</span>`
// =======
    var newMessageHTML = `<span class="userName">${user} </span><span class="messageContent">${newMessage}</span>`
// >>>>>>> BETA

    if (newMessage === '') {
        alert('Please enter message');
    } else {
    var messageContainer = document.querySelector('.messageContainer').insertAdjacentHTML('afterbegin', `<div>
                                                                                                           <span>${newMessageHTML}</span> <span class="messageTime">${newDate}</span><button class="editButton btn btn-default">Edit</button><button class="deleteButton btn btn-default">Delete</button>
                                                                                                        </div>`);
    }
    //resets message input to blank
    document.getElementById('message-field').value = "";
    checkForMessages();

    numberOfMessages++;
    // Delete a message if number of messages is greater than 20
    checkNumberOfMessages()
}


function checkNumberOfMessages() {
  if (numberOfMessages > 20) {
    var lastMessageDiv = document.querySelector('#message-container').lastChild

    document.querySelector('#message-container').removeChild(lastMessageDiv);
  }
}


function addAvailableUsers () {
  console.log("addAvailableUsers function called")
  var userSelectDropdown = document.getElementById("selectUser");

  console.log(users.names.length, "users names array length")

  for (var i = 0; i < users.names.length; i++) {
    console.log(users.names[i], "current user")
    userSelectDropdown.insertAdjacentHTML('beforeend', `<option>${users.names[i]}</option>`);
  }
}


var users = {
  names: ["Xavier", "Joanna", "Mackenzie", "Gunter", "Iveta", "Sven"]
};

addAvailableUsers();



//  Event Listener for enter keypress. Fires add message function

document.getElementById('message-field').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        e.preventDefault();
        addMessage();

    }
})


// var parseJson = function (e) {
//   messageArray[index] = JSON.parse(e.target.responseText);
//   console.log(messageArray);
//       }



//request and parse json files

var getJson = function () {
  for (var i = 0; i < jsonFiles.length; i++) {
    var messageRequest = new XMLHttpRequest();
    messageRequest.addEventListener("load", function (e) {
      messageArray[i] = JSON.parse(e.target.responseText);
      });
    //using async attribute to make page wait for load
    messageRequest.open("GET", jsonFiles[i], false);
    messageRequest.send();
  }
  addDefaultMessages();
}

getJson();





//write function to set message board to empty div
var clearBoard = function(e) {
  //prevent page from auto reloading on submit with button pressed
  e.preventDefault();
  document.querySelector('.messageContainer').innerHTML = "";
    //call function to disable clear messages button if not messages on board
  checkForMessages();
}

// Functionality to Clear Message Board
  //add event listener to button
var clearBoardBut = document.querySelector("#clear-button");
clearBoardBut.addEventListener("click", clearBoard);


// Event listener for delete buttons
document.querySelector("body").addEventListener("click", deleteMessage);

document.querySelector("body").addEventListener("click", editMessage);

document.querySelector('body').addEventListener('keypress', editMessageEnterKey)

function editMessageEnterKey(e) {
console.log("edit MessageEnterKey function called")
console.log(e.path);
    var key = e.which || e.keyCode;
      if (key === 13) {
console.log("editMessage the key is enter")
     if (e.path[0].className === 'form-control form-control-edit') {
      console.log("editMessage this is the right path?")
      var editedMessage = e.path[0].value;

      e.path[0].outerHTML = `<span class="messageContent">${editedMessage}</span> `
     }
  }

}

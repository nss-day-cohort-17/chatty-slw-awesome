
//GLOBAL VAR
var messageObject;
var messageArray = [];
var numberOfMessages = 0;




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
                                                                                        <span class="userName">${messageArray[i].user} </span><span class="messageContent">${messageArray[i].message} </span><span class="messageTime"> ${messageArray[i].time}</span><button class="deleteButton btn btn-default">Delete</button>
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
    var newMessage = document.getElementById('message-field').value;
    var newMessageHTML = `<span>${newMessage} <span class="messageTime">${newDate}</span></span>`

    if (newMessage === '') {
        alert('Please enter message');
    } else {
    var messageContainer = document.querySelector('.messageContainer').insertAdjacentHTML('afterbegin', `<div>
                                                                                                           <span>${newMessageHTML}</span> <button class="deleteButton btn btn-default">Delete</button>
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

//  Event Listener for enter keypress. Fires add message function

document.getElementById('message-field').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        e.preventDefault();
        addMessage();

    }
})





// //GLOBAL VAR
// var messageObject;
// var messageArray = [];
// var numberOfMessages = 0;




//Parsed JSON file to get messages as javascript object
//message 1
var parseMessage1 = function(e) {
  messageArray[0] = JSON.parse(e.target.responseText);
  getMessage2();
}
//message 2
var parseMessage2 = function(e) {
  messageArray[1] = JSON.parse(e.target.responseText);
  getMessage3();
}
//message 3
var parseMessage3 = function(e) {
  messageArray[2] = JSON.parse(e.target.responseText);
  getMessage4();
}
//message 4
var parseMessage4 = function(e) {
  messageArray[3] = JSON.parse(e.target.responseText);
  getMessage5();
}

//message 5
var parseMessage5 = function(e) {
  messageArray[4] = JSON.parse(e.target.responseText);
  addDefaultMessages();
  console.log(messageArray)
}


//Request to JSON file to get placeholder messages



//get message 5

var getMessage5 = function() {
  var messageRequest = new XMLHttpRequest();
  messageRequest.addEventListener("load", parseMessage5);
  messageRequest.open("GET", "message5.json");
  messageRequest.send();
}



//get message 4

var getMessage4 = function() {
  var messageRequest = new XMLHttpRequest();
  messageRequest.addEventListener("load", parseMessage4);
  messageRequest.open("GET", "message4.json");
  messageRequest.send();
}



//get message 3

var getMessage3 = function() {
  var messageRequest = new XMLHttpRequest();
  messageRequest.addEventListener("load", parseMessage3);
  messageRequest.open("GET", "message3.json");
  messageRequest.send();
}



//get message 2

var getMessage2 = function() {
  var messageRequest = new XMLHttpRequest();
  messageRequest.addEventListener("load", parseMessage2);
  messageRequest.open("GET", "message2.json");
  messageRequest.send();

}


//get message 1

var messageRequest = new XMLHttpRequest();
messageRequest.addEventListener("load", parseMessage1);
messageRequest.open("GET", "message1.json");
messageRequest.send();






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

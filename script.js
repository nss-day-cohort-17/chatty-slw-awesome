
function addDefaultMessages(){

    for (var i = 0; i < messageObject.defaultMessageList.length; i++) {

        document.querySelector('.messageContainer').insertAdjacentHTML('beforeend', `<div>
                                                                                        <span>${messageObject.defaultMessageList[i].message}</span> <button>Delete</button>
                                                                                    </div`)
    }
}



// Function to test other functions

var test = function() {
  console.log("Your function works!");
}

var messageObject;
//Parsed JSON file to get messages as javascript object
var parseMessages = function(e) {
  messageObject = JSON.parse(e.target.responseText);
  addDefaultMessages();
}

//Request to JSON file to get placeholder messages
var messageRequest = new XMLHttpRequest();
messageRequest.addEventListener("load", parseMessages);
messageRequest.open("GET", "messages.json");
messageRequest.send();


//Creat Function to disable clearMessageBoard button if no messages

var checkForMessages = function () {
  //test for empty string
  if (document.querySelector('.messageContainer').innerHTML === " ") {
  //if so, disable button
  clearBoardBut.setAttribute("disabled", "disabled");
  //else, keep button active
  } else {
    if (document.querySelector('.messageContainer').innerHTML !== " ") {
      clearBoardBut.removeAttribute("disabled", "disabled");
    }
  }
}






//write function to set message board to empty div
var clearBoard = function(e) {
  e.preventDefault();
  document.querySelector('.messageContainer').innerHTML = " ";
    //call function to disable clear messages button if not messages on board
  checkForMessages();
}

// Functionality to Clear Message Board
  //add event listener to button
var clearBoardBut = document.querySelector("#clear-button");
clearBoardBut.addEventListener("click", clearBoard);

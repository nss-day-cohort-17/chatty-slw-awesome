
function addDefaultMessages(){

    for (var i = 0; i < messageObject.defaultMessageList.length; i++) {

        document.querySelector('.messageContainer').insertAdjacentHTML('beforeend', `<div>
                                                                                        <span>${messageObject.defaultMessageList[i].message}</span> <button class="deleteButton btn btn-default">Delete</button>
                                                                                    </div`)
        document.querySelector("body").addEventListener("click", deleteMessage);
    }
}


function deleteMessage(e){


    if (event.target.className.split(' ')[0] === "deleteButton") {

        var removeThisDiv = event.target.parentElement
        event.target.parentElement.parentNode.removeChild(removeThisDiv);
    }

}

// Function to add a dark them to page

function addDarkTheme (e) {

    if (document.getElementById('theme').checked){
            
        console.log('hey')

    } else {

        console.log('hello')
    
    }
}

//  Function to add larger text to page

function addLargeText (e) {
    if (document.getElementById('textSize').checked){
            
        console.log('hey')

    } else {

        console.log('hello')
    
    }
}

document.getElementById('theme').addEventListener('change', addDarkTheme);

document.getElementById('textSize').addEventListener('change', addLargeText);

//  Function that adds New Message to Message Container

function addMessage() {
    var newMessage = document.getElementById('message-field').value;
    var newMessageHTML = `<span>${newMessage}</span>`

    if (newMessage === '') {
        alert('Please enter message');
    } else {
    var messageContainer = document.querySelector('.messageContainer').insertAdjacentHTML('afterbegin', `<div>
                                                                                                           <span>${newMessageHTML}</span> <button class="deleteButton btn btn-default">Delete</button>
                                                                                                        </div>`);
    document.querySelector("body").addEventListener("click", deleteMessage);
    }
    //resets message input to blank
    document.getElementById('message-field').value = "";
}

//  Event Listener for enter keypress. Fires add message function

document.getElementById('message-field').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        e.preventDefault();
        addMessage();

    }
})


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


// delete button event listener
//document.querySelector(".deleteButton").addEventListener("click", deleteMessage);

//Request to JSON file to get placeholder messages
var messageRequest = new XMLHttpRequest();
messageRequest.addEventListener("load", parseMessages);
messageRequest.open("GET", "messages.json");
messageRequest.send();


//write function to set message board to empty div
var clearBoard = function(e) {
  e.preventDefault();
  document.querySelector('.messageContainer').innerHTML = " ";

}

// Functionality to Clear Message Board
  //add event listener to button
var clearBoardBut = document.querySelector("#clear-button");
clearBoardBut.addEventListener("click", clearBoard);

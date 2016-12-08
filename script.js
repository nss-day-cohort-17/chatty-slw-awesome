
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

// Function to add a dark theme to page

function addDarkTheme (e) {

    if (document.getElementById('theme').checked) {
            
        document.querySelector('body').className = 'darkThemeBody';

        document.getElementById("message-container").setAttribute("style", "color: white;");
    
    } else {

        document.querySelector('body').className = '';
        
        document.getElementById("message-container").setAttribute("style", "color: black;")

    }
}

//  Function to add larger text to page

function addLargeText (e) {
   
    if (document.getElementById('textSize').checked) {
            
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


//Create Function to disable clearMessageBoard button if no messages
//Also checks to see if messages to know whether to activate or disable button

var checkForMessages = function () {
  //test for empty string
  if (document.querySelector('.messageContainer').innerHTML === " ") {
  //if empty, disable button
  clearBoardBut.setAttribute("disabled", "disabled");
  //else, keep button active/ make button active
  } else if (document.querySelector('.messageContainer').innerHTML !== " ") {
      clearBoardBut.removeAttribute("disabled", "disabled");
    }
}






//this function adds functionality to the delete button on the messages themselves
function deleteMessage(e){
    //console.log("deleteMessage function called")
    console.log("event ", e)

    if (event.target.className === "deleteButton"){
        //console.log("delete button clicked")
        //console.log(event.target.parentElement);

        var removeThisDiv = event.target.parentElement
        event.target.parentElement.parentNode.removeChild(removeThisDiv);
    }
}

// //  Function that adds New Message to Message Container

// function addMessage() {
//     var newMessage = document.getElementById('message-field').value;
//     var newMessageHTML = `<span>${newMessage}</span>`

//     if (newMessage === '') {
//         alert('Please enter message');
//     } else {
//     var messageContainer = document.querySelector('.messageContainer').insertAdjacentHTML('afterbegin', `<div>
//                                                                                                            <span>${newMessageHTML}</span> <button class="deleteButton">Delete</button>
//                                                                                                         </div>`);
//     document.querySelector("body").addEventListener("click", deleteMessage);
//     }
//     //resets message input to blank
//     document.getElementById('message-field').value = "";
//     checkForMessages();
// }

// //  Event Listener for enter keypress. Fires add message function

// document.getElementById('message-field').addEventListener('keypress', function (e) {
//     var key = e.which || e.keyCode;
//     if (key === 13) {
//         e.preventDefault();
//         addMessage();

//     }
// })


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
  //prevent page from auto reloading on submit with button pressed
  e.preventDefault();
  document.querySelector('.messageContainer').innerHTML = " ";
    //call function to disable clear messages button if not messages on board
  checkForMessages();
}

// Functionality to Clear Message Board
  //add event listener to button
var clearBoardBut = document.querySelector("#clear-button");
clearBoardBut.addEventListener("click", clearBoard);

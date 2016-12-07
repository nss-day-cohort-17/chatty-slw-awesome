
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

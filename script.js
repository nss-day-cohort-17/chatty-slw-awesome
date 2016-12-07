
function addDefaultMessages(){

    for (var i = 0; i < messageObject.defaultMessageList.length; i++) {

        document.querySelector('.messageContainer').insertAdjacentHTML('beforeend', `<div>
                                                                                        <span>${messageObject.defaultMessageList[i].message}</span> <button class="deleteButton">Delete</button>
                                                                                    </div`)
        document.querySelector("body").addEventListener("click", deleteMessage);
    }
}


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

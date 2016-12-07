
// Gloabl messagesList variable to store messages
var messagesList;

// Import Json
var requestDefaultMessages = new XMLHttpRequest();
requestDefaultMessages.addEventListener("load", loadDefaultMessages)
requestDefaultMessages.open("GET", "messages.json")
requestDefaultMessages.send()

// callback function for XMLHttp request
function loadDefaultMessages(event) {
    console.log("loadDefaultMessages function called")

    messagesList = JSON.parse(event.target.responseText);

    console.log(messagesList)
    console.log(messagesList.defaultMessageList)

    addDefaultMessages();
}

function addDefaultMessages(){
    //console.log("addDefaultMessages function called")
    //console.log("messageList Length", messagesList.length)

    for (var i = 0; i < messagesList.defaultMessageList.length; i++) {
        //console.log("message for loop ", messagesList.defaultMessagesList[i].message)
        document.querySelector('.messageContainer').insertAdjacentHTML('beforeend', `<div>
                                                                                        <span>${messagesList.defaultMessageList[i].message}</span> <button>Delete</button>
                                                                                    </div`)
    }
}

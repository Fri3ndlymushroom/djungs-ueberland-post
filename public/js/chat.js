db.collection("messages").doc("messages").get().then((doc) => {

    doc.data().messages.forEach(function(message) {
        // is self
        let isSelf = false

        if (message.uid == firebase.auth().currentUser.uid) isSelf = true

        // username
        let username = message.username
        if (username.length > 10) username = username.slice(2, 10) + "..."

        addMessage(username, message.date, message.message, isSelf)
    })
})

db.collection("messages").doc("messages").onSnapshot((doc) => {
    if (doc.data().messages.length - 1 <= 0) return
    message = doc.data().messages[doc.data().messages.length - 1]

    // is self
    let isSelf = false

    if (message.uid == firebase.auth().currentUser.uid) isSelf = true

    // username
    let username = message.username
    if (username.length > 10) username = username.slice(2, 10) + "..."

    addMessage(username, message.date, message.message, isSelf)
});






messageIndex = 0

function addMessage(username, date, message, isSelf) {

    let messageClass = "message--left"
    if (isSelf) messageClass = "message--right"

    let newMessageInnerHTML = `
        <span class="message__header">
            <span class="message__header--name">${username}</span>
            <span class="message__header--time">${date}</span>
        </span>
        <span class="message__message">${message}</span>
        `
    let newMessage = document.createElement("span")
    newMessage.setAttribute("class", "message " + messageClass)
    newMessage.setAttribute("id", "message" + messageIndex)

    document.getElementById("chat__feed--inner").appendChild(newMessage)

    document.getElementById("message" + messageIndex).innerHTML = newMessageInnerHTML
    messageIndex++

    if (checkIfAtBottom()) {
        document.getElementById("chat__feed").scrollBy(0, 10000000)
    }
}

function checkIfAtBottom() {
    if ($("#chat__feed").scrollTop() + $(document).height() > $("#chat__feed--inner").height()) {
        return true
    }
    return false
}

document.getElementById("chat__input--section").addEventListener("submit", function() {
    event.preventDefault()
    if (document.getElementById("chat__input--field").value.length > 0) {
        sendMessage(document.getElementById("chat__input--field").value)
        document.getElementById("chat__input--field").value = ""
    }
})

async function sendMessage(message) {
    const sendMessage = firebase.functions().httpsCallable('sendMessage');
    sendMessage({ message: message, username: info.username })
}
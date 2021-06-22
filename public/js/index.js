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
    addMessage("max", "13:44", document.getElementById("chat__input--field").value, true)
    document.getElementById("chat__input--field").value = ""
})

async function sendMessage(message) {

}
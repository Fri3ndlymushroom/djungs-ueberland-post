messageIndex = 0

function addMessage(username, date, message, isSelf, rank) {

    let messageClassPos = "message--left"
    if (isSelf) messageClassPos = "message--right"

    let messageClassRank = " messageRank" + rank

    let newMessageInnerHTML = `
        <span class="message__header">
            <span class="message__header--name">${username}</span>
            <span class="message__header--time">${date}</span>
        </span>
        <span class="message__message">${message}</span>
        `
    let newMessage = document.createElement("span")
    newMessage.setAttribute("class", "message " + messageClassPos + messageClassRank)
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
    console.log(info.userRank)
    sendMessage({ message: message, rank: info.selectedRank })
}

function openRankPopup() {
    console.log("s")
    document.getElementById("rank__popup--wrapper").style.display = "block"
}

function changeRank(rank) {
    info.userRselectedRankank = rank
    localStorage.setItem("selectedRank", rank)
    window.location.href = "index.html"
}
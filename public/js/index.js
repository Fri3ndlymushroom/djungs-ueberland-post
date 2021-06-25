loaded = false

info = {
    username: "",
    userRank: 0,
    selectedRank: 0,
}


if (localStorage.getItem("rank")) {
    info.selectedRank = JSON.parse(localStorage.getItem("selectedRank"))
}

auth.onAuthStateChanged(async user => {
    if (user) {
        if (window.location.href.split("/")[3] == "login.html") {
            window.location.href = "index.html"
        }
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (!doc.data().username) {
                document.getElementById("username__popup--wrapper").style.display = "block"
            }
        })


        db.collection("users").doc(user.uid).get().then((doc) => {
            info.username = doc.data().username
            info.userRank = doc.data().userRank
        }).then(() => {
            // load messages
            db.collection("messages").doc("messages").get().then((doc) => {

                doc.data().messages.forEach(function(message) {
                    // is self
                    let isSelf = false

                    if (message.uid == firebase.auth().currentUser.uid) isSelf = true

                    // username
                    let username = message.username
                    if (username.length > 10) username = username.slice(2, 10) + "..."
                    console.log(message.rank, info.userRank)
                    if (message.rank <= info.userRank)
                        addMessage(username, message.date, message.message, isSelf, message.rank)
                })
            })

            // set ui

            if (info.userRank == 0) {
                document.getElementById("rank__button--0").style.display = "inline"
                document.getElementById("rank__button--1").style.display = "none"
                document.getElementById("rank__button--2").style.display = "none"
                document.getElementById("rank__button--3").style.display = "none"

            } else if (info.userRank == 1) {
                document.getElementById("rank__button--0").style.display = "inline"
                document.getElementById("rank__button--1").style.display = "inline"
                document.getElementById("rank__button--2").style.display = "none"
                document.getElementById("rank__button--3").style.display = "none"
            } else if (info.userRank == 2) {
                document.getElementById("rank__button--0").style.display = "inline"
                document.getElementById("rank__button--1").style.display = "inline"
                document.getElementById("rank__button--2").style.display = "inline"
                document.getElementById("rank__button--3").before.style.display = "none"
            } else if (info.userRank == 3) {
                document.getElementById("rank__button--0").style.display = "inline"
                document.getElementById("rank__button--1").style.display = "inline"
                document.getElementById("rank__button--2").style.display = "inline"
                document.getElementById("rank__button--3").style.display = "inline"
            }

            if (info.selectedRank == 0) document.getElementById("chat__input--rank").style.backgroundColor = "#b8d0eb"
            else if (info.selectedRank == 1) document.getElementById("chat__input--rank").style.backgroundColor = "#b298dc"
            else if (info.selectedRank == 2) document.getElementById("chat__input--rank").style.backgroundColor = "#a663cc"
            else if (info.selectedRank == 3) document.getElementById("chat__input--rank").style.backgroundColor = "#6f2dbd"
        })


        // actualise messages
        db.collection("messages").doc("messages").onSnapshot((doc) => {
            if (doc.data().messages.length - 1 <= 0) return
            message = doc.data().messages[doc.data().messages.length - 1]

            // is self
            let isSelf = false

            if (message.uid == firebase.auth().currentUser.uid) isSelf = true

            // username
            let username = message.username
            if (username.length > 10) username = username.slice(2, 10) + "..."
            if (message.rank <= info.userRank && loaded)
                addMessage(username, message.date, message.message, isSelf, message.rank)
            loaded = true
        });

    } else {
        if (window.location.href.split("/")[3] != "login.html") {
            window.location.href = "login.html"
        }
    }
})

document.getElementById("username__popup").addEventListener("submit", async function() {
    event.preventDefault()
    await db.collection("users").doc(firebase.auth().currentUser.uid).update({
        username: document.getElementById("username").value
    })
    info.username = document.getElementById("username").value
    document.getElementById("username__popup--wrapper").style.display = "none"
    window.location.href = "index.html"
})

function logOut() {
    auth.signOut()
}
info = {
    username: "",
    userRank: 0,
}

loaded = false

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
        })

        db.collection("messages").doc("messages").get().then((doc) => {

            doc.data().messages.forEach(function(message) {
                // is self
                let isSelf = false

                if (message.uid == firebase.auth().currentUser.uid) isSelf = true

                // username
                let username = message.username
                if (username.length > 10) username = username.slice(2, 10) + "..."
                if (message.rank <= info.userRank)
                    addMessage(username, message.date, message.message, isSelf, message.rank)
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
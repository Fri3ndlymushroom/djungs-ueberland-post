info = {
    username: ""
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
        })

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
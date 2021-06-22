auth.onAuthStateChanged(async user => {
    if (user) {
        if (window.location.href.split("/")[3] == "login.html") {
            window.location.href = "index.html"
        }
    } else {
        if (window.location.href.split("/")[3] != "login.html") {
            window.location.href = "login.html"
        }

    }
})
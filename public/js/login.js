const loginButtonGoogle = document.getElementById("login__form--google")


const provider = new firebase.auth.GoogleAuthProvider();
loginButtonGoogle.addEventListener("click", function() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    event.preventDefault()
})
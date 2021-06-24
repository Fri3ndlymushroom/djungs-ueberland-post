const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.sendMessage = functions.https.onCall(async(data, context) => {

    let dateParts = String(admin.firestore.Timestamp.now().toDate()).split(" ")
    let date = dateParts[1] + " " + dateParts[2] + " " + dateParts[4].split(":")[0] + ":" + dateParts[4].split(":")[1]

    let message = filterOutLinks(data.message)
    let username = ""
    let userRank = 0
    await db.collection("users").doc(context.auth.uid).get().then(doc => {
        username = doc.data().username
        userRank = doc.data().userRank
    })

    if (userRank < data.rank) console.error("permissions not matching")
    console.log(data.rank)

    db.collection("messages").doc("messages").update({
        messages: admin.firestore.FieldValue.arrayUnion({
            username: username,
            date: date,
            message: message,
            uid: context.auth.uid,
            rank: data.rank
        }),
    })

})

function filterOutLinks(message) {
    return message
}




exports.newUserSignup = functions.auth.user().onCreate(async(user) => {
    await db.collection("users").doc(user.uid).set({
        userRank: 0,
        username: "",
    });
});
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.sendMessage = functions.https.onCall((data, context) => {

    let dateParts = String(admin.firestore.Timestamp.now().toDate()).split(" ")
    let date = dateParts[1] + " " + dateParts[2] + " " + dateParts[4].split(":")[0] + ":" + dateParts[4].split(":")[1]

    let message = filterOutLinks(data.message)




    db.collection("messages").doc("messages").update({
        messages: admin.firestore.FieldValue.arrayUnion({
            username: data.username,
            date: date,
            message: message,
            uid: context.auth.uid,
        }),
    })

})

function filterOutLinks(message) {
    return message
}




exports.newUserSignup = functions.auth.user().onCreate(async(user) => {
    await db.collection("users").doc(user.uid).set({
        rank: 0,
        username: "",
    });
});
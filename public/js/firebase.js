var firebaseConfig = {
    apiKey: "AIzaSyC56ffd9pnKRokUhUA0NlTUGPVJwrLqJzg",
    authDomain: "boys-chat-4ac68.firebaseapp.com",
    projectId: "boys-chat-4ac68",
    storageBucket: "boys-chat-4ac68.appspot.com",
    messagingSenderId: "430083788605",
    appId: "1:430083788605:web:4cdc01ebfd4a9beb04ff54",
    measurementId: "G-7ZGXY9E7ZL"
};
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp({});
} else {
    firebase.app(); // if already initialized, use that one
}

firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const pathReference = storage.ref('images/stars.jpg');

var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg');

if (location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080);
    auth.useEmulator('http://localhost:9099/', { disableWarnings: true });
    firebase.functions().useEmulator("localhost", 5001);
}

// lsof -t -i tcp:9099 | xargs kill & lsof -t -i tcp:5001 | xargs kill & lsof -t -i tcp:8080 | xargs kill & lsof -t -i tcp:5000 | xargs kill


// netstat -aon | findstr :8080


// taskkill /PID 18688 /F
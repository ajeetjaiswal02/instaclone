import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB3H6SLbEMVmDIIuBSt7GQNsBZbPLvi5qA",
    authDomain: "insta-clone-deb97.firebaseapp.com",
    databaseURL: "https://insta-clone-deb97.firebaseio.com",
    projectId: "insta-clone-deb97",
    storageBucket: "insta-clone-deb97.appspot.com",
    messagingSenderId: "1055938340469",
    appId: "1:1055938340469:web:7abbdecf68b9ac886c7a3c",
    measurementId: "G-78X9BQFWJ6"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


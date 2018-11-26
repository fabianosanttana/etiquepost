var firebase = require('firebase');
module.exports = () => {
    var config = {
        apiKey: "AIzaSyBIABG0hH4-rFIsgQg0ueQ70eHNGcpoOZA",
        authDomain: "etiquepost-c57c7.firebaseapp.com",
        databaseURL: "https://etiquepost-c57c7.firebaseio.com",
        storageBucket: "etiquepost-c57c7.appspot.com",
        messagingSenderId: "735831857956",
    };
    
    firebase.initializeApp(config);
    return firebase;
}
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCHG4wuJPeJ--LlofdKxTI6sjfWZOpVXG8",
  authDomain: "pwa-shopping-list-45e14.firebaseapp.com",
  databaseURL: "https://pwa-shopping-list-45e14.firebaseio.com/",
  projectId: "pwa-shopping-list-45e14",
  storageBucket: "pwa-shopping-list-45e14.appspot.com",
  messagingSenderId: "309584738699",
  appId: "1:309584738699:web:46abdf726e4dd7b837178e"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();

db.enablePersistence().catch(err => {
  if (err.code == "failed-precondition") {
    // probably multiple tabs are opened at once
    console.error("persistance failed");
  } else if (err.code == "unimplemented") {
    // lack of browser support
    console.error("persistance is not available");
  }
});
export default db;

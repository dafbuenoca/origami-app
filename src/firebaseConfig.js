import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyB9JhOYU8gpuY7Xi9SHRCEHj6UX5YMrK1w",
  authDomain: "origami-a1f12.firebaseapp.com",
  databaseURL: "https://origami-a1f12.firebaseio.com",
  projectId: "origami-a1f12",
  storageBucket: "origami-a1f12.appspot.com",
  messagingSenderId: "586210150001",
  appId: "1:586210150001:web:2209f39348051882"
};

let app = Firebase.initializeApp(config);
let db = app.database();
let storage = app.storage();

let figuresRef = db.ref("figures");
let auth = app.auth();
const authGoogle = new Firebase.auth.GoogleAuthProvider();
const authFacebook = new Firebase.auth.FacebookAuthProvider();

export { app, storage, db, figuresRef, auth, authGoogle, authFacebook };

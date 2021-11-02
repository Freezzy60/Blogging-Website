// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCylEWnSVBIMcqJltMocvhDvs5oHJ9s7BM",
  authDomain: "freiraum-blog.firebaseapp.com",
  databaseURL: "https://freiraum-blog-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "freiraum-blog",
  storageBucket: "freiraum-blog.appspot.com",
  messagingSenderId: "767556444959",
  appId: "1:767556444959:web:6617b9f0e4e8f39987862a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const database = app.database();

const database_ref = database.ref();

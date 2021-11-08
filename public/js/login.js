import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getDatabase, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

//Auth
const auth = getAuth();
//Database
const db = getDatabase();

//References
let openLoginBtn = document.getElementById("openLogin");
let closeLogin = document.getElementById("closeLogin");
let loginBtn = document.getElementById("loginBtn");
let signUpBtn = document.getElementById("signUpBtn");

//Show PopUp -> add .active to classlist
function openPopUp() {
    document.getElementById("login").classList.add("active");
}

openLoginBtn.addEventListener('click', openPopUp);

//Hide PopUp -> remove .avtive from classlist
function closePopUp(dialogId) {
    document.getElementById("login").classList.remove("active");
}

closeLogin.addEventListener('click', closePopUp);

//Login User with email

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert("Email or Password is Outta Line!!");
        return;
    }


    signInWithEmailAndPassword(auth, email, password)
        .then(function () {
            
            update(ref(db, "admin/" + auth.currentUser.uid),            
                {
                    email: email,
                    last_login: Date.now(),
                })
        })
        //Catch wrong Login
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);

        })
};

loginBtn.addEventListener('click', login);

// Check Email
function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        // Email is good
        return true;
    } else {
        // Email is not good
        return false;
    }
}
//Check Password bigger 6 ?
function validate_password(password) {

    if (password < 6) {
        return false;
    }
    else {
        return true;
    }
};
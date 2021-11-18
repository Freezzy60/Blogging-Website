import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, updatePassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getDatabase, ref, set, child, update, remove, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

//Auth
const auth = getAuth();
//Database
const db = getDatabase();

//
//References
//

//Login pop up open / close
let openLoginBtn = document.getElementById("openLoginLink");
let closeLogin = document.getElementById("closeLogin");

//Login btn / logout btn
let logoutBtn = document.getElementById("logoutLink")
let loginBtn = document.getElementById("loginBtn");

//Change pw pop up open / close
let openChangePw = document.getElementById("openChangePw");
let closeChangePw = document.getElementById("closeChangePw");

//Btn save new password
let saveNewPw = document.getElementById("changePwBtn");

//
//User logged in ?
//

auth.onAuthStateChanged(function (user) {
    if (user) {
        //Remove active -> opactity 0 (login/signup)
        document.getElementById("login").classList.remove("active");
        //Remove login btn if logged in
        document.getElementById("openLoginLink").classList.add("in-active");
        //Show btn editor
        document.getElementById("editorBtn").classList.remove("in-active");
        //Show btn logout
        document.getElementById("logoutLink").classList.remove("in-active");
        //Show btn change pw
        document.getElementById("openChangePw").classList.remove("in-active");
    } else {
        //add in-active -> display none 0 (editor)
        document.getElementById("editorBtn").classList.add("in-active");
        //add in-active -> display none 0 (editor)
        document.getElementById("logoutLink").classList.add("in-active");
        //add in-active -> display none 0 (editor)
        document.getElementById("openChangePw").classList.add("in-active");

    }
})

//
//Show PopUp -> add .active to classlist
//

function openPopUp() {
    document.getElementById("login").classList.add("active");
}

openLoginBtn.addEventListener('click', openPopUp);

//
//Hide PopUp -> remove .avtive from classlist
//

function closePopUp() {
    document.getElementById("login").classList.remove("active");
}

closeLogin.addEventListener('click', closePopUp);

//
//Show PopUp Change PW -> add .active to classlist
//

function openPopUpPw() {
    document.getElementById("changePw").classList.add("active");
}

openChangePw.addEventListener('click', openPopUpPw);

//
//Hide PopUp -> remove .avtive from classlist
//

function closePopUpPw() {
    document.getElementById("changePw").classList.remove("active");
}

closeChangePw.addEventListener('click', closePopUpPw);

//
//Login User with email  PW: FreiRaum1234!Innsbruck?
//

function signIn() {

    var user = document.getElementById("userName").value.toLowerCase();
    var password = document.getElementById("password").value;
    var emailAdmin = "";
    var queryAdmin = ref(db, user);

    onValue(queryAdmin, (snapshot) => {
        snapshot.forEach(function (childSnapshot) {

            //Get key of admin
            const adminKey = childSnapshot.key;

            //Get ref to admin email
            const emailAdminRef = ref(db, user + '/' + adminKey + '/email');

            //Get Email
            onValue(emailAdminRef, (snapshot) => {
                emailAdmin = snapshot.val().toString();
            })
        })

        signInWithEmailAndPassword(auth, emailAdmin, password)
            .then(() => {
                //Remove active -> opactity 0 (login/signup)
                document.getElementById("login").classList.remove("active");
                //Remove login btn if logged in
                document.getElementById("openLoginLink").classList.add("in-active");
                //Show btn editor
                document.getElementById("editorBtn").classList.remove("in-active");
                //Show btn logout
                document.getElementById("logoutLink").classList.remove("in-active");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorCode + errorMessage);
            });
    });
};

//Onclick Sign In button -> login user
loginBtn.addEventListener('click', signIn);

//
//Logout
//

function logout() {

    auth.signOut().then(function () {
        //Remove login btn if logged in
        document.getElementById("openLoginLink").classList.remove("in-active");
        document.getElementById("editorBtn").classList.remove("activeEditorBtn");
        document.getElementById("logoutLink").classList.remove("activeLogoutBtn");
    })
}

//Logout button on click -> logout user
logoutBtn.addEventListener('click', logout)

//
//Change Password Admin User
//

function saveNewPassword() {

    var pw1 = document.getElementById("pw1").value;
    var pw2 = document.getElementById("pw2").value;

    //Check pw1 and pw2 same same?
    if (pw1 == pw2) {

        //get current user
        const user = auth.currentUser;
        //new password
        const newPassword = pw1;

        //update password
        updatePassword(user, newPassword).then(() => {
            // Update successful.
            console.log("ok");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode + errorMessage);
        });
    }
}

//Save button on click -> save new password
saveNewPw.addEventListener('click', saveNewPassword)

//
// Check Email
//
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

//
//Check Password bigger 6 ?
//
function validate_password(password) {

    if (password < 6) {
        return false;
    }
    else {
        return true;
    }
};
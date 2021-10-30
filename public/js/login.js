//Sign Up User
function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);

    promise.catch(e => alert(e.message));
}

//Loggin User
function signIn () {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);

    document.getElementById("login").classList.remove("active")

    promise.catch(e => alert(e.message));
}

//Loggout User
function signOut() {
    auth.signOut();
}

//User signed in ?
auth.onAuthStateChanged(function(user,editorId,loginId){
    if(user){
        var email = user.email;
        document.getElementById("active-login-editor").classList.add("active");
        document.getElementById("active-login-logout").classList.add("active");
        document.getElementById("inactive-login").classList.add("inactive");

    }else{
        document.getElementById("editor-nav").classList.remove("active");
    }
});


//Show PopUp -> add .active to classlist
function openPopUp(dialogId) {
    document.getElementById(dialogId).classList.add("active");
  }
  
//Hide PopUp -> remove .avtive from classlist
  function closePopUp(dialogId) {
    document.getElementById(dialogId).classList.remove("active");
  }
  
//User signed in ?
auth.onAuthStateChanged(function(user,editorId,loginId){
    if(user){
        document.getElementById("active-login-editor").classList.add("active-nav");
        document.getElementById("active-login-logout").classList.add("active-nav");
        document.getElementById("inactive-login").classList.add("inactive-nav");

    }else{
        document.getElementById("active-login-editor").classList.remove("active-nav");
    }
});


//Sign Up User
function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(function(){

        var user = auth.currentUser;

        // Create User data
        var user_data = {
            email: email.value,
            last_login: Date.now(),
        };

        // Push user to Firebase Database
        database_ref.child("admin/" + user.uid).set(user_data);

    })

    promise.catch(e => alert(e.message));
}

//Loggin User
function signIn () {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then(function(){

        var user = auth.currentUser;

        var user_data = {
            last_login: Date.now()
        };

        database_ref.child("admin/" + user.uid).update(user_data);

    })

    document.getElementById("login").classList.remove("active")

    promise.catch(e => alert(e.message));
}

//Loggout User
function signOut() {
    auth.signOut();
}




//Show PopUp -> add .active to classlist
function openPopUp(dialogId) {
    document.getElementById(dialogId).classList.add("active");
  }
  
//Hide PopUp -> remove .avtive from classlist
  function closePopUp(dialogId) {
    document.getElementById(dialogId).classList.remove("active");
  }
  
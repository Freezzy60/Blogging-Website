// Set up our login function
function login(editorId, dialogId) {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      alert("Email or Password is Outta Line!!");
      return;
      // Don't continue running the code
  }

  auth
      .signInWithEmailAndPassword(email, password)
      .then(function () {
          // Declare user variable
          var user = auth.currentUser;

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Create User data
          var user_data = {
              last_login: Date.now(),
          };

          // Push to Firebase Database
          database_ref.child("users/" + user.uid).update(user_data);

          document.getElementById(editorId).classList.add("editor-active");
          document.getElementById(dialogId).classList.remove("active");

          
      })
      .catch(function (error) {
          // Firebase will use this to alert of its errors
          var error_code = error.code;
          var error_message = error.message;

          alert(error_message);
      });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
      // Email is good
      return true;
  } else {
      // Email is not good
      return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
      return false;
  } else {
      return true;
  }
}

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      alert("Email or Password is Outta Line!!");
      return;
      // Don't continue running the code
  }

  // Move on with Auth
  auth
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
          // Declare user variable
          var user = auth.currentUser;

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Create User data
          var user_data = {
              email: email,
              last_login: Date.now(),
          };

          // Push to Firebase Database
          database_ref.child("users/" + user.uid).set(user_data);

          // DOne
          alert("User Created!!");
      })
      .catch(function (error) {
          // Firebase will use this to alert of its errors
          var error_code = error.code;
          var error_message = error.message;

          alert(error_message);
      });
}


//Show PopUp -> add .active to classlist
function openPopUp(dialogId) {
  document.getElementById(dialogId).classList.add("active");
}

//Hide PopUp -> remove .avtive from classlist
function closePopUp(dialogId) {
  document.getElementById(dialogId).classList.remove("active");
}
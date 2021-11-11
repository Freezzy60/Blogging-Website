import { getDatabase, ref, onValue }
  from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

const db = getDatabase();
//-- Get Database --//
const blogSection = document.getElementById("blog-section");


//const blogEntryRefTitle = ref(db, 'Blog/' + "-MoDzNOTHxURhx-zwlHw" + '/Title');
//const blogEntryRefText = ref(db, 'Blog/Text');


//Get all blogs from db
var query = ref(db, "Blog");

var dataTitle = "";
var dataText = "";

//Print all Blogs on website
  onValue(query, (snapshot) => {
    snapshot.forEach(function (childSnapshot){
      const blogKey = childSnapshot.key;

      const blogEntryRefTitle = ref(db, 'Blog/' + blogKey + '/Title');
      
      onValue(blogEntryRefTitle, (snapshot) => {
        dataTitle = snapshot.val().toString();
        console.log(dataTitle);
      }); 
      
      const blogEntryRefText = ref(db, 'Blog/' + blogKey + '/Text');

      onValue(blogEntryRefText, (snapshot) => {
        dataText = snapshot.val().toString();
        console.log(dataText);
      })

      blogSection.innerHTML += `
              <div class="blog-card">
               <img src="img/banner.jpg" alt="header" class="blog-image">
               <h1 id="blog-title">${dataTitle}</h1>
               <p id="blog-overview">${dataText}</p>
               <a href="/" class="btn dark">read</a>
              </div>
              `;
    })
  });
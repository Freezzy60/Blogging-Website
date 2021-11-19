import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

const db = getDatabase();
//-- Get Database --//
const blogSection = document.getElementById("blog-section");
const deleteBtn = document.getElementById("delBtn");
const blogNumber = document.getElementById('blogNumber');


//Title of Blog
var dataTitle = "";
//Text of Title
var dataText = "";
//Url of Image
var dataImage = "";

//Get blogs from db
var query = ref(db, "Blog");

//Print all Blogs on website
onValue(query, (snapshot) => {
  snapshot.forEach(function (childSnapshot) {
    //Get blog key
    const blogKey = childSnapshot.key;
    
    //Get Ref to Title at db
    const blogEntryRefTitle = ref(db, 'Blog/' + blogKey + '/Title');
    
    //Get Title from db
    onValue(blogEntryRefTitle, (snapshot) => {
      dataTitle = snapshot.val().toString();
    });
    
    //Get Ref to Text at db
    const blogEntryRefText = ref(db, 'Blog/' + blogKey + '/Text');
    
    //Get Text from db
    onValue(blogEntryRefText, (snapshot) => {
      dataText = snapshot.val().toString();
    });
    
    //Get Ref to Image at db
    const blogImageBanner = ref(db, 'Blog/' + blogKey + '/ImgUrl');
    
    //Get Img from db
    onValue(blogImageBanner, (snapshot) => {
      dataImage = snapshot.val();
    });
    
    
    blogSection.innerHTML += `
    <div class="blog-card">
    <img src=${dataImage} alt="header" class="blog-image">
    <h1 id="blog-title">${dataTitle}</h1>
    <p id="blog-overview">${dataText}</p>
    <a href="/" class="btn dark">read</a>
    </div>
    `;
  })
});

//----Delete Function----//
function deleteData() {
  
  const blogtitle = document.getElementById("xyz");
  
  console.log(blogtitle.value);
  
  remove(ref(db, 'Blog/' + blogtitle.value))
  .then(() => {
    alert("Blog removed successfully");
  })
  .catch((error) => {
      alert("unsuccessful, error" + error);
    });
    
    
  }
  
deleteBtn.onclick = deleteData;
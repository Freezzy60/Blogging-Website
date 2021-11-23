import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

//-- Get Database --//
const db = getDatabase();

//Title of Blog
var dataTitle = "";
//Text of Title
var dataText = "";
//Url of Image
var dataImage = "";

//Get blogs from db
var query = ref(db, "Blog");

//Counter Id of div (blog)
let counterId = 0;

//Print all Blogs on website
  onValue(query, (snapshot) => {
    snapshot.forEach(function (childSnapshot){
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

      //Create new div
      let newBlog = document.createElement('div');
      //set id div
      newBlog.id = "blog" + counterId;
      //add classname div
      newBlog.className = "blog-card";
      //inner html div
      newBlog.innerHTML ='<img src='+dataImage+' alt="header" class="blog-image">'+
      '<h1 id=blog-title>'+dataTitle+'</h1>'+
      '<p id="blog-overview">'+dataText+'</p>'+
      '<a href="/" class="btn dark">read</a>'+
      '<input type="button" id="button '+counterId+'" value="Delete" class = "btn dark"/>'

      //append newBlog -> blog-selection
      document.getElementById("blog-section").appendChild(newBlog);

      //Onclick delete Blog
      newBlog.addEventListener('click', removeBlog);

      //Remove blog
      function removeBlog(){
        //Get Ref to blog at db
        const currentBlog = ref(db, 'Blog/' + blogKey);
        //Remove blog
        remove(currentBlog);
        //refresh page
        location.reload();       
      }
    })
  });
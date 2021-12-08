import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
import { getStorage, deleteObject, ref as sref } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js";

//-- Get Storage --//
const storage = getStorage();


//-- Get Database --//
const db = getDatabase();

//Title of Blog
var dataTitle = "";
//Text of Title
var dataText = "";
//Url of Image
var dataImage = "";
//Name of Image
var dataImageName = "";

//Get blogs from db
var query = ref(db, "Blog");
//Counter Id of div (modal)
let modalCounterId = 100;
//Counter Id of div(overlay)
let overlayId = 1000;
//Counter Id of Close
let closeId = 10000;

//Counter Id of div (blog)
let counterId = 0;

//Print all Blogs on website
onValue(query, (snapshot) => {
    snapshot.forEach(function(childSnapshot) {
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
        //Get Ref to Image Name at db
        const blogImageName = ref(db, 'Blog/' + blogKey + '/ImageName');

        //Get ImgName from db
        onValue(blogImageName, (snapshot) => {
            dataImageName = snapshot.val().toString();
        });

        //Get Ref to Image at db
        const blogImageBanner = ref(db, 'Blog/' + blogKey + '/ImgUrl');

        //Get Img from db
        onValue(blogImageBanner, (snapshot) => {
            dataImage = snapshot.val();
        });

        //modalCounterID++
        modalCounterId++;
        //counterId++
        counterId++;
        //Create new div
        let newBlog = document.createElement('div');
        //set id div
        newBlog.id = "blog" + counterId;
        //add classname div
        newBlog.className = "blog-card";
        //innerHTML Div
        newBlog.innerHTML = '<img src=' + dataImage + ' name= ' + dataImageName + '  id="blog-image" alt="header" class="blog-image">' +
            '<h1 id=blog-title>' + dataTitle + '</h1>' +
            '<p id="blog-overview">' + dataText.slice(0, 100) + '</p>' +
            '<input type="button" id=' + modalCounterId + ' class="btn dark" value="Read" />' +
            '<input type="button" id=' + counterId + ' value="Delete" class = "btn dark"/>'
            //append newBlog -> blog-selection
        document.getElementById("blog-section").appendChild(newBlog);
        //Delete Button Reference
        const deleteBlog = document.getElementById(counterId);


        //Onclick delete Blog
        deleteBlog.addEventListener('click', removeBlog);


        //const blogImageURL = document.getElementById('blog-image').src;
        //console.log(blogImageURL);

        const blogImageNam = document.getElementById('blog-image').name;
        console.log(blogImageNam);



        //Remove blog
        function removeBlog() {

            //Storage Ref TEST VERSION
            const storageRef = sref(storage, 'Images/' + blogImageNam);
            deleteObject(storageRef);


            document.getElementById("blog" + this.id).remove();
            //Get Ref to blog at db
            const currentBlog = ref(db, 'Blog/' + blogKey);
            //Remove blog
            remove(currentBlog);
            //refresh page
            location.reload();
        }


        //CloseId++
        closeId++;
        //Overlayid++
        overlayId++;
        //Create new div
        let modalBlog = document.createElement('div');
        //set id div
        modalBlog.id = overlayId;
        //set class to div
        modalBlog.className = "overlay";
        //inner HTML div
        modalBlog.innerHTML =
            '<span id=' + closeId + ' class="close">X</span>' +
            '<img src=' + dataImage + ' alt="header" class="blog-image">' +
            '<h1> ' + dataTitle + ' </h1>' +
            '<p> ' + dataText + ' </p>'


        document.getElementById('modal').appendChild(modalBlog);

        const span = document.getElementById(closeId);
        const modal = document.getElementById(overlayId);
        //const overlay = document.getElementById('overlay' + this.id);

        //Read Button Reference
        const readBtn = document.getElementById(modalCounterId);
        //onClick read Blog
        readBtn.onclick = () => {
            modal.style.display = "block";
        }

        span.onclick = () => {
            modal.style.display = "none";
        }
    })
});
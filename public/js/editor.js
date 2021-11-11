import { getDatabase, ref, set, onValue, child, push, update, remove }
    from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
//import { getStorage } from 'firebase/storage/';

const db = getDatabase();
//const storageDb = getStorage();
//const storageRef = ref(storageDb, 'images/' + imageName);
//-- Storage Image in Storage database


//----References-----------------//

var blogtitle = document.querySelector(".title");
var article = document.querySelector(".article");
//var imageName = bannerImage.name;

var instBtn = document.getElementById("publishBtn");


//---Insert Data---//

function insertData() {

    //Get Post key
    const newPostKey = push(child(ref(db), 'posts')).key;

    //set title and text to db
    set(ref(db, "Blog/" + newPostKey), {
        BlogKey: newPostKey,
        Title: blogtitle.value,
        Text: article.value,
        //Alert push done
    }).then(function () {
        alert("push done")
        //Catch error
    }).catch(function (errror) {

        var error_code = error.code;
        var error_message = error.message;

        //Alert errror
        alert(error_message);
    });    
};

instBtn.addEventListener('click', insertData);


//banner
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


var upload_image = "";

/**bannerImage.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        upload_image = reader.result;
        document.querySelector(".banner").style.backgroundImage = `url(${upload_image})`;
    });
    reader.readAsDataURL(this.files[0]);

})**/


/**uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})**/

/**const uploadImage = (uploadFile, uploadType) => {
    const[file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new Formdata();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    }else{
        alert("upload Image only")
    }
}**/

// This function will let you insrert a text format of your image of example if I upload 1.png then 
// this function insert something like thie ![1.png](image path) inside our article field.
const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}


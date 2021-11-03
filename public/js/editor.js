import { getDatabase, ref, set, child, update, remove}
from  "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

const db = getDatabase();


//----References-----------------//

var blogtitle = document.querySelector(".title");
var article = document.querySelector(".article");

var instBtn = document.getElementById("publishBtn");

//---Insert Data---//

function insertData(){

    var i = 0;
    var blogId = i++;

    set(ref(db, "Blog/" + blogId),{
        Title: blogtitle.value,
        Text: article.value
    })
    .then(() => {
        alert("data stored successfully");
    })
    .catch((error) => {
        alert("upload failed" + error);
    });
}

instBtn.addEventListener('click', insertData);



//banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


var upload_image = "";

bannerImage.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        upload_image = reader.result;
        document.querySelector(".banner").style.backgroundImage = `url(${upload_image})`;
    });
    reader.readAsDataURL(this.files[0]);

})


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
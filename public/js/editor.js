
import { getDatabase, ref, set, onValue, child, push, update, remove } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js";

const db = getDatabase();

//----References-----------------//
var imgName, imgUrl;
var files = [];
var reader = new FileReader();

var blogtitle = document.querySelector(".title");
var article = document.querySelector(".article");
var instBtn = document.getElementById("publishBtn");
var bannerImage = document.getElementById('banner-upload');
var namebox = document.getElementById('namebox');
var proglab = document.getElementById('upprogress');
var upBtn = document.getElementById('upBtn');
var extlab = document.getElementById('extlab');
var selBtn = document.getElementById('selbtn');




//---Insert Data to db---//
function insertData(URL) {

    var name = namebox.value;
    var ext = extlab.innerHTML;


    //Get Post key
    const newPostKey = push(child(ref(db), 'posts')).key;

    //set title and text to db
    set(ref(db, "Blog/" + blogtitle.value), {
        BlogKey: newPostKey,
        Title: blogtitle.value,
        Text: article.value,
        ImageName: (name + ext),
        ImgUrl: URL,
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

//instBtn.addEventListener('click', insertData);

//---Insert Image into Storage---//

var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
    files = e.target.files;

    var extention = GetFileExt(files[0]);
    var name = GetFileName(files[0]);

    namebox.value = name;
    extlab.innerHTML = extention;

    reader.readAsDataURL(files[0]);

}

reader.onload = function () {
    bannerImage.src = reader.result;
}

//Selection


selBtn.onclick = function () {
    input.click();
}

function GetFileExt(file) {
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length - 1), (temp.length));
    return '.' + ext[0];
}

function GetFileName(file) {
    var temp = file.name.split('.');
    var fname = temp.slice(0, -1).join('.');
    return fname;
}

//upload Proces

async function uploadProcess() {
    var imgToUpload = files[0];

    var imgName = namebox.value + extlab.innerHTML;
    const metaData = {
        contentType: imgToUpload.type
    }

    const storage = getStorage();

    const storageRef = sRef(storage, "Images/" + imgName);

    const uploadTask = uploadBytesResumable(storageRef, imgToUpload, metaData);

    uploadTask.on('state-change', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = "Upload " + progress + "%";
    },
        (error) => {
            alert("error: image not uploaded!");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);
                insertData(downloadURL);
            });
        }
    );

}

instBtn.onclick = uploadProcess;

/*
//banner
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


var upload_image = "";
*/
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

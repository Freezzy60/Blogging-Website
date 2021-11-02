const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

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
} )


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

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = "";
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //access firstore with db variable;
        db.collection("Freiraum").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() =>{
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})


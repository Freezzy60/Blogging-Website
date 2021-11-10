import { getDatabase, ref, onValue}
from  "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

const db = getDatabase();
        //-- Get Database --//
        const blogSection = document.getElementById("blog-section");
        



        const blogEntryRefTitle = ref(db, 'Blog/Title');
        const blogEntryRefText = ref(db, 'Blog/Text');
        onValue(blogEntryRefTitle, (snapshot) => {
            const dataTitle = snapshot.val();
            console.log(dataTitle);

            onValue(blogEntryRefText, (snapshot) =>{
              const dataText = snapshot.val();
              console.log(dataText);
              
              blogSection.innerHTML +=`
              <div class="blog-card">
               <img src="img/banner.jpg" alt="header" class="blog-image">
               <h1 id="blog-title">${dataTitle}</h1>
               <p id="blog-overview">${dataText}</p>
               <a href="/" class="btn dark">read</a>
              </div>
              `;

        })
        
                    
            
        });
let search = document.querySelector('#sec');
let container = document.querySelector('#container');
let time=document.querySelector('#year');
let length=document.querySelector("#plot")
document.querySelector("button").addEventListener("click", (e) => {
            e.preventDefault();
            let moviename = search.value;
            let year=time.value;
            let plot=length.value;
            getDetails(moviename);
        });
        
        async function getDetails(moviename) {
            let apiUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=71c8861e&t=?${moviename}&y=?${year}&plot=${plot}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            renderContent(data);
            console.log(data);
        }
        
        function renderContent({Title,Poster,Year,Released,Runtime,Genre,Actors,Awards,Language,Writer,imdbRating}) {
            if(Title===undefined){
                // alert("Check the movie Name");
                const html=`
                <h1>We can't able to find the movie </h1>
                <h1>Please try again or Check the Spelling</h1>
                `;
                container.innerHTML=html;
                return;
            }

        
            const html = `
            <div>
            <h1 style="color:blue; font-size:35px">${Title.toUpperCase()}</h1>
            <img src="${Poster}">
            </div>
            <div>
    
            <p style="color: #00ffcc;">Year:<span style="color: #ffcc00;">${Year}</span></p>
            <p style="color: #00ffcc;">Date: <span style="color: #ffcc00;">${Released}</span></p>
            <p style="color: #00ffcc;">Runtime:<span style="color: #ffcc00;">${Runtime}</span></p>
            <p style="color: #00ffcc;">Genre:<span style="color: #ffcc00;">${Genre}</span></p>
            <p style="color: #00ffcc;">Writer:<span style="color: #ffcc00;">${Writer}</span></p>
            <p style="color: #00ffcc;">Actors:<span style="color: #ffcc00;">${Actors}</span></p>
            <p style="color: #00ffcc;">Languages:<span style="color: #ffcc00;">${Language}</span></p>
            <p style="color: #00ffcc;">Rating:<span style="color: #ffcc00;">${imdbRating}</span></p>
            <p style="color: #00ffcc;">Awards:<span style="color: #ffcc00;">${Awards}</span></p>
            </div>
            `;

            container.innerHTML = html;
    
            
        }
        
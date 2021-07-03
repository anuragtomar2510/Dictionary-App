let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not-found");
let defBox = document.querySelector(".def");
let audBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");
const apiKey = '7bf2f083-e661-49ff-a1e0-9355cc7c5262';



searchBtn.addEventListener('click', (event) => {

        event.preventDefault();
        
        audBox.innerHTML = '';
        notFound.innerText = '';
        defBox.innerText = '';
        
        let word = input.value;

        if(word === '') {

                alert('Word is required')
                return;

        } 

        getData(word);

});



async function getData(word) {

        loading.style.display = 'block';
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)

        const data = await response.json();

        if(!data.length) {
        
         loading.style.display = 'none';
         notFound.innerText = 'No Result Found';
                return;

       }

        if(typeof data[0] === 'string') {

                loading.style.display = 'none';
                let heading = document.createElement('h3');
                heading.innerText = 'Did you mean ?';
                notFound.appendChild(heading);

                data.forEach(element => {

                        let suggestion = document.createElement('span');
                        suggestion.classList.add('suggested');
                        suggestion.innerText = element;
                        notFound.appendChild(suggestion);

                 });

                return;

       }

       loading.style.display = 'none';
       let definition = data[0].shortdef[0];
       defBox.innerText = definition;

       const soundName = data[0].hwi.prs[0].sound.audio;

       if(soundName) {

                renderSound(soundName);

       }

}



function renderSound(soundName) {

        console.log(soundName);

        let subFolder = soundName.charAt(0);
        console.log(subFolder);
        let soundSrc = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subFolder}/${soundName}.mp3?key=561b1fcc-31fa-4c20-9561-175b8ce5136e`;

        
        let aud = document.createElement('audio');
        aud.src = soundSrc;
        aud.controls = true;
        audBox.appendChild(aud);

}


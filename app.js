const   input = document.querySelector('#input');
const   searchBtn = document.querySelector('#search');
const apiKey = '89d1889e-a1c1-498e-8338-55bfb90ba12e';
const   notFound = document.querySelector('.not__found');
const defBox = document.querySelector('.def')
const audioBox = document.querySelector('.audio')
const loading = document.querySelector('.loading')


searchBtn.addEventListener('click', function(e){
    e.preventDefault();


    //clear old data 

    audioBox.innerHTML ='';
    notFound.innerText = '';
    defBox.innerText = '';

    //Get input data

    let word = input.value;

    //call  API get data

    if (word === ''){
         alert('Word is required');
         return;
    }

    getData(word)
})

 async function getData(word){

    loading.style.display = 'block';
   // ajax call
   
   const response=  await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
    
   const data = await response.json();


   // if empty result
   if(!data.length){
    loading.style.display = 'none';
    notFound.innerText = 'No Result Found';

    return;
   }

   // If result is suggestion
   if(typeof data[0] === 'string'){
 
    loading.style.display = 'none';

    let heading = document.createElement('h3');

    heading.innerText = 'Did you mean?'

    notFound.appendChild(heading);

    data.forEach(element =>{
        let suggetion = document.createElement('span');

        suggetion.classList.add('suggested');

        suggetion.innerText = element;

        notFound.appendChild(suggetion)
    })
    return;

   }

   //Result found
   loading.style.display = 'none';
   let  defination = data[0].shortdef[0]; 
   defBox.innerText = defination;


   //Sound

   const soundName = data[0].hwi.prs[0].sound.audio;
   if(soundName){
     renderSound(soundName);
   }

}


function renderSound(soundName){
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

     let aud = document.createElement('audio');
     aud.src = soundSrc;

     aud.controls = true;

     audioBox.appendChild(aud);
}
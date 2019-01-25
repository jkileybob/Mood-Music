document.addEventListener('DOMContentLoaded', ()=>{
  getAllMoods();
  submitNewMoodEventListener();
  // getMusic();
});

/////////////////////FETCH REQUESTS:
// mood fetches:
function getAllMoods(){
  fetch(`http://localhost:3000/moods`)
  .then(response => response.json())
  .then(moods => {
    moods.forEach((mood) => {
      renderMood(mood);
    })
  })
}

function createMood(newMoodObj){
  fetch(`http://localhost:3000/moods`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(newMoodObj)
  }).then(response => response.json())
  .then(mood => renderMood(mood))
}

function deleteMood(id){
  fetch(`http://localhost:3000/moods/${id}`, {
    method: "DELETE",
  }).then(response => response.json())
  .then((mood)=>{
     document.getElementById(`mood-${id}`).remove()
  })
}

// music fetches:
function getMusic(id){
  // debugger
  fetch(`http://localhost:3000/musics/${id}`)
  .then(response => response.json())
  .then(music => {
    // filterMusic(music)
      showMusic(music);
    })
  }


function filterMusic(){
// let x = moodArr.filter(moodArr => {moodArr.length >= 1})
// debugger
// console.log(x)
}

/////////////////////////////////////   DOM manipulation:

// ////////////////                          form:
function submitNewMoodEventListener(){
  let newMoodForm = document.getElementById("mood-form");
  newMoodForm.addEventListener('submit', newMoodHandler)
}
function getMoodForm(){
  return document.getElementById("mood-form");
}

/////////////////////                        mood:
function renderMood(moodObj){
  let div = document.getElementById('moods')
  let divMood = document.createElement('div')
    divMood.id = `mood-${moodObj.id}`
    divMood.classList.add('card')

  let h2Mood = document.createElement('h2')
    h2Mood.innerText = moodObj.name

  let imgMood = document.createElement('img')
    imgMood.src = moodObj.img_url
    imgMood.id = `mood-img-${moodObj.id}`
    imgMood.addEventListener('click', () => {imgMoodOnClick(moodObj)})

  let pMood = document.createElement('p')
    pMood.innerText = moodObj.description
  let deleteBtn = document.createElement('button')
    deleteBtn.id = `delete-mood-${moodObj.id}`
    deleteBtn.innerText = "Can't even.";
    deleteBtn.addEventListener('click', onClickDeleteHandler)

  div.appendChild(divMood)

  divMood.appendChild(h2Mood);
  divMood.appendChild(imgMood);
  divMood.appendChild(pMood);
  divMood.appendChild(deleteBtn);

}
//////////////////////////////////////////      music:
function showMusic(musicObj){
  let moodDiv = document.getElementById(`mood-${musicObj.moods[0].id}`)
  // let mainDiv = document.getElementById('moods')
  // let divMusicContainer = document.createElement('div')
  //   divMusicContainer.classList.add('music-container')
  let divCard = document.createElement('div')
    divCard.classList.add('card')
    divCard.id = `music-card-${musicObj.id}`
  let h2Artist = document.createElement('h2')
    h2Artist.innerText = musicObj.artist
  let artistImg = document.createElement('img')
    artistImg.src = musicObj.artist_img
      artistImg.width = 500
      artistImg.height = 350
  let title = document.createElement('h3')
      title.innerText = musicObj.title

  let vibe = document.createElement('div')
    vibe.classList.add('vibe-container')
    vibe.id = `vibe-${musicObj.id}`
  let vibeText = document.createElement('h3')
    vibeText.innerText = "Vibe?"
  let vibeSlider = document.createElement('input')
    vibeSlider.classList.add('slider')
    vibeSlider.type = "range"
    vibeSlider.id = `vibe-slider-${musicObj.id}`
    vibeSlider.min = 0
    vibeSlider.max = 5
    vibeSlider.value = `${musicObj.vibe}`
  let showVibe = document.createElement('p')
    showVibe.innerText = 'say something here'
  let showValue = document.createElement('span')
    // showValue.id = `vibe-value`


  // let media = document.createElement('div')
  //   media.classList.add('youtube-player')
  //   media.src = musicObj.media_url
  //     media.width = 420
  //     media.height = 315

  moodDiv.appendChild(divCard);
  divCard.appendChild(h2Artist);
  divCard.appendChild(artistImg);
  // divCard.appendChild(media)
  divCard.appendChild(title);
  title.appendChild(vibe)
  vibe.appendChild(vibeText)
  vibe.appendChild(vibeSlider)
  vibeText.appendChild(showVibe)
  vibeText.appendChild(showValue)
}


/////////////////////////////// HANDLERS:
// new mood form:
function moodFormOnclick(click) {
  var showBtn = document.getElementById("mood-form");
  if(click==1)
  showBtn.style.display="none";
  else
  showBtn.style.display="block";
}

function newMoodHandler(e){
  e.preventDefault();
  let newMoodObj = {
  name: document.getElementById('mood-name-input').value,
  description: document.getElementById('mood-description-input').value,
  img_url: document.getElementById('mood-img-input').value
  }
  createMood(newMoodObj);
  getMoodForm().reset();
}


// mood handlers:
function onClickDeleteHandler(e){
  let id = parseInt(e.currentTarget.id.split('-')[2])
  deleteMood(id);
}

function imgMoodOnClick(moodObj){
  // debugger
  moodObj.musics.forEach((music)=>{getMusic(music.id)})
}

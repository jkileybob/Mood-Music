document.addEventListener('DOMContentLoaded', ()=>{
  getAllMoods();
  submitNewMoodEventListener();
  submitNewMusic();
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

function createMusic(newMusicObj){
  fetch(`http://localhost:3000/musics`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(newMusicObj)
  }).then(response => response.json())
    .then(music => showMusic(music))
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


////////////////////////////////////     DOM MANIPULATION   mood:
function renderMood(moodObj){
  let div = document.getElementById('moods')
  let divMood = document.createElement('div')
    divMood.id = `mood-${moodObj.id}`
    divMood.classList.add('col')

  let h2Mood = document.createElement('h2')
    h2Mood.innerText = moodObj.name

  let imgMood = document.createElement('img')
    imgMood.classList.add('img-rounded')
    imgMood.src = moodObj.img_url
    imgMood.width = 500
    imgMood.height = 350
    imgMood.id = `mood-img-${moodObj.id}`
    imgMood.addEventListener('click', () => {imgMoodOnClick(moodObj)})

  let pMood = document.createElement('p')
    pMood.innerText = moodObj.description
  let deleteBtn = document.createElement('button')
    deleteBtn.id = `delete-mood-${moodObj.id}`
    deleteBtn.innerText = "Can't even. This mood is TRASH.";
    deleteBtn.addEventListener('click', onClickDeleteHandler)

    let btnText = document.createElement('p')
      btnText.innerText = "not doing it for you?"
    let btn = document.createElement('button')
      btn.innerText = "then add new mood tunes."
      btn.addEventListener('click', ()=>{musicFormOnClick(moodObj)})

  div.appendChild(divMood)
  divMood.append(h2Mood, imgMood, pMood, btnText, btn, deleteBtn);
}

// function getMoodDiv(){
//   return document.getElementsByClassName('mood-class')
// }


function clearFunction(e){
  return e.target.parentElement.innerHTML = ""
  // debugger
}

//////////////////////////////////////////   DOM MANIPULATION   music:
function showMusic(musicObj){
  let moodDiv = document.getElementById(`mood-${musicObj.moods[0].id}`)
  let divCard = document.createElement('div')
    divCard.classList.add('media')
    divCard.id = `music-card-${musicObj.id}`
    moodDiv.appendChild(divCard);

  let h2Artist = document.createElement('h1')
    h2Artist.classList.add('media-heading')
    h2Artist.innerText = musicObj.artist
  let artistImg = document.createElement('img')
    artistImg.classList.add('media-left')
    artistImg.src = musicObj.artist_img
      artistImg.width = 500
      artistImg.height = 350
  let title = document.createElement('h2')
    title.classList.add('media-heading')
    title.innerText = `"${musicObj.title}"`
    // debugger


  let vibe = document.createElement('div')
    vibe.classList.add('vibe-container')
    vibe.id = `vibe-${musicObj.id}`
  let vibeText = document.createElement('h5')
    vibeText.innerText = "Got feelings?"
  let vibeSlider = document.createElement('input')
    vibeSlider.classList.add('slider')
    vibeSlider.type = "range"
    vibeSlider.id = `vibe-slider-${musicObj.id}`
    vibeSlider.min = 0
    vibeSlider.max = 10
    vibeSlider.value = `${musicObj.vibe}`
  let showVibe = document.createElement('h5')
    showVibe.innerText = `set the vibe: ${musicObj.vibe}`
  let showValue = document.createElement('h5')
    // showValue. = `vibe-value-${musicObj.vibe}`
    // showValue.innerText = `${musicObj.vibe}`

  let media = document.createElement('iframe')
    media.classList.add('media-player')
    media.src = musicObj.media_url
      media.width = 500
      media.height = 350

  let noBtn = document.createElement('button');
    noBtn.innerText = "thank u, NEXT";
    noBtn.addEventListener('click', clearFunction)

  divCard.append(h2Artist, artistImg, media, title, noBtn);
  title.append(vibe);
  vibe.append(vibeText, showVibe, vibeSlider);
  // vibe.append(showVibe, showValue);
}


/////////////////////////////// HANDLERS:
// new mood form:
function moodFormOnclick(click) {
  var showBtn = document.getElementById("mood-form-container");
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
  moodObj.musics.forEach((music)=>{getMusic(music.id)})
}

// new MUZAK form:

function newMusicForm(musicObj){
  let form = document.createElement('form')
  let input = document.createElement('input')
    input.type = 'submit'
    input.value = "Submit"
    // <input type="submit" value="Submit">
    // input.value = "create."

    // let musicSubmitBtn = document.createElement('button')
    //   // musicSubmitBtn.onClick = ()=>{submitNewMusic(musicObj)};
    //   musicSubmitBtn.innerText = "Create."
    //   musicSubmitBtn.addEventListener('submit')

  let div = document.createElement('div')
    div.classList.add(`new-media-form-mood-id-${musicObj.id}`)
  let header = document.createElement('h1')
    header.innerText = `Add a song to set this mood: ${musicObj.name}`
  let titleLbl = document.createElement('label')
    titleLbl.innerText = "song"
  let title = document.createElement('input')
    title.type = "text"
    title.placeholder = "Song title here."
  let artistLbl = document.createElement('label')
    artistLbl.innerText = "artist"
  let artist = document.createElement('input')
    artist.type = "text"
    artist.placeholder = "Song artist here."
  let imgLbl = document.createElement('label')
    imgLbl.innerText = "artist img"
  let imgLink = document.createElement('input')
    imgLink.type = "text"
    imgLink.placeholder = "Gimme a pic."
  let mediaLbl = document.createElement('label')
    mediaLbl.innertext = "media"
  let mediaLink = document.createElement('input')
    mediaLink.type = "text"
    mediaLink.placeholder = "Embedded link PLZ"

  // let dropTheMood = document.createElement('select')
  //   dropTheMood.name = "CHOOZ UR MOODZ"
  //   let option = document.createElement('option')
      // option.value =

  document.body.appendChild(form);
  form.append(div, header, titleLbl, artistLbl, imgLbl, mediaLbl);
  titleLbl.appendChild(title);
  artistLbl.appendChild(artist);
  imgLbl.appendChild(imgLink);
  mediaLbl.appendChild(mediaLink);

  // form.append(dropTheMood, musicSubmitBtn);
}


function musicFormOnClick(e){
  e.preventDefault;
  let musicObj = e
  // debugger
  newMusicForm(musicObj);
}

function submitNewMusic(e){
  // e.preventDefault();
  // const newMusic = document.getElementById('submitMusic').value
  // SUBMIT EVENT
  // debugger
  // fetch post newMusic
}

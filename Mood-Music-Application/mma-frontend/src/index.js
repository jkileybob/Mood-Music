document.addEventListener('DOMContentLoaded', ()=>{
  // console.log
  getAllMoods();
  submitEventListener();
});

// FETCH REQUESTS:
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
function updateMood(moodUpdate){
  fetch(`http://localhost:3000/moods/${moodUpdate.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(moodUpdate)
  })
  .then(response => response.json())
  .then(updatedMood => {
    console.log(updatedMood)
  })
}
function deleteMood(id){
  fetch(`http://localhost:3000/moods/${id}`, {
    method: "DELETE",
  }).then(response => response.json())
  .then((mood)=>{
     document.getElementById(`mood-${id}`).remove()
  })
}



function renderMood(moodObj){
  let ulMood = document.getElementById('moods')
  let divMood = document.createElement('div')
    divMood.id = `mood-${moodObj.id}`
  let h2Mood = document.createElement('h2')
    h2Mood.innerText = moodObj.name
  let imgMood = document.createElement('img')
    imgMood.src = moodObj.img_url
  let pMood = document.createElement('p')
    pMood.innerText = moodObj.description
  let deleteBtn = document.createElement('button')
      deleteBtn.id = `delete-mood-${moodObj.id}`
      deleteBtn.addEventListener('click', onClickDelete)

  divMood.appendChild(h2Mood)
  divMood.appendChild(imgMood)
  divMood.appendChild(pMood)
  divMood.appendChild(deleteBtn)

  ulMood.appendChild(divMood)
}



// HANDLER:
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

function onClickDelete(e){
  let id = parseInt(e.currentTarget.id.split('-')[2])
  deleteMood(id);
}

// DOM Stuff:
function getMoodForm(){
  return document.getElementById("mood-form");
}

function moodFormOnclick(click) {
  var showBtn = document.getElementById("mood-form");
  if(click==1)
  showBtn.style.display="none";
  else
  showBtn.style.display="block";
}

function submitEventListener(){
  let submitMoodForm = document.getElementById("mood-form");
  submitMoodForm.addEventListener('submit', newMoodHandler)
}

document.addEventListener('DOMContentLoaded', ()=>{
  // console.log
  getAllMoods();
});

// MOOD:
function getAllMoods(){
  fetch(`http://localhost:3000/moods`)
  .then(response => response.json())
  .then(moods => {
    moods.forEach((mood) => {
      let moodInstance = new Mood(mood.id, mood.name, mood.description, mood.img_url)
      moodInstance.render();
    })
  })
}

function createMood(mood){
  fetch(`http://localhost:3000/moods`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(mood)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let newMood = new Mood(mood.id, mood.name, mood.description, mood.img_url)
  })
}

function updateMood(moodUpdate){
  // debugger
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
     document.querySelector(`#mood-${id}`).remove()
  })
}

// MUSIC:
function getAllMusics(){
  fetch(`http://localhost:3000/musics`)
  .then(response => response.json())
  .then(musics => {
    musics.forEach((music) => {
      let musicInstance = new Music(music.id, music.title, music.artist, music.img_url)
      musicInstance.render();
    })
  })
}

class Mood {
  constructor(id, name, description, img_url){
    this.id = id
    this.name = name
    this.description = description
    this.img_url = img_url
    Mood.all.push(this)
  }

  render(){
    let ulMood = document.getElementById('moods')
    let divMood = document.createElement('div')
      divMood.id = `mood-${this.id}`
    let h2Mood = document.createElement('h2')
      h2Mood.innerText = this.name
    let imgMood = document.createElement('img')
      imgMood.src = this.img_url
    let pMood = document.createElement('p')
      pMood.innerText = this.description

    divMood.appendChild(h2Mood)
    divMood.appendChild(imgMood)
    divMood.appendChild(pMood)

    ulMood.appendChild(divMood)
  }

}


function moodFormOnclick(click) {
  var showBtn = document.getElementById("mood-form");
  if(click==1)
  showBtn.style.display="none";
  else
  showBtn.style.display="block";
}
Mood.all = []


const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json'
let storyArea = document.querySelector('#story-area')

let aLocalData = []
let oSelected = {}

const elDataCall = document.querySelector('#fetch')

elDataCall.addEventListener('click', getData)

async function getData() {
  try {

    const response = await axios.get(apiData)
    for (i = 0; i < response.data.length; i++) {
      aLocalData[i] = response.data[i];
    }
    randomFetch(aLocalData)
  } catch (err) {
    console.error(`Error! → ${err}`)
  }
}
// getData()

function randomFetch() {
  const randomIndex = Math.floor(Math.random() * (aLocalData.length - 1))
  oSelected = aLocalData[randomIndex]
  renderStory()
}


function renderStory() {
  clearStory()
  let text = oSelected.note_squirrel_park_stories

  let regex = /\.\s/g
  text = text.replaceAll(".'", "'.<br/>")
  text = text.replaceAll(regex, ".<br/>")
  const textLines = text.replaceAll('\n', '<br/>').split('<br/>')

  for (let i = 0; i < textLines.length; i++) {
    let newP = document.createElement('p')
    let newText = textLines[i]
    newP.classList.add('hidden')
    newP.innerText = newText
    storyArea.append(newP)
  }
  fadeText()
}

function fadeText() {
  console.log('fade text called')
  let i = 0
  let time = setInterval(() => {
    console.log(storyArea)
    if (i == storyArea.children.length) {
      clearInterval(time)
    } else {
      storyArea.children[i].classList.remove('hidden')
      i++;
    }
  }, 700)
}
function clearStory() {
  while (storyArea.lastChild) {
    storyArea.removeChild(storyArea.lastChild)
  }
}
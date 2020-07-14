
const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json'
const storyArea = document.querySelector('#story-area')
const dayIcon = document.querySelector('.fa-sun')
const niteIcon = document.querySelector('.fa-moon')
const dateDisplay = document.querySelector('#date')
const hectareDisplay = document.querySelector('#hectare')

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

  renderIconBar()

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
    console.log(`Story Area timed render: ${storyArea.children[i]} at index ${i} of length ${storyArea.children.length}`)
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

function renderIconBar() {
  const sMonth = 'October'
  const sDay = oSelected.date.slice(2, 4)
  const sYear = oSelected.date.slice(4)
  let sDayOfWeek = undefined 

  switch (sDay % 7) {
    case 0: {
      sDayOfWeek = 'Sunday'
      break
    }
    case 1: {
      sDayOfWeek = 'Monday'
      break
    }
    case 2: {
      sDayOfWeek = 'Tuesday'
      break
    }
    case 3: {
      sDayOfWeek = 'Wednesday'
      break
    }
    case 4: {
      sDayOfWeek = 'Thursday'
      break
    }
    case 5: {
      sDayOfWeek = 'Friday'
      break
    }
    case 6: {
      sDayOfWeek = 'Saturday'
      break
    }
    default: {
      console.log('day-of-week parse error')
      break
      }
  }
  const shift = oSelected.shift
  console.log(dayIcon.classList)
  
  switch (shift) {
    case 'AM':
      if (!dayIcon.classList.contains('activated')) dayIcon.classList.add('activated')
      if (niteIcon.classList.contains('activated')) niteIcon.classList.remove('activated')
      break
    case 'PM':
      if (!niteIcon.classList.contains('activated')) niteIcon.classList.add('activated')
      if (dayIcon.classList.contains('activated')) dayIcon.classList.remove('activated')
      break
    default:
      console.error('Shift icon logic error')
  }
  const sDateDisplayText = `${sDayOfWeek}, ${sMonth} ${sDay}, ${sYear}`
  dateDisplay.innerText = sDateDisplayText
  const sHectare = oSelected.hectare
  hectareDisplay.innerText = `Hectare ${sHectare}`

  }
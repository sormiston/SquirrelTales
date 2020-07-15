
// HTML Element and API constants
const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json'
const storyArea = document.querySelector('#story-area')
const dayIcon = document.querySelector('.fa-sun')
const niteIcon = document.querySelector('.fa-moon')
const dateDisplay = document.querySelector('#date')
const hectareDisplay = document.querySelector('#hectare')
const dataCall = document.querySelector('#fetch')
const mapView = document.querySelector('.map-view')

// local global variables
const aYAxisLetters = ['A','B','C','D','E','F','G','H','I']
let aLocalData = []
let oSelected = {}
let sHectare = undefined


dataCall.addEventListener('touchstart', getData)
dataCall.addEventListener('click', getData)

async function getData(e) {
  try {
    console.log(e)
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
  const regex1 = /\.\\"/g
  const regex2 = /\.\s/g
  const regex3 = /\\n/g
  text = text.replace(regex1, "'.<br/>")
  text = text.replace(regex2, ".<br/>")
  const textLines = text.replace(regex3, '<br/>').split('<br/>')

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
  // Can some of this functionality be moved to CSS under transition-delay property??              << SIMPLIFY (?)
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

  renderIconBar()
}

function clearStory() {
  while (storyArea.lastChild) storyArea.removeChild(storyArea.lastChild)
  
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
  sHectare = oSelected.hectare
  hectareDisplay.innerText = `Hectare ${sHectare}`

  renderMap()
}
  
function renderMap() {
  // clear previous grid
  while (mapView.lastChild) mapView.removeChild(mapView.lastChild)
  // Hard-coded to select between 2 map halves, each 21 x 9
  let sHectareX = sHectare.substr(0, 2)
    switch (sHectareX <= 21) {
      case true: {
        if (!mapView.classList.contains('parkSouth')) mapView.classList.add('parkSouth')
        if (mapView.classList.contains('parkNorth')) mapView.classList.remove('parkNorth')
        generateGrid(1, 21)
        break
      }
      case false:
        if (!mapView.classList.contains('parkNorth')) mapView.classList.add('parkNorth')
        if (mapView.classList.contains('parkSouth')) mapView.classList.remove('parkSouth')
        generateGrid(22, 42)
        break
      default:
        console.error('Hectare parse error')
    }

  activateHectare(oSelected.hectare)

  function activateHectare(input) {
    let hectare = document.getElementById(input)
    hectare.classList.add('activated-grid')
    console.log(hectare)
  }
  function generateGrid(origin, end) {
    for (let i = 0; i <= 8; i++) {
      for (let j = origin; j <= end; j++) {
        let newDiv = document.createElement('div')
        newDiv.id = `${(j.toString()).padStart(2, '0')}${aYAxisLetters[i]}`
        newDiv.classList.add('hectare')
        newDiv.innerText = newDiv.id
        // console.log(newDiv.id)
        mapView.append(newDiv)
      }
    }
  }
}
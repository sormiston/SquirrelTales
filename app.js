
// HTML Element and API constants
const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json'
const storyArea = document.querySelector('#story-area')
const storyDash = document.querySelector('main')
const dayIcon = document.querySelector('.fa-sun')
const niteIcon = document.querySelector('.fa-moon')
const dateDisplay = document.querySelector('#date')
const hectareDisplay = document.querySelector('#hectare')
const dataCall = document.querySelector('#fetch')
const mapView = document.querySelector('.map-view')
const iconBar = document.querySelector('.icon-bar')


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
    iconBar.scrollIntoView({behavior: 'smooth'})
    const response = await axios.get(apiData)
    for (i = 0; i < response.data.length; i++) {
      aLocalData[i] = response.data[i];
    }
    randomFetch(aLocalData)
  } catch (err) {
    console.error(`Error! → ${err}`)
  }
}

function randomFetch() {
  
  mapView.style.opacity = 0;
  const randomIndex = Math.floor(Math.random() * (aLocalData.length - 1))
  oSelected = aLocalData[randomIndex]
  renderIconBar()
  renderStory()
}

function renderStory() {
  clearStory()
  renderMap()
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
      
      activateHectare(oSelected.hectare)
    } else {
      storyArea.children[i].classList.remove('hidden')
      i++;
    }
  }, 700)
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
  carry(storyDash)
}
  
function renderMap() {
  // clear previous grid
  while (mapView.lastChild) mapView.removeChild(mapView.lastChild)
        generateGrid(1, 42) 
  
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

function activateHectare(input) {
  let hectare = document.getElementById(input)
  hectare.classList.add('activated-grid')
  mapView.style.opacity = 1;
  hectare.scrollIntoView({behavior:'smooth', block:'center', inline:'center'})
}

function carry(elt) {
  elt.classList.add('fixed');
}

// Function to establish fixed position in X-axis ONLY -- 
// CREDIT to RICKY HARRISON, Leeds, UK - 
// ARTICLE -- http://www.rickyh.co.uk/css-position-x-and-position-y/
// CODEPEN -- https://codepen.io/rickyH/pen/GoJWEe

(function(window) {
  
  /* A full compatability script from MDN: */
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
 
  /* Set up some variables  */
  const beforeMap = document.querySelector('#before-map')
  const afterMap = document.querySelector('#after-map')
  /* Add an event to the window.onscroll event */
  window.addEventListener("scroll", function(e) {  
    
    /* A full compatability script from MDN for gathering the x and y values of scroll: */
    // var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
   var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
 
      beforeMap.style.top = -y + 25 + "px"
      afterMap.style.top = -y + 950 + "px"
    })
  })
  (window);
 


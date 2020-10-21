
const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json'


const storyArea = document.querySelector('#story-area')
const storyDash = document.querySelector('main')
const dayIcon = document.querySelector('.fa-sun')
const niteIcon = document.querySelector('.fa-moon')
const dateDisplay = document.querySelector('#date')
const hectareDisplay = document.querySelector('#hectare')
const dataCall = document.querySelector('#fetch')
const mapView = document.querySelector('#map-view')
const iconBar = document.querySelector('.icon-bar')
const beforeMap = document.querySelector('#before-map')
const afterMap = document.querySelector('#after-map')

// local global variables to pass data between functions without worrying about local closure
const aYAxisLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let aLocalData = []
let oSelected = {}
let sHectare = undefined
let aDataByHectare = []

// Event listener 
dataCall.addEventListener('click', handleClickTouch)

// the event handler callback must perform some control flow --
// first, check if the API data has been tapped and localized yet - if so, no need to tap it again this session
// second, check if event calls from "random" button or a specific hectare

function handleClickTouch(e) {
  try {
    if (!aLocalData.length > 0) {
      getData()
    } else {
      if (e.target.id == "fetch") {
        randomFetch(aLocalData)
      } else if (e.target.classList.contains('hectare')) {
        aDataByHectare = aLocalData.filter(obj => obj.hectare == e.target.id)
        randomFetch(aDataByHectare)
      }
    }
  } catch (err) {
    console.error(e)
  }
}
// API call
async function getData() {
  try {
    const response = await axios.get(apiData + appToken)
    for (i = 0; i < response.data.length; i++) {
      aLocalData[i] = response.data[i];
    }
    randomFetch(aLocalData)
  } catch (err) {
    console.error(`Error! → ${err}`)
  }
}
// the data argument is either the full dataset aLocalData OR aDataByHectare, which is a filtered subarray where hectare matches
// the ID of the div that generated the call
function randomFetch(data) {
  const randomIndex = Math.floor(Math.random() * (data.length - 1))
  oSelected = data[randomIndex]
  // and we proceed to the rendering functions
  renderIconBar()
  window.matchMedia('(max-width: 800px)').matches ? renderMobileStory() : renderStory()
}


function renderStory() {
  clearStory()
  // clear/initialize map space in advance of when needed
  while (mapView.lastChild) mapView.removeChild(mapView.lastChild)
  mapView.style.display = 'grid';
  generateGrid(1, 42, 0, 8)
  // toggle body for expanded layout conditions
  document.querySelector('body').classList.add('display-state')
  // detach and fix storyDash for transport 
  carry(storyDash, afterMap)
  // center screen on relevant hectare
  let hectare = document.getElementById(oSelected.hectare)
  hectare.classList.add('activated-grid')
  hectare.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  // sanitize text 
  treatText()
  fade()
}
function renderMobileStory() {
  clearStory()

  // clear/initialize map space in advance of when needed
  while (mapView.lastChild) mapView.removeChild(mapView.lastChild)
  
  // Convert the row letter to num (inde of alphabet array)...for better handling
  const hectareCol = Number(oSelected.hectare.substr(0, 2))
  const hectareRow = aYAxisLetters.indexOf(oSelected.hectare.substr(2))
  console.log(hectareCol, hectareRow)
  mapView.style.display = 'grid'
  mapOffset(hectareCol, hectareRow)
  determineEnvirons(hectareCol, hectareRow)

  // must be called after grid is generated
  const hectare = document.getElementById(oSelected.hectare)
  hectare.classList.add('activated-grid')
  
  // toggle body for expanded layout conditions
  document.querySelector('body').classList.add('display-state')
  
  // center screen on relevant hectare
  // hectare.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  
  treatText()
  fade()
}

function treatText() {
  let text = oSelected.note_squirrel_park_stories
  const regex1 = /\.\\"/g
  const regex2 = /\.\s/g
  const regex3 = /\n/g
  text = text.replace(regex1, "'.<br/>")
  text = text.replace(regex2, ".<br/>")
  // complete <br> insertion and SPLIT into an array of lines to print out, line-by-line
  text = text.replace(regex3, ' ')
  const textLines = text.split('<br/>')
  console.log(textLines)

  for (let i = 0; i < textLines.length; i++) {
    let newP = document.createElement('p')
    let newText = textLines[i]
    newP.classList.add('hiddenText')
    newP.innerText = newText
    storyArea.append(newP)
  }
}

function mapOffset(nCol, nRow) {
  // special case for last column - 42 - to not go over map edge
  const nXOffset = (nCol !== 42) ? -(((nCol >= 2 ? nCol : 2) - 2) * 100) : -((nCol - 3) * 100) 
  const nYOffset = -(((nRow >= 2 ? nRow : 2 )- 2) * 100)
  mapView.style.backgroundPosition = `${nXOffset}px ${nYOffset}px`
}

function determineEnvirons(nCol, nRow) {
  console.log(oSelected.hectare)
  if (nCol === 1) {
    if (nRow === 0) {
      generateGrid(nCol, nCol + 2, nRow, nRow + 2)
    } else if (nRow === 8) {
      generateGrid(nCol, nCol + 2, nRow - 2, nRow)
    } else {
      generateGrid(nCol, nCol + 2, nRow - 1, nRow + 1)
    }
  } else if (nCol === 42) {
    if (nRow === 0) {
      generateGrid(nCol - 2, nCol, nRow, nRow + 2)
    } else if (nRow === 8) {
      generateGrid(nCol - 2, nCol, nRow - 2, nRow)
    } else {
      generateGrid(nCol - 2, nCol, nRow - 1 , nRow + 1)
    }
  } else if (nRow === 0 && nCol !== 1 && nCol !== 42) {
    generateGrid(nCol - 1, nCol + 1, nRow, nRow + 2)
  } else if (nRow === 8 && nCol !== 1 && nCol !== 42) {
    generateGrid(nCol - 1, nCol + 1, nRow - 2, nRow)
  } else {
    generateGrid(nCol - 1, nCol + 1, nRow - 1, nRow + 1)
  }
}

function fade() {
  // "Wait" cursor while this renders
  // document.querySelector('*').classList.add('wait')
  dataCall.classList.add('wait')
  let i = 0
  let time = setInterval(() => {

    if (i == storyArea.children.length + 1) {
      document.body.classList.remove('wait')
      dataCall.classList.remove('wait')
      for (let i of mapView.children) i.classList.remove('wait')
      clearInterval(time)
      return
    }
    if (i == storyArea.children.length) {
      mapView.style.opacity = 1
      i++
    } else {
      console.log(`${storyArea.children[i]} at index ${i} of ${storyArea.children.length}`)
      storyArea.children[i].classList.remove('hiddenText')
      i++
    }
  }, 500)
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

}

// Somewhat noteworthy: two for loops create an array layout in two dimensions and give each newly created div a unique ID which is
// generated A:J + 1:42.  These will match the hectare format on data.

function generateGrid(colStart, colEnd, rowStart, rowEnd) {
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      let newDiv = document.createElement('div')
      newDiv.id = `${(j.toString()).padStart(2, '0')}${aYAxisLetters[i]}`
      newDiv.classList.add('hectare', 'wait')
      // second click event listner, this time on each coordinate cell at time of generation
      newDiv.addEventListener('click', handleClickTouch)
      newDiv.innerText = newDiv.id
      mapView.append(newDiv)
    }
  }
}
// Second 
function carry(fixed, fixedX) {
  fixed.classList.add('fixed')
  // the after-map section will only transport along x-axis in non-mobile, full scroll version
  if (!window.matchMedia('(max-width: 800px)').matches) fixedX.classList.add('fixed-X')
}

// Function to establish fixed position in X-axis ONLY -- 
// CREDIT to RICKY HARRISON, Leeds, UK - 
// ARTICLE -- http://www.rickyh.co.uk/css-position-x-and-position-y/
// CODEPEN -- https://codepen.io/rickyH/pen/GoJWEe

(function (window) {
  /* A full compatability script from MDN: */
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

  /* Add an event to the window.onscroll event */
  window.addEventListener("scroll", function (e) {

    /* A full compatability script from MDN for gathering the x and y values of scroll: */
    // var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    // CITATION for use of window.matchMedia
    //MDN web docs
    // LINK-- https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
    window.matchMedia('(max-width: 800px)').matches ? console.log('skipping x-axis fix') : afterMap.style.top = -y + 1225 + "px"
  })
})
  (window);



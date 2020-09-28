# Project Overview

## LIVE LINK: https://sormiston.github.io/SquirrelTales/

## Project Name

SquirrelTales - deep thoughts and slices of life from the Central Park Squirrel Census of 2018

## Project Description

This project aims to offer a portrait of civic life by presenting the written observations of the 2018 Central Park Squirrel Census through a geographically-based "found poetry engine."  It is hoped that the tone of these anonymous reflections, dutifully recorded by the volunteer census takers with a fair dollop of whimsy, will invite the user to imagine positive recollections of nature, community, and Central Park itself. 

## API and Data Sample

NYC Open Data 2018 Squirrel Census - Stories -- URL: https://data.cityofnewyork.us/resource/gfqj-f768.json
```
  {
        "hectare": "14E",
        "shift": "PM",
        "date": "10172018",
        "note_squirrel_park_stories": "- Got identified as a squirrel spotter!",
        "story_topic_census_takers": true
    },
```    

## Wireframes

LINK HERE: https://wireframe.cc/pro/pp/0126f4a23358513

### MVP/PostMVP

#### MVP 
- Fetch, format-sanitize, and display random stories from API JSON data through a clickable button
- Display contextual information in an icon bar: date of entry, toggle icons indicating AM or PM census shifts
- Mobile design styling of at least one Media Query

#### PostMVP  

- CSS Grid will overlay the map and illuminate the relevant hectare mentioned in the story - COMPLETE
- Advanced animations to "slow down" UX of the app, like a scroll-out of main story display, or "paced printing" of story readout.  Icon Bar and Generate Button will sit on top of one another - on click, these divs will part to create the display space. - SEMI COMPLETE
- Click a hectare to search for stories from that sector - COMPLETE

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 13| Project Approval; HTML Mock-up & JS to store API data params to local variables | Complete ✓
|July 14| Main dynamic display and icon bar integration; working CSS Grid model | Complete ✓ | 
|July 15| Basic CSS layout and style; Sizing and placement of static map with Grid overlay; remaining time adv style modeling| Complete
|July 16| Text copy + footer w/ external links; ON NEW BRANCH: media queries for mobile; adv. styling as time allows | Complete
|July 17| Merge for successful advanced stylings if applicable; Presentations| 


## Priority Matrix

LINK --    https://git.generalassemb.ly/SeanOrmiston/SquirrelTales/blob/master/priority%20matrix.pdf

## Timeframes

Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| HTML Mockup | H | 1.5 hrs | 1.5 hr |
| Working with API | H | 3 hrs | 3.5 hrs
| Basic Story Display | H | 3 hrs | 4 hrs
| Map: JS+Grid integration | H | 6 hrs | 5 hr
| Basic CSS | L | 3 hrs | 2 hrs
| Map: DOM integration | H | 5 hrs | 4 hr
| Adv. Styling | M | 6 hrs | 4 hrs
| Flavor text + footer | M | 1.5 hrs
| Mobile | L | 1.5 hrs | 1.25 hr
| Hectare-based Search| M | 1hr15 | 2hr 
| Research |  | ?  | 8 hr

| Total | | 27.5 hrs| 21.5 hrs

## Code Snippet

The is my attempt at "micro choreographing" the animated fade ins of each *line* of text, followed by smooth scrolling transitions,
and a final "reveal" of the map.  A waiting cursor runs during this time.  

The code works in the context of a setInterval callback function running on a 500ms interval.  
An index i = 0 is introduced outside the scope of the setInterval function.
On each iteration of setInterval, a line of text is rendered and i is incremented, until all 
lines are rendered (i == storyArea.children.length) at which point the map is "revealed." On the next cycle (storyArea.children.length + 1) the waiting cursor is unset and clearInterval is called as clean-up.  

```
function fade() {
  // "Wait" cursor while this renders
  // document.body.classList.add('wait')
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
      storyArea.children[i].classList.remove('hiddenText')
      i++
    }
  }, 500)
}
```


## Change Log
 -NEW BRANCH "DirtyAvenue" - building a "off-page" horizontal scroller version of project featuring large, full size map
 Also to include clickable hectares to search stories by hectare -- SUCCESS - Thurs Jul 16 6:51PM

 -Adapting map functionality to mobile is broken by the fact that the storyArea does NOT follow the scroll to active
 Hectare simply by gaining fixed positioning, which seems to behave odd on most mobiles in horizontal direction.
  I suspect a truly functional mobile version will depend on re-engineering
 the animation sequence so the fixing/scroll only happens after 
 
 Future to roll out most venerable custom squirrel cursor
 
 COMPATABILITY ISSUES - 
 - Google Chrome 83 & Firefox for Android DO NOT SUPPORT .replaceAll() -- RESOLVED
 - Fetch button must "sleep" while rendering text to prevent user overload - OK FOR NOW
 
 07.20.20 
- Firefox for android renders 100% opaque activated grid and opaque coord fonts?
- Story paragraphs not clearing for new renders on mobile


 ## Optimizations
 - REFACTOR JS querySelectors w/ HTML for cleaner syntactic selection - esp. map-view should be an ID
 - Hit the API *only ONCE*, on page load - DONE !!
 - Re-assign dv #map-view as a class to free up CSS specificity for style override - DONE
 - DRY generation of grid items in renderMap switch statements - DONE

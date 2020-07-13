# Project Overview

## Project Name

SquirrelTales - deep thoughts and slices of life from the Central Park Squirrel Census of 2018

## Project Description

This project aims to offer a nostalgic and upbeat portrait of civic life by presenting the written words of the 2018 Central Park Squirrel volunteer Census-takers in a thoughtfully presentable interface.  It is hoped that the tone of these anonymous reflections will invite the user to employ an active imagination and access positive recollections of nature, community, and Central Park itself. 

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
- Fetch, sanitize, and display random stories from API JSON data through a clickable button
- Display contextual information in an icon bar on top of entry: date of entry, toggle between lluminating either a day or moon icon to indicate, AM or PM shift
- JS logic will display a static image of either north or southern half of Central Park depending.
  + CSS Grid will overlay the map and illuminate the relevant hectare mentioned in the story

#### PostMVP  
- Optional search term to select random entry from a pre-filtered pool
- Animated scroll out of main story display.  Icon Bar and Generate Button will sit on top of one another - on click, these divs will part to create the display space.
- Staggered fade in or typewriter effect to render text on the story display space
- Mobile version

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 13| Project Approval; HTML Mock-up & JS to store API data params to local variables | Incomplete
|July 14| Main dynamic display and icon bar integration; working CSS Grid model | Incomplete | 
|July 15| Basic CSS layout and style; Sizing and placement of static map with Grid overlay; remaining time adv style modeling| Incomplete
|July 16| Text copy + footer w/ external links; ON NEW BRANCH: media queries for mobile; adv. styling as time allows | Incomplete
|July 17| Merge for successful advanced stylings if applicable; Presentations| Incomplete


## Priority Matrix

LINK --    https://git.generalassemb.ly/SeanOrmiston/SquirrelTales/blob/master/priority%20matrix.pdf

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| HTML Mockup | H | 1.5 hrs |
| Working with API | H | 2 hrs | 
| Basic Story Display | H | 3 hrs |
| Map: JS+Grid integration | H | 5 hrs |
| Basic CSS | L | 2 hrs |
| Map: DOM integration | H | 4 hrs |
| Adv. Styling | M | 6 hrs
| Flavor text + footer | M | 1.5 hrs
| Mobile | L | 1.5 hrs |
| Optional Search | L | 1hr |

| Total | H | 27.5 hrs| 

## Code Snippet

Comfortable text readability is an important part of this project.  This code replaces the JS newline literals that are littered throughout
the story strings with HTML <br/> tags to preserve the intended flow of the entry.  Where a story string has been gotten from object and assigned to variable ```text``` ...
```
text = text.replaceAll('\n','<br/>')
text = `<p>${text}</p>`
document.querySelector('#flex-div').insertAdjacentHTML('afterbegin', text)
```
Lines 2 and 3 create the dynamic HTML and append to DOM, respectively.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

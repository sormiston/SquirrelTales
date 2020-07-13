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

Upload images of your wireframes to an image hosting site or add them to an assets folder in your repo and link them here with a description of each specific wireframe.

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 
*These are examples only. Replace with your own MVP features.*

- Find and use external api 
- Render data on page 
- Allow user to choose favorites 

#### PostMVP  
*These are examples only. Replace with your own Post-MVP features.*

- Add second API
- Use local storage to save user favorites

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|July 13| Project Approval | Incomplete
|July 13| Core Application Structure (HTML, CSS, etc.) | Incomplete
|July 14| Pseudocode / actual code | Incomplete
|July 15| Initial Clickable Model  | Incomplete
|July 16| MVP | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

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


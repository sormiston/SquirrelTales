## :fire: Code Snippet Highlights :fire:

### This space was created Oct 21, 2020, to reflect on the engineering challenges of SquirrelTales :memo:

### :triangular_flag_on_post: Challenge: Make the .PNG map an interactive element, with clickable surfaces resulting in new data queries

### :mag: Situational Detail: 
:pushpin: The map is a .png file intended by design to "break out" of usual viewport dimensions by being fixed at 4200px width and 900px height.  
:pushpin: The map .png image includes grid-lines (embedded in the image) to show the division of Central Park by hectare.  
:pushpin:The hectares are identified on the map and in the corresponding JSON file according to XY coordinates, where X in range \[1, 42], Y in range \[A,J], and JSON values schematized as nnA (n = number, A = alphabetical, ex. 01A).  
:white_check_mark: The objective UX is to allow the user to click a hectare and fetch a random story scoped to that selected hectare, even though there is no interactivity presented by the static .png image. 

### :bulb: Solution:
Javascript should generate a matrix of elements, associating an onClick event listener and unique id label to each at creation time.  Each unique id label will have to be created dynamically, provided by the indices of the loops generating the grid matrix, and they should coincide exactly with the correspoding hectare key values present in the JSON data to facilitate retrieval.
These divs will then be appended to the parent DOM element aliased as mapView.  There, they will be organized into their exact place on a CSS Grid overlay, where they will line up against the intrinsic image grid lines on the image below to a perfect fit.  To enable this, the divs will be given Grid row and column values of 1fr x 1fr in the context of a 42fr x 9fr parent grid.  

```function generateGrid(colStart: number, colEnd: number, rowStart: number, rowEnd:number) {
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      let newDiv = document.createElement('div')
      newDiv.id = `${(j.toString()).padStart(2, '0')}${aYAxisLetters[i]}`
      newDiv.classList.add('hectare', 'wait')
      newDiv.innerText = newDiv.id
      // click event listner, on each coordinate cell at time of generation
      newDiv.addEventListener('click', handleClickTouch)
      mapView.append(newDiv)
    }
  }
}
```
#### :triangular_flag_on_post: Challenge: the default map display on mobile screens is a 3 x 3 grid excerpt of the big map, depicting the selected hectare in the center.  Alter this rule to prevent generating "off-map" hectares when the selected hectare lies on an edge or corner of the map.

### :mag: Situation:
The above "generateGrid" function takes 4 arguments to know column start/end and row start/end, similiarly to the CSS Grid pattern.  It is simple to implement this to generate 3x3 grids as needed where a selected hectare is center -- if you imagine the selected hectare with coordinates (n, m) in the center, the column to its left will be n - 1 and the column to its right will be n + 1.  

```
generateGrid(n - 1, n + 1, m - 1, m + 1)
 ```
 ![3x3 map grid](https://i.imgur.com/QjeQ9iD.png)
 
 However, 
 
 
 







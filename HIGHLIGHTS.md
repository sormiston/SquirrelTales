## :fire: Code Snippet Highlights :fire:

### This space was created Oct 21, 2020, to reflect on the engineering challenges of SquirrelTales :memo:

### :triangular_flag_on_post: Challenge: Make the .PNG map an interactive element, with clickable surfaces that fetch new, geographically refined data queries

### :mag: Situational Detail: 
:pushpin:  The map is a .png file intended by design to "break out" of usual viewport dimensions by being fixed at 4200px width and 900px height.  
:pushpin:  The map .png image includes grid-lines (embedded in the image) to show the division of Central Park by hectare.  
:pushpin:   Hectares are identified on the map and in the corresponding JSON file according to XY coordinates, where X in range \[1, 42], Y in range \[A,J], and JSON values schematized as nnA (n = number, A = alphabetical, ex. 01A).  
:white_check_mark:   The objective UX is to allow the user to click a hectare and fetch a random story scoped to that selected hectare, even though there is no interactivity presented by the static .png image. 

### :bulb: Solution:
- [x] Javascript should generate a matrix of div elements, associating an onClick event listener and unique id label to each at creation time.  

- [x] Each unique id label will be created dynamically to denote that divs coordinate info, and should be a string coinciding exactly with the corresponding values in the JSON data, to facilitate retrieval.

- [x] The clicklable div elements will then be appended to the parent DOM and organized into their exact places above the correct hectares on the map by a CSS Grid overlay.  The fit between the clickable div space and the space described by the map grid lines should be perfect.  To enable this, CSS rules give each div Grid row and column values of 1fr x 1fr, while the grid parent's dimensions run 42fr x 9fr.  

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
### :triangular_flag_on_post: Challenge: the default map display on mobile screens is a 3 x 3 grid excerpt of the big map, depicting the selected hectare in the center.  Alter this rule to prevent generating "off-map" hectares when the selected hectare lies on an edge or corner of the map.

### :mag: Situation:
The above "generateGrid" function takes 4 arguments to know column start/end and row start/end, similiarly to the CSS Grid pattern.  It is simple to implement this to generate 3x3 grids where a selected hectare occupies the center space.  If you imagine the selected hectare with coordinates (n, m) in the center, the column to its left will be n - 1 and the column to its right will be n + 1.  

```
generateGrid(n - 1, n + 1, m - 1, m + 1)
 ```
 ![3x3 map grid](https://i.imgur.com/QjeQ9iD.png)
 
 However, for good UX, we want to avoid rendering spaces that don't exist on the map. This means we have to adjust the offset for all cases where the selected hectare lies on an edge or corner.  In these cases (quite *literally* **edge cases**) the offset should be adjusted to render a 3x3 grid one space "inland" on the map.
 
 ![3x3 map grid2](https://i.imgur.com/BfZ724R.png)
 
 
 
 
 







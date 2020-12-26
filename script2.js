const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let counter = 0;             //initially sets counter to 0
let first = 0;        // first card's color className
let second = 0;
let et1 = 0;    //event target
let et2 = 0;
let score = 0;
function handleCardClick(event) {  
  let e = event.target;
  verifyNumberFlipped(e);
}

function verifyNumberFlipped (e) {
  if (counter === 0) {
    flipToFace(e);
    et1 = e;
    first = e.className;
    counter++;
    return;
  }
  else if (counter === 1) {   //one card is already flipped
    flipToFace(e);            //so flip this card (UX and code)
    et2 = e;
    second = e.className;      //let this card be second
    counter++;                //add 1 to counter to get 2
    if (second === first && et1 !== et2) {       //if the second card isnt the first (code), but colors match (ux) do the following
      match();
    } else {                       //if the cards dont match do this
      noMatch();
    }
  }
  else if (counter > 1) {
    flipToBack(et1);
    flipToBack(et2);
    et1 = 0;
    et2 = 0;
    second = 0;
    first = 0;
    counter = 0;
    return;
  }
 
}

function match(){                       //adds 1 to score and takes event listeners away from cards, resets all else
  second = 0;
  first = 0;
  counter = 0;
  et1.removeEventListener("click", handleCardClick);
  et2.removeEventListener("click", handleCardClick);
  et1 = 0;
  et2 = 0;
  score++;
};

function noMatch(){                 //waits for 1 second then flips both cards to back and resets everything
  setTimeout(function(){
    second = 0;
    first = 0;
    counter = 0;
    flipToBack(et1);
    flipToBack(et2);
    et1 = 0;
    et2 = 0; }, 1000);      //throws an error, but its not a problem because the reason its an error is that what its trying to flip to back is already flipped
};

function flipToBack(e){         //flips card to back up and removes flipped class
  e.style.backgroundColor = 'white';
  e.classList.remove("flipped");
}

function flipToFace(e){            //flips card face up sets class as flipped
  e.style.backgroundColor = e.className
  e.classList.add("flipped");
}

// when the DOM loads
createDivsForColors(shuffledColors);



//import { SVGuitarChord } from "svguitar";
/* 
const chart = new SVGuitarChord("#chart");

chart
  .configure({
    
  })
  .chord({
     
  })
  .draw();
*/

//Retrieves checkbox inputs and adds them to 'listArray'

const intervalArray = [
  ["root"],
  ["b2"],
  ["2"],
  ["b3"],
  ["3"],
  ["4"],
  ["b5"],
  ["5"],
  ["b6"],
  ["6"],
  ["b7"],
  ["7"],
];

var list = document.getElementById("valueList");
var text = "<span> your selected intervals : </span>";

var listArray = [];
var chordDiagram;
var fretboardLength;

var checkboxes = document.querySelectorAll(".checkbox");
for (var checkbox of checkboxes) {
  checkbox.addEventListener("click", function () {
    if (this.checked == true) {
      listArray.push(this.value);
      valueList.innerHTML = text + listArray.join(" / ");
      console.log(this.value);
    } else {
      console.log("you unchecked the check box");
      //removing value from array if unchecked
      listArray = listArray.filter((e) => e !== this.value);
      valueList.innerHTML = text + listArray.join(" / ");
    }
  });
}



//TODO: need to order intervals in ascending order, regardless of order checked
//Order them by number so it is easy to put in ascending order, numbers point to nested arrays

//Need to make easy way to input intervals by name and convert them to selected intervals array


// Note: intervalArray[0], Interval name: intervalArray[0,1]
// selectedIntervals = [intervalArray[0],intervalarray[2],]
// checkBoxStates = [[], [], []]
// listArray = [[string, fret], [string, fret], [string, fret]]
function calculateFrets() {

  console.log(listArray);
  listArray = listArray.map(function(item){
    return parseInt(item, 10);
  });
  console.log(listArray);
  listArray.sort(function(a, b){return a-b});
  console.log(listArray);

  listArray = listArray.map(function(interval) {
    return interval + 12;
  });
  console.log(listArray);
  //Final fret numbers with string change subtractions.

  //for (let i=0; i<listArray.length; i++){
  //  listArray[i] -= i * 5
  //}

  let firstFret = listArray[0] - 0; // 0 7 9 12
  let secondFret = listArray[1] - 5;
  let thirdFret = listArray[2] - 10;
  let fourthFret = listArray[3] - 15;
  
  let allFrets = [firstFret, secondFret, thirdFret, fourthFret];
  console.log(allFrets);
  //Looping to find lowest and highest fret, used to move voicing to nut of the fretboard + decide total fretboard length on diagram.
  lowestFret = allFrets[0];
  highestFret = allFrets[0];

  for (i = 0; i <= 3; i++) {
    lowestFret = Math.min(lowestFret, allFrets[i]);
    highestFret = Math.max(highestFret, allFrets[i]);
    //if (allFrets[i] < lowestFret) lowestFret = allFrets[i];
    //if (allFrets[i] > highestFret) highestFret = allFrets[i];
  }

  console.log(allFrets);
  console.log("The lowest fret is: " + lowestFret);
  console.log("The highest fret is: " + highestFret);

  //Subtract variable used to make the chord voicing start at the lowest possible fret.
  let subtract = lowestFret - 1;
  console.log("All frets must be subtracted by " + subtract);

  fretboardLength = highestFret - lowestFret + 1;
  console.log("Fretboard length must be " + fretboardLength + " frets long.");

  chordDiagram = [
    [6, firstFret - subtract],
    [5, secondFret - subtract],
    [4, thirdFret - subtract],
    [3, fourthFret - subtract],
  ];

  let chordDiagram2 = [
    [5, firstFret - subtract],
    [4, secondFret - subtract],
    [3, thirdFret - subtract],
    [2, fourthFret - subtract + 1],
  ];

  let chordDiagram3 = [
    [4, firstFret - subtract],
    [3, secondFret - subtract],
    [2, thirdFret - subtract + 1],
    [1, fourthFret - subtract + 1],
  ];

  //need to make automated way of creating string sets, i++? on string number?

  console.log(chordDiagram);
  console.log(chordDiagram2);
  console.log(chordDiagram3);

  var chordArrayText = "<span> Your chord array results : </span>";
  var firstDiagram = "<br /> First String Set: ";
  var secondDiagram = "<br /> Second String Set: ";
  var thirdDiagram = "<br /> Third String Set: ";
  var chordArrayEmbed = document.getElementById("chordArrayPrint");

  printChordArrays.innerHTML =
    chordArrayText +
    firstDiagram +
    chordDiagram.join(" / ") +
    secondDiagram +
    chordDiagram2.join(" / ") +
    thirdDiagram +
    chordDiagram3.join(" / ");
}

//error firstDiagram not defined, are functions self-contained?
function generateDiagram() {
  console.log(chordDiagram);

  var initialSettings = {
    title: "Chord Name",
    color: "#000000",
    strings: 6,
    frets: fretboardLength,
    position: 1,
    nutSize: 0.65,
    strokeWidth: 2,
    style: "normal",
  };
  var initialChord = {
    // array of [string, fret | 'x' | 0]
    fingers: [
      chordDiagram[0],
      chordDiagram[1],
      chordDiagram[2],
      chordDiagram[3],
    ],
    // optional: barres for barre chords
    barres: [
      //{ fromString: 5, toString: 1, fret: 1 },
    ],
  };


  // initialize chart
  var chart = new svguitar.SVGuitarChord("#result")
    .configure(initialSettings)
    .chord(initialChord)
    .draw();
}
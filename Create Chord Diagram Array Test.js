//import { SVGuitarChord } from "svguitar";

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
      //valueList.innerHTML = text + listArray.join(" / ");
      console.log(this.value);
    } else {
      console.log("you unchecked the check box");
      //removing value from array if unchecked
      listArray = listArray.filter((e) => e !== this.value);
      //valueList.innerHTML = text + listArray.join(" / ");
    }
  });
}

function calculateFrets() {
  listArray = listArray.map(function (item) {
    return parseInt(item, 10);
  });

  listArray.sort(function (a, b) {
    return a - b;
  });

  listArray = listArray.map(function (interval) {
    return interval + 12;
  });

  for (let i = 0; i < listArray.length; i++) {
    listArray[i] -= i * 5;
  }

  //let firstFret = listArray[0] - 0; // 0 7 9 12
  //let secondFret = listArray[1] - 5;
  //let thirdFret = listArray[2] - 10;
  //let fourthFret = listArray[3] - 15;

  //Looping to find lowest and highest fret, used to move voicing to nut of the fretboard + decide total fretboard length on diagram.
  lowestFret = listArray[0];
  highestFret = listArray[0];

  //Calculate highest and lowest frets
  for (i = 0; i <= 3; i++) {
    lowestFret = Math.min(lowestFret, listArray[i]);
    highestFret = Math.max(highestFret, listArray[i]);
    //if (allFrets[i] < lowestFret) lowestFret = allFrets[i];
    //if (allFrets[i] > highestFret) highestFret = allFrets[i];
  }
  console.log("The lowest fret is: " + lowestFret);
  console.log("The highest fret is: " + highestFret);

  //Subtract variable used to make the chord voicing start at the lowest possible fret.
  let subtract = lowestFret - 1;
  console.log("All frets must be subtracted by " + subtract);

  fretboardLength = highestFret - lowestFret + 1;
  console.log("Fretboard length must be " + fretboardLength + " frets long.");

  chordDiagram = [
    [6, listArray[0] - subtract],
    [5, listArray[1] - subtract],
    [4, listArray[2] - subtract],
    [3, listArray[3] - subtract],
  ];

  /* let chordDiagram2 = [
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
  ]; */

  console.log(chordDiagram);
  //console.log(chordDiagram2);
  //console.log(chordDiagram3);

  var chordArrayText = "<span> Your chord array results : </span>";
  var firstDiagram = "<br /> First String Set: ";
  var secondDiagram = "<br /> Second String Set: ";
  var thirdDiagram = "<br /> Third String Set: ";
  var chordArrayEmbed = document.getElementById("chordArrayPrint");

  printChordArrays.innerHTML =
    chordArrayText + firstDiagram + chordDiagram.join(" / "); /*+
    secondDiagram +
    chordDiagram2.join(" / ") +
    thirdDiagram +
    chordDiagram3.join(" / ");*/
}

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

function reset() {
  listArray.splice(0, listArray.length);
  console.log(listArray);
}

//Retrieves checkbox inputs and adds them to 'listArray'

var list = document.getElementById("valueList");
var text = "<span> your selected intervals : </span>";

var listArray = [];
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
// Note: intervalArray[0], Interval name: intervalArray[0,1]
// selectedIntervals = [intervalArray[0],intervalarray[2],]

function calculateFrets() {
  console.log("This is the list array" + listArray);
  console.log("First Array number is" + listArray[0]);
  const firstInterval = parseInt(listArray[0], 10);
  const secondInterval = parseInt(listArray[1], 10);
  const thirdInterval = parseInt(listArray[2], 10);
  const fourthInterval = parseInt(listArray[3], 10);
  let parsedIntervals = [
    firstInterval,
    secondInterval,
    thirdInterval,
    fourthInterval,
  ];
  console.log("These are the parsed intervals" + parsedIntervals);

  //test interval array of maj9 chord
  const selectedIntervals = [
    parsedIntervals[0],
    parsedIntervals[1],
    parsedIntervals[2],
    parsedIntervals[3],
  ];
  console.log(selectedIntervals);

  //Array for number of voices
  let voices = selectedIntervals.length;
  console.log(voices);

  //Moving Notes up 12 frets to avoid working with negative numbers
  let firstNote = selectedIntervals[0] + 12;
  let secondNote = selectedIntervals[1] + 12;
  let thirdNote = selectedIntervals[2] + 12;
  let fourthNote = selectedIntervals[3] + 12;

  let allNotes = [firstNote, secondNote, thirdNote, fourthNote];
  console.log(allNotes);

  //Final fret numbers with string change subtractions.
  let firstFret = firstNote;
  let secondFret = firstFret + (secondNote - firstNote - 5);
  let thirdFret = secondFret + (thirdNote - secondNote - 5);
  let fourthFret = thirdFret + (fourthNote - thirdNote - 5);

  let allFrets = [firstFret, secondFret, thirdFret, fourthFret];

  //Looping to find lowest and highest fret, used to move voicing to nut of the fretboard + decide total fretboard length on diagram.
  lowestFret = allFrets[0];
  highestFret = allFrets[0];

  for (i = 0; i <= 3; i++) {
    if (allFrets[i] < lowestFret) lowestFret = allFrets[i];
    if (allFrets[i] > highestFret) highestFret = allFrets[i];
  }

  console.log(allFrets);
  console.log("The lowest fret is: " + lowestFret);
  console.log("The highest fret is: " + highestFret);

  //Subtract variable used to make the chord voicing start at the lowest possible fret.
  let subtract = --lowestFret;
  console.log("All frets must be subtracted by " + subtract);

  fretboardLength = highestFret - lowestFret;
  console.log("Fretboard length must be " + fretboardLength + " frets long.");

  let chordDiagram = [
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
}

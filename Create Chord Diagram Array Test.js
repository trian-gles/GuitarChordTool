//Retrieves checkbox inputs and adds them to 'listArray'
var list
var list = document.getElementById('valueList');
var text ='<span> your selected intervals : </span>';

var listArray = [];

var checkboxes = document.querySelectorAll('.checkbox');
console.log(checkboxes);

for(var checkbox of checkboxes) {
    checkbox.addEventListener('click',function(){
        if(this.checked == true) {
                listArray.push(this.value);
                valueList.innerHTML = text + listArray.join(' / ');
            console.log(this.value);
        }   else {
            console.log('you unchecked the check box')
            //removing value from array if unchecked
            listArray = listArray.filter(e => e !== this.value);
            valueList.innerHTML = text + listArray.join(' / ');
        }
    })
}
//TODO: need to order intervals in ascending order, regardless of order checked


//Need to make easy way to input intervals by name and convert them to selected intervals array
//let intervalsList = [root,m2,M2,m3,M3,P4,tt,P5,m6,M6,m7,M7,P8,m9,M9];
var root = 0;
var m2 = 1;
var M2 = 2;
var m3 = 3;
var M3 = 4;
var P4 = 5;
var tt = 6;
var P5 = 7;
var m6 = 8;
var M6 = 9;
var m7 = 10;
var M7 = 11;
var P8 = 12;
var m9 = 13;
var M9 = 14;

const intervalArray = [
    ['root'],
    ['b2'],
    ['2'],
    ['b3'],
    ['3'],
    ['4'],
    ['b5'],
    ['5'],
    ['b6'],
    ['6'],
    ['b7'],
    ['7']

];
// Note: intervalArray[0], Interval name: intervalArray[0,1]
// selectedIntervals = [intervalArray[0],intervalarray[2],]

//test interval array of maj9 chord
const selectedIntervals = [listArray[0],listArray[1],listArray[2],listArray[2]];
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
console.log(allNotes)

//Final fret numbers with string change subtractions.
let firstFret = firstNote;
let secondFret = (firstFret + (secondNote - firstNote - 5));
let thirdFret = (secondFret + (thirdNote - secondNote - 5));
let fourthFret = (thirdFret + (fourthNote - thirdNote - 5));
//let fifthFret = fifthNote - fourthNote + 7;

let allFrets = [firstFret, secondFret, thirdFret, fourthFret];

//Looping to find lowest and highest fret, used to move voicing to nut of the fretboard + decide total fretboard length on diagram.
lowestFret = allFrets[0];
highestFret = allFrets[0];

for (i = 0; i <= 3; i++) {
    if (allFrets[i] < lowestFret) lowestFret = allFrets[i];
    if (allFrets[i] > highestFret) highestFret = allFrets[i];
}

console.log(allFrets);
console.log("The lowest fret is: " + lowestFret)
console.log("The highest fret is: " + highestFret)


//Subtract variable used to make the chord voicing start at the lowest possible fret.
let subtract = --lowestFret;
console.log("All frets must be subtracted by " + subtract)
//Fretboard length 
fretboardLength = highestFret - lowestFret;
console.log("Fretboard length must be " + fretboardLength + " frets long.");

//Final Chord diagram array
//set 1
let chordDiagram = [
    [1, firstFret - subtract],
    [2, secondFret - subtract],
    [3, thirdFret - subtract],
    [4, fourthFret - subtract]
];
//set 2
let chordDiagram2 = [
    [2, firstFret - subtract],
    [3, secondFret - subtract],
    [4, thirdFret - subtract],
    [5, ++fourthFret - subtract]
];
//set 3
let chordDiagram3 = [
    [3, firstFret - subtract],
    [4, secondFret - subtract],
    [5, ++thirdFret - subtract],
    [6, ++fourthFret - subtract]
];

//need to make automated way of creating string sets, i++? on string number?

//print Chord Diagrams
console.log(chordDiagram);
console.log(chordDiagram2);
console.log(chordDiagram3);


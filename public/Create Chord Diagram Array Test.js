
//Need to make easy way to input intervals by name and convert them to selected intervals array
//let intervalsList = [root,m2,M2,m3,M3,P4,tt,P5,m6,M6,m7,M7,P8,m9,M9];
let selectedIntervals = [0,7,11,14];
//test interval array of maj9 chord

console.log(selectedIntervals);

let firstNote = selectedIntervals[0] + 12;
let secondNote = selectedIntervals[1] + 12;
let thirdNote = selectedIntervals[2] + 12;
let fourthNote = selectedIntervals[3] + 12;

let allNotes = [firstNote,secondNote,thirdNote,fourthNote];
console.log(allNotes)

let firstFret = firstNote;
let secondFret = (firstFret + (secondNote - firstNote - 5));
let thirdFret = (secondFret + (thirdNote - secondNote - 5));
let fourthFret = (thirdFret + (fourthNote - thirdNote - 5));
//let fifthFret = fifthNote - fourthNote + 7;

let allFrets = [firstFret,secondFret,thirdFret,fourthFret];
    

    lowestFret = allFrets[0];
    highestFret = allFrets[0];

    for(i = 0; i<=3; i++){
        if (allFrets[i] < lowestFret) lowestFret = allFrets[i];
        if (allFrets[i] > highestFret) highestFret = allFrets[i];
    }

console.log(allFrets);
console.log("The lowest fret is: " + lowestFret)
console.log("The highest fret is: " + highestFret)


//In order to make the chord voicing start at the lowest possible fret.
let subtract = --lowestFret;
console.log("All frets must be subtracted by " + subtract)

fretboardLength = highestFret - lowestFret;
console.log("Fretboard length must be " + fretboardLength + " frets long.");

//chord diagram array
let chordDiagram = [
    [1,firstFret - subtract],
    [2,secondFret - subtract],
    [3,thirdFret - subtract],
    [4,fourthFret - subtract]
];

//need to create multiple string sets

//why doesn't the text print?
console.log(chordDiagram);


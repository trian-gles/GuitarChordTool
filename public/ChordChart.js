(function () {
    let intervalsList = [root,m2,M2,m3,M3,P4,tt,P5,m6,M6,m7,M7,P8,m9,M9];
    let selectedIntervals = [0,7,11,14];

    let firstNote = selectedIntervals[0] + 12;
    let secondNote = selectedIntervals[1] + 12;
    let thirdNote = selectedIntervals[2] + 12;
    let fourthNote = selectedIntervals[3] + 12;

    let firstFret = firstNote;
    let secondFret = secondNote - firstNote - 5;
    let thirdFret = thirdNote - secondNote - 5;
    let fourthFret = fourthNote - thirdNote - 5;
    let fifthFret = fifthNote - fourthNote - 5;

    let allFrets = [firstFret,secondFret,thirdFret,fourthFret,fifthFret];

    console.log(allFrets)
    
    var initialSettings = {
        title: 'F# minor',
        color: '#000000',
        strings: 6,
        frets: 4,
        position: 1,
        nutSize: 0.65,
        strokeWidth: 2,
        style: 'normal',
    }
    var initialChord = {
        // array of [string, fret | 'x' | 0]
        fingers: [
            [1, ],
            [2, ],
            [3, ],
            [4, ],
            [5, ]
        ],

        // optional: barres for barre chords
        barres: [
            //{ fromString: 5, toString: 1, fret: 1 },
        ],
    }

    $('#chord-input').val(JSON.stringify(initialChord, null, 2))

    Object.keys(initialSettings)
        .forEach(function (name) {
            $('#chart-config-form [name=' + name + ']').val(initialSettings[name])
        })

    // initialize chart
    var chart = new svguitar
        .SVGuitarChord('#result')
        .configure(initialSettings)
        .chord(initialChord)

    function drawChord(chord, settings) {
        console.log('Drawing chord ', chord, ' with settings', settings)

        try {
            chart
                .configure(settings)
                .chord(chord)
                .draw()
        } catch (err) {
            alert('Failed to create chart: ' + err.message);

            throw err;
        }
    }

    $('#chart-config-form,#chord-form').submit(function (e) {
        e.preventDefault();

        var settings = $('#chart-config-form')
            .serializeArray()
            .reduce(function (acc, cur) {
                acc[cur.name] = isNaN(cur.value) ? cur.value : Number(cur.value);

                return acc;
            }, {})

        // get the chord
        try {
            var chord = JSON.parse($('#chord-input').val())
        } catch (err) {
            alert('Failed to parse the chord. Are you sure you entered valid JSON?');

            return;
        }

        drawChord(chord, settings);
    })
    console.log("Drawing chord");
    drawChord(initialChord, initialSettings);
})();
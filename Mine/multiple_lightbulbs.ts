#!/usr/bin/env checkio --domain=js run multiple-lightbulbs

// In the 4th mission of the series more light bulbs are added.
// 
// You still must determine how long the room will be lit during the observation period between start_watching and end_watching. But now we have more than one light bulb. This means that in the light bulb switching array can now also be passed the number of the light bulb, the button of which is being pressed.
// 
// Each element of the button clicking array can be either a datetime object (which means the time when the first button was pressed) or a tuple of 2 elements (where the first elements is a datetime object, the time the button was pressed), and the second is the number of the light bulb, the button of which is being pressed.
// 
// If the passed array will only consist of datetime elements, then we have only one light bulb and the function should work the same way as in the previous mission of the series.
// 
// Input:Three arguments and only the first one is required. The first one is an array of Date objects (instead of Date object there can be an array of two Date and number), the second and the third ones are the Date objects.
// 
// Output:A number of seconds as an integer.
// 
// Precondition:
// 
// The array of pressing the button is always sorted in ascending order.The array of pressing the button has no repeated elements.The minimum possible date is 1970-01-01The maximum possible date is 9999-12-31
// END_DESC

import assert from "assert";

function sumLight(els: Array<Date | [Date, number]>, startWatching?: Date, endWatching?: Date): number {
    let total = 0
    let startWatch = 0
    let endWatch = els[els.length - 1].getTime()
    if (startWatching) {
        startWatch = startWatching.getTime()
    }
    if (endWatching) {
        endWatch = endWatching.getTime()
    }
    for (let i = 0; i < els.length; i = i + 2) {
        let start = els[i].getTime()
        let end = els[els.length - 1].getTime()
        if (i < els.length - 1) {
            end = els[i + 1].getTime()
        } else {
            end = endWatch
        }
        if (startWatch > start) {
            start = startWatch
        }
        if (startWatch > end) {
            end = startWatch
        }
        if (endWatch < end) {
            end = endWatch
        }
        if (endWatch < start) {
            end = start
        }
        total += end - start
        console.log('start', start, 'end', end, 'total', total / 1000)
    }
    return total / 1000;
}

console.log("Example:");
console.log(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ])
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ]),
    60
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 11, 0, 0), 2],
        [new Date(2015, 1, 12, 11, 1, 0), 2],
    ]),
    70
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ]),
    30
);

assert.equal(
    sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ]),
    40
);

assert.equal(
    sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 3],
        [new Date(2015, 1, 12, 10, 1, 20), 3],
    ]),
    60
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 50)
    ),
    10
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 30)
    ),
    20
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20)
    ),
    30
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 10)
    ),
    30
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 50)
    ),
    0
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 30)
    ),
    20
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20)
    ),
    30
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
            [new Date(2015, 1, 12, 10, 1, 20), 2],
            [new Date(2015, 1, 12, 10, 1, 40), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20)
    ),
    50
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 30),
        new Date(2015, 1, 12, 10, 1, 0)
    ),
    30
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20),
        new Date(2015, 1, 12, 10, 1, 0)
    ),
    40
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 30)
    ),
    30
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 1, 0)
    ),
    40
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10)
    ),
    0
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 20)
    ),
    10
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 20)
    ),
    10
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 30)
    ),
    20
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 11, 0, 0, 0), 3],
            new Date(2015, 1, 12, 0, 0, 0),
            [new Date(2015, 1, 13, 0, 0, 0), 3],
            [new Date(2015, 1, 13, 0, 0, 0), 2],
            new Date(2015, 1, 14, 0, 0, 0),
            [new Date(2015, 1, 15, 0, 0, 0), 2],
        ],
        new Date(2015, 1, 10, 0, 0, 0),
        new Date(2015, 1, 16, 0, 0, 0)
    ),
    345600
);

console.log(
    "The forth mission in series is completed? Click 'Check' to earn cool rewards!"
);
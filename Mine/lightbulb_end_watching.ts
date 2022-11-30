#!/usr/bin/env checkio --domain=js run lightbulb-end-watching

// In the third mission from the series about lightbulbs, I want to separately highlight the process and the period of observation of this process.
// 
// In the previous mission, the start_watching parameter was introduced, and in this one - the end_watching parameter, which tells the time when it’s necessary to end the observation. If it’s not passed, the mission works as in the previous version, with no observation time limit.
// 
// One more update is that the amount of elements (button clicks) can be odd (previously there was a precondition, that the amount of elements is always even). In this case the parameters of start and end watching are necessarily present.
// 
// Input:Three arguments and only the first one is required. The first one is an array of Date objects, the second and the third ones are the Date objects.
// 
// Output:A number of seconds as an integer.
// 
// Precondition:
// 
// The array of pressing the button is always sorted in ascending order.The array of pressing the button has no repeated elements.The minimum possible date is 1970-01-01The maximum possible date is 9999-12-31
// END_DESC

import assert from "assert";

function sumLight(els: Date[], startWatching?: Date, endWatching?: Date): number {
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
        let end =  els[els.length - 1].getTime()
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
        console.log('start',start, 'end', end,'total', total / 1000)
    }
    return total / 1000;
}

console.log("Example:");
console.log(
    // sumLight(
    //     [
    //         new Date(2015, 1, 12, 10, 0, 0),
    //         new Date(2015, 1, 12, 10, 10, 10),
    //         new Date(2015, 1, 12, 11, 0, 0),
    //         new Date(2015, 1, 12, 11, 10, 10),
    //     ],
    //     new Date(2015, 1, 12, 9, 50, 0),
    //     new Date(2015, 1, 12, 10, 0, 10)
    // ),
    // sumLight(
    //     [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
    //     new Date(2015, 1, 12, 10, 0, 0),
    //     new Date(2015, 1, 12, 10, 0, 10)
    // )
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 10, 10),
            new Date(2015, 1, 12, 11, 0, 0),
            new Date(2015, 1, 12, 11, 10, 10)
        ]
    )
    // <-0
    // !!1220
);

if (false) {
    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 10)
        ),
        10
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 7)
        ),
        7
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 3),
            new Date(2015, 1, 12, 10, 0, 10)
        ),
        7
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 10),
            new Date(2015, 1, 12, 10, 0, 20)
        ),
        0
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 10, 30, 0),
            new Date(2015, 1, 12, 11, 0, 0)
        ),
        0
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 10, 10, 0),
            new Date(2015, 1, 12, 11, 0, 0)
        ),
        10
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 10, 10, 0),
            new Date(2015, 1, 12, 11, 0, 10)
        ),
        20
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 9, 50, 0),
            new Date(2015, 1, 12, 10, 0, 10)
        ),
        10
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 9, 0, 0),
            new Date(2015, 1, 12, 10, 5, 0)
        ),
        300
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 11, 5, 0),
            new Date(2015, 1, 12, 12, 0, 0)
        ),
        310
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
            ],
            new Date(2015, 1, 12, 11, 5, 0),
            new Date(2015, 1, 12, 11, 10, 0)
        ),
        300
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
            ],
            new Date(2015, 1, 12, 10, 10, 0),
            new Date(2015, 1, 12, 11, 0, 10)
        ),
        20
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
            ],
            new Date(2015, 1, 12, 9, 10, 0),
            new Date(2015, 1, 12, 10, 20, 20)
        ),
        610
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0)],
            new Date(2015, 1, 12, 9, 10, 0),
            new Date(2015, 1, 12, 10, 20, 20)
        ),
        1220
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0)],
            new Date(2015, 1, 12, 9, 9, 0),
            new Date(2015, 1, 12, 10, 0, 0)
        ),
        0
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0)],
            new Date(2015, 1, 12, 9, 9, 0),
            new Date(2015, 1, 12, 10, 0, 10)
        ),
        10
    );

    console.log(
        "The third mission in series is completed? Click 'Check' to earn cool rewards!"
    );
}
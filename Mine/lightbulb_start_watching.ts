#!/usr/bin/env checkio --domain=js run lightbulb-start-watching

import assert from "assert";

function sumLight(els: Date[], startWatching?: Date): number {
    let total = 0
    let startWatch = 0
    if (startWatching) {
        startWatch = startWatching.getTime()
        // console.log('startwatch', startWatch)
    }
    for (let i = 0; i < els.length; i = i + 2) {
        let start = els[i].getTime()
        let end = els[i + 1].getTime()
        // console.log(start, startWatch)
        if (startWatch > start) {
            start = startWatch
        }
        if (startWatch > end) {
            end = startWatch
        }
        // console.log(start, end)
        total += end - start
        // console.log(total / 1000)
    }
    return total / 1000;
}

console.log(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 10, 10),
            new Date(2015, 1, 12, 11, 0, 0),
            new Date(2015, 1, 12, 11, 10, 10),
        ],
        new Date(2015, 1, 12, 11, 0, 0)
    )
)
// 610

if (true) {
    console.log("Example:");
    console.log(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 11, 0, 0))
    );
    // sumLight(
    //     [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
    //     new Date(2015, 1, 12, 10, 0, 5)
    // )

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 5)
        ),
        5
    );

    assert.equal(
        sumLight(
            [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
            new Date(2015, 1, 12, 10, 0, 0)
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
            new Date(2015, 1, 12, 11, 0, 0)
        ),
        610
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 11, 0, 10)
        ),
        600
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
            ],
            new Date(2015, 1, 12, 10, 10, 0)
        ),
        620
    );

    assert.equal(
        sumLight(
            [
                new Date(2015, 1, 12, 10, 0, 0),
                new Date(2015, 1, 12, 10, 10, 10),
                new Date(2015, 1, 12, 11, 0, 0),
                new Date(2015, 1, 12, 11, 10, 10),
                new Date(2015, 1, 12, 11, 10, 10),
                new Date(2015, 1, 12, 12, 10, 10),
            ],
            new Date(2015, 1, 12, 12, 10, 10)
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
                new Date(2015, 1, 12, 11, 10, 10),
                new Date(2015, 1, 12, 12, 10, 10),
            ],
            new Date(2015, 1, 12, 12, 9, 10)
        ),
        60
    );

    console.log(
        "The second mission in series is done? Click 'Check' to earn cool rewards!"
    )
}
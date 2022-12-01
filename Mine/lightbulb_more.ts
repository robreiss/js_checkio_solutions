#!/usr/bin/env checkio --domain=js run lightbulb-more

// The complication in the 6th mission of the series is that now there might be needed more than one light bulb to illuminate a room. And this is the 5th argument of the function - how many light bulbs are needed to illuminate the room.
// 
// For example, if you need 3 bulbs to illuminate a room, then we don’t count the time when there were only 2 bulbs or only one. If the last argument of the function is not passed, then one light bulb is enough to illuminate the room.
// 
// The task is still the same - to find out how long the room was lit (in this task, we can say - sufficiently lit).
// 
// Input:Five arguments and only the first one is required.     The first one(els)is an array of Date objects (instead of Date object there can be an array of two Date and number), the second(start_watching)and the third ones(end_watching)are the Date objects or undefined. The forth argument(operating)- integer - how long the lamp can work. The 5th argument is a positive non-zero int.
// 
// Output:A number of seconds as an integer.
// 
// Precondition:
// 
// The array of pressing the button is always sorted in ascending order.The array of pressing the button has no repeated elements.The minimum possible date is 1970-01-01The maximum possible date is 9999-12-31req arguments is positive and non-zero
// END_DESC

const util = require('util');
import assert from "assert";

function getSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000)
}

function fixDates(
    elms: Array<[Date, number]>,
    operating: number,
    endWatching: Date,
    startWatching: Date
): Array<[Date, number]> {
    // sort the element group by date
    elms = elms.sort((a, b) => { return a[0].getTime() - b[0].getTime() })

    elms = elms.map((value) => {
        if (value[0].getTime() > endWatching.getTime()) {
            value[0] = endWatching
        }
        if (value[0].getTime() < startWatching.getTime()) {
            value[0] = startWatching
        }
        return value
    })
    if (elms.length % 2 === 1) {
        let entry: [Date, number] = [new Date(endWatching), elms[0][1]]
        elms.push(entry)
    }

    let result: Array<[Date, number]> = []
    let isOn = false
    let startDate: Date = new Date()
    let sumTime = 0

    for (let i = 0; i < elms.length; i++) {
        let [lightDate, lightNum] = elms[i]
        if (!isOn) {
            isOn = true
            startDate = lightDate
            result.push(elms[i])
        } else {
            isOn = false

            let opLeft = operating - sumTime
            opLeft = opLeft < 0 ? 0 : opLeft

            let onTime = lightDate.getTime() - startDate.getTime()
            onTime = opLeft < onTime ? opLeft : onTime

            let entry: [Date, number] = [new Date(startDate.getTime() + onTime), lightNum]
            result.push(entry)

            sumTime += onTime
        }
    }
    return result
}

function groupBy<T>(list: Array<T>, keyGetter: (e: T) => number | string): Map<number | string, Array<T>> {
    const map = new Map();
    for (let item of list) {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    }
    return map;
}

const MinDate = new Date(1970, 0, 1)
const MaxDate = new Date(9999, 11, 31)

function sumLight(
    els: Array<Date | [Date, number]>,
    startWatching?: Date,
    endWatching?: Date,
    operating?: number,
    req?: number
): number {

    // normalize inputs
    startWatching = startWatching ?? MinDate
    endWatching = endWatching ?? MaxDate
    operating = (operating ?? Infinity) * 1000
    req = req ?? 1

    let elsf: Array<[Date, number]> = els.map((v: Date | [Date, number]) => {
        if (util.isDate(v)) {
            return <[Date, number]>[v, 0]
        } else {
            return <[Date, number]>v
        }
    })

    let m = groupBy(elsf, (e) => { return e[1] })
    let result: Array<[Date, number]> = []
    for (let n of m) {
        let x = fixDates(n[1], operating, endWatching, startWatching)
        result = result.concat(x)
    }

    result = result.sort((a, b) => { return a[0].getTime() - b[0].getTime() })

    return sumMultiLight(result)
}

function sumMultiLight(els: Array<[Date, number]>): number {
    let m: Map<number, number> = new Map<number, number>()
    let total = 0
    let onTime = 0

    for (let i = 0; i < els.length; i++) {
        let [lightTime, lightNum] = [els[i][0].getTime()/1000, els[i][1]]

        if (m.has(lightNum)) {
            // change change the size check to be m.size < x
            if (m.size === 1) {
                total += lightTime - onTime
            }
            m.delete(lightNum)
        } else {
            // change change the size check to be m.size > x
            if (m.size === 0) {
                onTime = lightTime
            }
            m.set(lightNum, 0)
        }
    }
    return total 
}

console.log("Example:");
console.log(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 50), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        undefined,
        undefined,
        undefined,
        3
    )
);

if (false) {
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

assert.equal(
    sumLight(
        [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
        undefined,
        undefined,
        100
    ),
    10
);

assert.equal(
    sumLight(
        [new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)],
        undefined,
        undefined,
        5
    ),
    5
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        undefined,
        undefined,
        100
    ),
    60
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 30),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        undefined,
        undefined,
        100
    ),
    60
);

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            new Date(2015, 1, 12, 10, 0, 30),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        undefined,
        undefined,
        20
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
            [new Date(2015, 1, 12, 10, 1, 0), 3],
            [new Date(2015, 1, 12, 10, 1, 20), 3],
        ],
        undefined,
        undefined,
        10
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
        new Date(2015, 1, 12, 10, 0, 20),
        undefined,
        100
    ),
    50
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
        new Date(2015, 1, 12, 10, 0, 20),
        undefined,
        10
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
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 30),
        20
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
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 30),
        10
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
        ],
        new Date(2015, 1, 12, 10, 0, 10),
        new Date(2015, 1, 12, 10, 0, 30),
        5
    ),
    10
);

// NEXT

assert.equal(
    sumLight(
        [
            new Date(2015, 1, 12, 10, 0, 0),
            [new Date(2015, 1, 12, 10, 0, 0), 2],
            new Date(2015, 1, 12, 10, 0, 10),
            [new Date(2015, 1, 12, 10, 1, 0), 2],
        ],
        undefined,
        undefined,
        undefined,
        1
    ),
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
        undefined,
        undefined,
        undefined,
        2
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
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        undefined,
        undefined,
        undefined,
        1
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
        undefined,
        undefined,
        undefined,
        2
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
        undefined,
        undefined,
        undefined,
        3
    ),
    0
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            [new Date(2015, 1, 12, 10, 0, 50), 3],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        undefined,
        undefined,
        undefined,
        3
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
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 1, 0),
        undefined,
        2
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
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 1, 0),
        15,
        2
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
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
            [new Date(2015, 1, 12, 10, 1, 20), 2],
            [new Date(2015, 1, 12, 10, 1, 40), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20),
        undefined,
        100,
        2
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
            [new Date(2015, 1, 12, 10, 1, 20), 2],
            [new Date(2015, 1, 12, 10, 1, 40), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20),
        undefined,
        100,
        3
    ),
    0
);

assert.equal(
    sumLight(
        [
            [new Date(2015, 1, 12, 10, 0, 0), 4],
            [new Date(2015, 1, 12, 10, 0, 10), 3],
            new Date(2015, 1, 12, 10, 0, 20),
            [new Date(2015, 1, 12, 10, 0, 30), 3],
            [new Date(2015, 1, 12, 10, 0, 30), 2],
            new Date(2015, 1, 12, 10, 0, 40),
            [new Date(2015, 1, 12, 10, 0, 50), 2],
            [new Date(2015, 1, 12, 10, 1, 20), 2],
            [new Date(2015, 1, 12, 10, 1, 40), 2],
        ],
        new Date(2015, 1, 12, 10, 0, 20),
        undefined,
        100,
        3
    ),
    20
);

console.log(
    "The forth mission in series is completed? Click 'Check' to earn cool rewards!"
);
}
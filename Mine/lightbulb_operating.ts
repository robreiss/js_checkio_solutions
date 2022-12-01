#!/usr/bin/env checkio --domain=js run lightbulb-operating

// Since you are here, it means that you’ve already solved 4 missions of the series. Your function can already adopt more than one light bulb in the date array to determine if the room is lit or not. And with the second and third elements the period we want to observe can be defined.
// 
// In the 5th mission, a fourth argument is added - the operating time of the light bulbs. By analogy with the previous missions - if it’s not passed, then the bulb works indefinitely.
// 
// The operating time argument is passed as a timedelta object. It shows how long the light bulb can work when it’s on. It has no cooling, which means that if our bulb can work for only one hour, then it can work for 30 minutes now and 30 minutes next year. After that it will turn itself off and will no longer respond to the button.
// 
// We still need to calculate how long the room has been lit.
// 
// Input:Four arguments and only the first one is required. The first one(els)is an array of Date objects (instead of Date object there can be an array of two Date and number), the second(start_watching)and the third ones(end_watching)is the Date objects or undefined. The forth argument(operating)- integer - how long the lamp can work.
// 
// Output:A number of seconds as an integer.
// 
// Precondition:
// 
// The array of pressing the button is always sorted in ascending order.The array of pressing the button has no repeated elements.The minimum possible date is 1970-01-01The maximum possible date is 9999-12-31
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
    operating?: number): number {

    // normalize inputs
    startWatching = startWatching ?? MinDate
    endWatching = endWatching ?? MaxDate
    operating = (operating ?? Infinity) * 1000

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

console.log("Example:");
console.log(sumLight([
    [new Date(2015, 1, 12, 10, 0, 10), 3],
    new Date(2015, 1, 12, 10, 0, 20),
    [new Date(2015, 1, 12, 10, 0, 15), 3],
    [new Date(2015, 1, 12, 10, 0, 30), 2],
    new Date(2015, 1, 12, 10, 0, 40),
    [new Date(2015, 1, 12, 10, 0, 50), 2],
    [new Date(2015, 1, 12, 10, 1, 0), 3],
    [new Date(2015, 1, 12, 10, 0, 17), 3],
    [new Date(2015, 1, 12, 10, 4, 17), 3],
], undefined, undefined, 10));

function sumMultiLight(els: Array<[Date, number]>): number {
    let m: Map<number, number> = new Map<number, number>()
    let total = 0
    let onTime = 0

    for (let i = 0; i < els.length; i++) {
        let [lightTime, lightNum] = [els[i][0].getTime()/1000, els[i][1]]

        if (m.has(lightNum)) {
            if (m.size === 1) {
                total += lightTime - onTime
            }
            m.delete(lightNum)
        } else {
            if (m.size === 0) {
                onTime = lightTime
            }
            m.set(lightNum, 0)
        }
    }
    return total 
}

if (true) {
    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ]), 60);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 11, 0, 0), 2],
        [new Date(2015, 1, 12, 11, 1, 0), 2],
    ]), 70);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ]), 30);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ]), 40);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 3],
        [new Date(2015, 1, 12, 10, 1, 20), 3],
    ]), 60);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], new Date(2015, 1, 12, 10, 0, 50)), 10);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 30)), 20);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 20)), 30);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 10)), 30);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 50)), 0);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 30)), 20);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 20)), 30);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 20), 2],
        [new Date(2015, 1, 12, 10, 1, 40), 2],
    ], new Date(2015, 1, 12, 10, 0, 20)), 50);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], new Date(2015, 1, 12, 10, 0, 30), new Date(2015, 1, 12, 10, 1, 0)), 30);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], new Date(2015, 1, 12, 10, 0, 20), new Date(2015, 1, 12, 10, 1, 0)), 40);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
    ], new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 30)), 30);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 1, 0)), 40);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 0), new Date(2015, 1, 12, 10, 0, 10)), 0);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 20)), 10);


    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 20)), 10);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 30)), 20);

    assert.equal(sumLight([
        [new Date(2015, 1, 11, 0, 0, 0), 3],
        new Date(2015, 1, 12, 0, 0, 0),
        [new Date(2015, 1, 13, 0, 0, 0), 3],
        [new Date(2015, 1, 13, 0, 0, 0), 2],
        new Date(2015, 1, 14, 0, 0, 0),
        [new Date(2015, 1, 15, 0, 0, 0), 2],
    ], new Date(2015, 1, 10, 0, 0, 0), new Date(2015, 1, 16, 0, 0, 0)), 345600);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
    ], undefined, undefined, 100), 10);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
    ], undefined, undefined, 5), 5);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 10),
        [new Date(2015, 1, 12, 10, 0, 0), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], undefined, undefined, 100), 60);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 30),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], undefined, undefined, 100), 60);

    assert.equal(sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 30),
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 2],
    ], undefined, undefined, 20), 40);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 0), 3],
        [new Date(2015, 1, 12, 10, 1, 20), 3],
    ], undefined, undefined, 10), 30);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 20), 2],
        [new Date(2015, 1, 12, 10, 1, 40), 2],
    ], new Date(2015, 1, 12, 10, 0, 20), undefined, 100), 50);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
        new Date(2015, 1, 12, 10, 0, 40),
        [new Date(2015, 1, 12, 10, 0, 50), 2],
        [new Date(2015, 1, 12, 10, 1, 20), 2],
        [new Date(2015, 1, 12, 10, 1, 40), 2],
    ], new Date(2015, 1, 12, 10, 0, 20), undefined, 10), 20);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 30),
        20), 20);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 30),
        10), 20);

    assert.equal(sumLight([
        [new Date(2015, 1, 12, 10, 0, 10), 3],
        new Date(2015, 1, 12, 10, 0, 20),
        [new Date(2015, 1, 12, 10, 0, 30), 3],
        [new Date(2015, 1, 12, 10, 0, 30), 2],
    ], new Date(2015, 1, 12, 10, 0, 10), new Date(2015, 1, 12, 10, 0, 30),
        5), 10);

    console.log("The forth mission in series is completed? Click 'Check' to earn cool rewards!")
}
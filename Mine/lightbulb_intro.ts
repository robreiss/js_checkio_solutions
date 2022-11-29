#!/usr/bin/env checkio --domain=js run lightbulb-intro

// With this mission I want to start a series of missions with light bulbs. They will help you understand the concept of processes and evaluation of the processes’ performance. Instead of light bulbs, in real life, there may be equipment, the effectiveness of which must be calculated, or workers who go to work, and their wages must be calculated.
// 
// The first mission is quite simple. There is a light bulb, which by default is off, and a button, by pressing which the light bulb switches its state. This means that if the light bulb is off and the button is pressed, the light turns on, and if you press it again, it turns off.
// 
// The function input is an array of datetime objects - this is the date and time of pressing the button. Your task is to determine how long the light bulb has been turned on.
// 
// Input:An array of Date objects
// 
// Output:A number of seconds as an integer.
// 
// Precondition:
// 
// The array of pressing the button is always sorted in ascending orderThe array of pressing the button has no repeated elements (which means the result should always be bigger than 0)The amount of elements is always even (the light will eventually be off)The minimum possible date is 1970-01-01The maximum possible date is 9999-12-31
// END_DESC

import assert from "assert";

function sumLight(els: Date[]): number {
    // how long the light bulb has been turned on

    // your code here
    return 0;
}

console.log("Example:");
console.log(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 10, 10),
        new Date(2015, 1, 12, 11, 0, 0),
        new Date(2015, 1, 12, 11, 10, 10),
    ])
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 10, 10),
        new Date(2015, 1, 12, 11, 0, 0),
        new Date(2015, 1, 12, 11, 10, 10),
    ]),
    1220
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 10, 10),
    ]),
    610
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 10, 10),
        new Date(2015, 1, 12, 11, 0, 0),
        new Date(2015, 1, 12, 11, 10, 10),
        new Date(2015, 1, 12, 11, 10, 10),
        new Date(2015, 1, 12, 12, 10, 10),
    ]),
    4820
);

assert.equal(
    sumLight([
        new Date(2015, 1, 12, 10, 0, 0),
        new Date(2015, 1, 12, 10, 0, 1),
    ]),
    1
);

console.log(
    "The first mission in series is completed? Click 'Check' to earn cool rewards!"
);
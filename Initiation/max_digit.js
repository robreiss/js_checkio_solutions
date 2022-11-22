#!/usr/bin/env checkio --domain=js run max-digit

// You have a number and you need to determine which digit in this number is the biggest.
// 
// Input:A positive number.
// 
// Output:A number (0-9).
// 
// 
// END_DESC

import assert from "assert";

function maxDigit(value: number): number {
    var arr = value.toString().split("")
    var max : number = 0;
    for (const elem of arr) {
        if (Number(elem) > max) {
            max = Number(elem)
        }
    }
    return max;
}

function maxDigitOld(value: number): number {
    var i = 0;
    var s = value.toString();
    var len = s.length;
    var max : number = 0;
    while (i < len) {
        if (Number(s[i]) > max) {
            max = Number(s[i])
        }
        i++;
    }
    return max;
}

console.log('Example:');
console.log(maxDigit(0));

// These "asserts" are used for self-checking
assert.equal(maxDigit(0), 0);
assert.equal(maxDigit(52), 5);
assert.equal(maxDigit(634), 6);
assert.equal(maxDigit(1), 1);
assert.equal(maxDigit(10000), 1);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
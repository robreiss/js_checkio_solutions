#!/usr/bin/env checkio --domain=js run number-length

// You have a non-negative number. Try to find out how many digits it has.
// 
// Input:A non-negative number.
// 
// Output:A number.
// 
// 
// END_DESC

import assert from "assert";

function numberLength(value: number): number {
    return value.toString().length;
}

console.log('Example:');
console.log(numberLength(10));

// These "asserts" are used for self-checking
assert.equal(numberLength(10), 2);
assert.equal(numberLength(0), 1);
assert.equal(numberLength(4), 1);
assert.equal(numberLength(44), 2);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
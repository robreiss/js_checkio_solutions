#!/usr/bin/env checkio --domain=js run is-even

// Check if the given number is even or not. Your function should returntrueif the number is even, andfalseif the number is odd.
// 
// Input:A number.
// 
// Output:Boolean.
// 
// Precondition:given int should be between -1000 and 1000
// 
// 
// END_DESC

import assert from "assert";

function isEven(num: number): boolean {
    return num % 2 == 0;
}

console.log('Example:');
console.log(isEven(2));

// These "asserts" are used for self-checking
assert.equal(isEven(2), true);
assert.equal(isEven(5), false);
assert.equal(isEven(0), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
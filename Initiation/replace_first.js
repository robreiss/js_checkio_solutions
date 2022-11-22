#!/usr/bin/env checkio --domain=js run replace-first

// In a given array the first element should become the last one. An empty array or array with only one element should stay the same.
// 
// 
// 
// Input:Array.
// 
// Output:Array.
// 
// 
// END_DESC

import assert from "assert";

function replaceFirst(values: number[]): number[] {
    var x = values.shift();
    if (x == undefined) {
        return values;
    }
    values.push(x)
    return values;
}

console.log('Example:');
console.log(replaceFirst([1, 2, 3, 4]));

// These "asserts" are used for self-checking
assert.deepEqual(replaceFirst([1, 2, 3, 4]), [2, 3, 4, 1]);
assert.deepEqual(replaceFirst([1]), [1]);
assert.deepEqual(replaceFirst([]), []);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
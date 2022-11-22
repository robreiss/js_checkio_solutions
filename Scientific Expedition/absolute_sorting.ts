#!/usr/bin/env checkio --domain=js run absolute-sorting

// Let's try some sorting. Here is an array with the specific rules.
// 
// The array        has various numbers. You should sort it, but sort it by absolute value in ascending order.    For example, the sequence (-20, -5, 10, 15) will be sorted like so: (-5, 10, 15, -20).    Your function should return the sorted list .
// 
// Precondition:The numbers in the array are unique by their absolute values.
// 
// Input:An array of numbers .
// 
// Output:The list or tuple (but not a generator) sorted by absolute values in ascending order.
// 
// Addition:The results of your function will be shown as a list in the tests explanation panel.
// 
// Precondition:    len(set(abs(x) for x in array)) == len(array)
// 0 < len(array) < 100
// all(isinstance(x, int) for x in array)
// all(-100 < x < 100 for x in array)
// 
// 
// 
// END_DESC

import assert from "assert";

function absoluteSorting(values: number[]): number[] {
    // your code here
    return values;
}

console.log("Example:");
console.log(JSON.stringify(absoluteSorting([-20, -5, 10, 15])));

// These "asserts" are used for self-checking
assert.deepStrictEqual(absoluteSorting([-20, -5, 10, 15]), [-5, 10, 15, -20]);
assert.deepStrictEqual(absoluteSorting([1, 2, 3, 0]), [0, 1, 2, 3]);
assert.deepStrictEqual(absoluteSorting([-1, -2, -3, 0]), [0, -1, -2, -3]);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
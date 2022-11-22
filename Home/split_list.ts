#!/usr/bin/env checkio --domain=js run split-list

// You have to split a given array into two arrays. If it has an odd amount of elements, then the first array should have more elements. If it has no elements, then two empty arrays should be returned.
// 
// 
// 
// Input:List.
// 
// Output:List of two lists.
// 
// 
// END_DESC

import assert from "assert";

function splitList(values: number[]):number[][] {
    let len = values.length;
    let half = Math.ceil(len / 2);
    return [values.slice(0, half), values.slice(half)];
}

console.log('Example:');
console.log(splitList([1, 2, 3, 4, 5, 6]));

// These "asserts" are used for self-checking
assert.deepEqual(splitList([1, 2, 3, 4, 5, 6]), [[1, 2, 3], [4, 5, 6]]);
assert.deepEqual(splitList([1, 2, 3]), [[1, 2], [3]]);
assert.deepEqual(splitList([1, 2, 3, 4, 5]), [[1, 2, 3], [4, 5]]);
assert.deepEqual(splitList([1]), [[1], []]);
assert.deepEqual(splitList([]), [[], []]);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
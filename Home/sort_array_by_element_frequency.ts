#!/usr/bin/env checkio --domain=js run sort-array-by-element-frequency

// Sort the given Array so that its elements end up in the decreasing frequency order, that is, the number of times they appear in elements. If two elements have the same frequency, they should end up in the same order as the first appearance in the Array.
// 
// Input:Array
// 
// Output:Array
// 
// Precondition:elements can be ints or strings
// 
// The mission was taken from Python CCPS 109 Fall 2018. It's being taught for Ryerson Chang School of Continuing Education byIlkka Kokkarinen
// 
// 
// END_DESC

import assert from "assert";

function frequencySort(items: any[]): any[] {
    let map = new Map();
    for (let item of items) {
        map.set(item, (map.get(item) || 0) + 1);
    }
    let mapSorted = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    // console.log(mapSorted);
    var i = 0
    var ans = new Array();
    for (let [key, value] of mapSorted) {
        for (let j = 0; j < value; j++) {
            ans[i] = key;
            i++;
        }
    }
    return ans;
}

console.log('Example:');
console.log(frequencySort([4, 6, 2, 2, 6, 4, 4, 4]));
console.log(frequencySort([4, 6, 2, 2, 2, 6, 4, 4, 4])); 
// These "asserts" are used for self-checking and not for an auto-testing
assert.deepEqual(frequencySort([4, 6, 2, 2, 6, 4, 4, 4]), [4, 4, 4, 4, 6, 6, 2, 2]);
assert.deepEqual(frequencySort(['bob', 'bob', 'carl', 'alex', 'bob']), ['bob', 'bob', 'bob', 'carl', 'alex']);
assert.deepEqual(frequencySort([17, 99, 42]), [17, 99, 42]);
assert.deepEqual(frequencySort([]), []);
assert.deepEqual(frequencySort([1]), [1]);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
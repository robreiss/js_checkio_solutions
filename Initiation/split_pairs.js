#!/usr/bin/env checkio --domain=js run split-pairs

// Split the string into pairs of two characters. If the string contains an odd number of characters, then the missing second character of the final pair should be replaced with an underscore ('_').
// 
// Input:A string.
// 
// Output:An array of strings.
// 
// Precondition:0 <= len(text) <= 100
// 
// 
// END_DESC

import assert from "assert";

function splitPairs(text: string): string[] {
    var ans : string[] = [];
    var nextPair = "";
    const len = text.length;
    var i = 0;
    while (i < len) {
        nextPair = nextPair + text[i];
        // console.log(nextPair);
        if (nextPair.length == 2) {
            ans.push(nextPair);
            nextPair = "";
        }
        i++;
    }
    if (nextPair.length == 1) {
        nextPair = nextPair + "_";
        ans.push(nextPair);
    }
    return ans;
}

console.log('Example:');
console.log(splitPairs('abcd'));

// These "asserts" are used for self-checking
assert.deepEqual(splitPairs('abcd'), ['ab', 'cd']);
assert.deepEqual(splitPairs('abc'), ['ab', 'c_']);
assert.deepEqual(splitPairs('abcdf'), ['ab', 'cd', 'f_']);
assert.deepEqual(splitPairs('a'), ['a_']);
assert.deepEqual(splitPairs(''), []);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
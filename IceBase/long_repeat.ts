#!/usr/bin/env checkio --domain=js run long-repeat

// This mission is the first one of the series. Here you should find the length of the longest substring that consists of the same letter. For example, line "aaabbcaaaa" contains four substrings with the same letters "aaa", "bb","c" and "aaaa". The last substring is the longest one, which makes it the answer.
// 
// Input:A string.Output:An int.
// 
// 
// 
// 
// 
// 
// END_DESC

import assert from "assert";

function longRepeat(line: string): number {
    // your code here
    return 0;
}

console.log("Example:");
console.log(longRepeat("sdsffffse"));

// These "asserts" are used for self-checking
assert.strictEqual(longRepeat("sdsffffse"), 4);
assert.strictEqual(longRepeat("ddvvrwwwrggg"), 3);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
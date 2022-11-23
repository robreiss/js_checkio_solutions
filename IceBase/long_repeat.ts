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

const debug = true
function cl(out: string) {
    if (debug) {
        console.log(out)
    }
}

function longRepeat(line: string): number {
    // cl('NEW ' + line)
    if (line.length == 0) 
        return 0
    let longest = 1
    let testlen = 1 
    let c = ''
    for (let i=0; i<line.length; i++) {
        // console.log(line[i])
        if (line[i] == c) {
            // console.log('match', c)
            testlen++
            if (testlen > longest) {
                longest = testlen
            }
        } else {
            c = line[i]
            // console.log(`${c} - ${testlen}`)
            testlen = 1
        }
    }
    return longest;
}

console.log("Example:");
// console.log(longRepeat("sdsffffse"));
// console.log(longRepeat("ddvvrwwwrggg"));
// console.log(longRepeat("aa"))
console.log(longRepeat("abababa"))

// These "asserts" are used for self-checking
assert.strictEqual(longRepeat("sdsffffse"), 4);
assert.strictEqual(longRepeat("ddvvrwwwrggg"), 3);
assert.strictEqual(longRepeat("aa"), 2)

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
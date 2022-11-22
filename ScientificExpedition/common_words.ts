#!/usr/bin/env checkio --domain=js run common-words

// Let's continue examining words. You are given two string with words separated by commas.    Try to find what is common between these strings. The words are not repeated in the same string.
// 
// Your function should find all of the words that appear in both strings.    The result must be represented as a string of words separated by commas inalphabetic order.
// 
// Input:Two arguments as strings.
// 
// Output:The common words as a string.
// 
// Precondition:
// Each string contains no more than 10 words.
// All words separated by commas.
// All words consist of lowercase latin letters.
// 
// 
// END_DESC

import assert from "assert";

function commonWords(line1: string, line2: string): string {
    // your code here
    return '';
}

console.log('Example:');
console.log(commonWords('hello,world', 'hello,earth'));

// These "asserts" are used for self-checking
assert.equal(commonWords('hello,world', 'hello,earth'), 'hello');
assert.equal(commonWords('one,two,three', 'four,five,six'), '');
assert.equal(commonWords('one,two,three',
 'four,five,one,two,six,three'), 'one,three,two');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
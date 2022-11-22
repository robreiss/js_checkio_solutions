#!/usr/bin/env checkio --domain=js run backward-each-word

// In a given string you should reverse every word, but the words should stay in their places.
// 
// Input:A string.
// 
// Output:A string.
// 
// Precondition:The line consists only from alphabetical symbols and spaces.
// 
// 
// END_DESC

import assert from "assert";

function backwardStringByWord(text: string): string {
    return text.replace(/\b(\w+)\b/g, (match, word) => {
        return word.split('').reverse().join('');
    });
}

console.log('Example:');
console.log(backwardStringByWord(''));

// These "asserts" are used for self-checking
assert.equal(backwardStringByWord(''), '');
assert.equal(backwardStringByWord('world'), 'dlrow');
assert.equal(backwardStringByWord('hello world'), 'olleh dlrow');
assert.equal(backwardStringByWord('hello   world'), 'olleh   dlrow');
assert.equal(backwardStringByWord('welcome to a game'), 'emoclew ot a emag');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
#!/usr/bin/env checkio --domain=js run words-order

// You have a text and a list of words. You need to check if the words in a list
// appear in the same order as in the given text.
// 
// Cases you should expect while solving this challenge:
// 
// a word from the list is not in the text - your function should return
// False;
// any word can appear more than once in a text - use only the first
// one;
// two words in the given list are the same - your function should return
// False;
// the condition is case sensitive, which means 'hi' and 'Hi' are two
// different words;
// the text includes only English letters and spaces.
// 
// Input:Two arguments. The first one is a given text, the second is a list of words.
// 
// Output:A bool.
// 
// 
// END_DESC

import assert from "assert";

function wordsOrder(text: string, words: string[]): boolean {
    let currentIndex = -2
    for (let word of words) {
        let re = new RegExp(`\\b${word}\\b`);
        let nextIndex = text.search(re)
        if (nextIndex == -1) {
            return false
        }
        if (nextIndex <= currentIndex) {
            return false;
        }
        currentIndex = nextIndex
    }
    return true;
}

console.log("Example:");
console.log(wordsOrder("hi world im here", ["world", "here"]));
console.log(wordsOrder("hi world im here", ["here", "world"]));

// These "asserts" are used for self-checking
assert.strictEqual(wordsOrder("hi world im here", ["world", "here"]), true);
assert.strictEqual(wordsOrder("hi world im here", ["here", "world"]), false);
assert.strictEqual(wordsOrder("hi world im here", ["world"]), true);
assert.strictEqual(
    wordsOrder("hi world im here", ["world", "here", "hi"]),
    false
);
assert.strictEqual(
    wordsOrder("hi world im here", ["world", "im", "here"]),
    true
);
assert.strictEqual(
    wordsOrder("hi world im here", ["world", "hi", "here"]),
    false
);
assert.strictEqual(wordsOrder("hi world im here", ["world", "world"]), false);
assert.strictEqual(wordsOrder("hi world im here", ["country", "world"]), false);
assert.strictEqual(wordsOrder("hi world im here", ["wo", "rld"]), false);
assert.strictEqual(wordsOrder("", ["world", "here"]), false);
assert.strictEqual(
    wordsOrder("hi world world im here", ["world", "world"]),
    false
);
assert.strictEqual(
    wordsOrder("hi world world im here hi world world im here", [
        "world",
        "here",
    ]),
    true
);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
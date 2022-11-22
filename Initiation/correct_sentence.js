#!/usr/bin/env checkio --domain=js run correct-sentence

// For the input of your function, you will be given one sentence. You have to return a corrected version, that starts with a capital letter and ends with a period (dot).
// 
// Pay attention to the fact that not all of the fixes are necessary. If a sentence already ends with a period (dot), then adding another one will be a mistake.
// 
// Input:A string.
// 
// Output:A string.
// 
// Precondition:No leading and trailing spaces, text contains only spaces, a-z A-Z , and ".".
// 
// 
// END_DESC

import assert from "assert";

function correctSentence(text: string): string {
    text = text[0].toUpperCase() + text.slice(1);
    if (text[text.length - 1] != ".") {
        text += ".";
    }
    return text;
}

console.log('Example:');
console.log(correctSentence('greetings, friends'));

// These "asserts" are used for self-checking
assert.equal(correctSentence('greetings, friends'), 'Greetings, friends.');
assert.equal(correctSentence('Greetings, friends'), 'Greetings, friends.');
assert.equal(correctSentence('Greetings, friends.'), 'Greetings, friends.');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
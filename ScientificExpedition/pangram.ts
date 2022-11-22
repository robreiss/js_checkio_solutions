#!/usr/bin/env checkio --domain=js run pangram

// A pangram (Greek:παν γράμμα, pan gramma, "every letter") or holoalphabetic sentence for a given alphabet is a    sentence using every letter of the alphabet at least once. Perhaps you are familiar with the well known pangram "The    quick brown fox jumps over the lazy dog".
// 
// For this mission, we will use the latin alphabet (A-Z). You are given a text with latin letters and punctuation    symbols. You need to check if the sentence is a pangram or not. Case does not matter.
// 
// Input:A text as a string.
// 
// Output:Whether the sentence is a pangram or not as a boolean.
// 
// Precondition:
// 
// All ASCII English Letter(a-z,A-Z) and punctuations such as:!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~
// END_DESC

import assert from "assert";

function checkPangram(text: string): boolean {
    // your code here
    return false;
}

console.log('Example:');
console.log(checkPangram(('The quick brown fox jumps over the '
 + 'lazy dog.')));

// These "asserts" are used for self-checking
assert.equal(checkPangram(('The quick brown fox jumps over the '
 + 'lazy dog.')), true);
assert.equal(checkPangram('ABCDEF'), false);
assert.equal(checkPangram('abcdefghijklmnopqrstuvwxyz'), true);
assert.equal(checkPangram('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), true);
assert.equal(checkPangram('abcdefghijklmnopqrstuvwxy'), false);
assert.equal(checkPangram(('Bored? Craving a pub quiz fix? Why, '
 + 'just come to the Royal Oak!')), true);
assert.equal(checkPangram(("As quirky joke, chefs won't pay "
 + 'devil magic zebra tax.')), true);
assert.equal(checkPangram(('Six big devils from Japan quickly '
 + 'forgot how to walt.')), false);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
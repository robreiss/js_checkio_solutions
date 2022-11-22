#!/usr/bin/env checkio --domain=js run verify-anagrams

// An anagram is a type of word play,    the result of rearranging the letters of a word or phrase to produce a new word or phrase,    using all the original letters exactly once.    Two words are anagrams to each other if we can get one from another by rearranging the letters.    Anagrams are case-insensitive and don't take account whitespaces.    For example: "Gram Ring Mop" and "Programming" are anagrams. But "Hello" and "Ole Oh" are not.
// 
// You are given two words or phrase. Try to verify are they anagrams or not.
// 
// Input:Two arguments as strings.
// 
// Output:Are they anagrams or not as boolean (True or False)
// 
// Precondition:0<|first_word|<100;
// 0<|second_word|<100;
// Words contain only ASCII latin letters and whitespaces.
// 
// 
// END_DESC

import assert from "assert";

function verifyAnagrams(line1: string, line2: string): boolean {
    // your code here
    return false;
}

console.log('Example:');
console.log(verifyAnagrams('Programming', 'Gram Ring Mop'));

// These "asserts" are used for self-checking
assert.equal(verifyAnagrams('Programming', 'Gram Ring Mop'), true);
assert.equal(verifyAnagrams('Hello', 'Ole Oh'), false);
assert.equal(verifyAnagrams('Kyoto', 'Tokyo'), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
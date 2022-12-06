#!/usr/bin/env checkio --domain=js run striped-words

// Our robots are always working to improve their linguistic skills.    For this mission, they research the Latin alphabet and its applications.
// 
// The alphabet contains both vowel and consonant letters (yes, we divide the letters).
// Vowels --A E I O U Y
// Consonants --B C D F G H J K L M N P Q R S T V W X Z
// 
// You are given a block of text with different words.     These words are separated by whitespaces and punctuation marks.    Numbers are not considered as words in this mission (a mix of letters and digits is not a word either).    You should count the number of words (striped words) where the vowels with consonants are alternating;     words that you count cannot have two consecutive vowels or consonants.    The words consisting of a single letter are not striped -- don't count those. Casing is not significant for this mission.
// 
// Input:A text as a string (unicode)
// 
// Output:A quantity of striped words as an integer.
// 
// Precondition:The text contains only ASCII symbols.
// 0 < len(text) < 105
// 
// 
// END_DESC

import assert from "assert";

function stripedWords(line: string): number {
    let re = /((?<=\b)([BCDFGHJKLMNPQRSTVWXZ][aeiouy])+[BCDFGHJKLMNPQRSTVWXZ]?(?=\b))|((?<=\b)([aeiouy][BCDFGHJKLMNPQRSTVWXZ])+[aeiouy]?(?=\b))/gi
    // let m = re.Mat(line)
    let m = line.matchAll(re)
    let c = [...m]
    // console.log(c)
    return c.length;
}

console.log('Example:');
console.log(stripedWords('My name is ...'));

// These "asserts" are used for self-checking
assert.equal(stripedWords('My name is ...'), 3);
assert.equal(stripedWords('Hello world'), 0);
assert.equal(stripedWords('A quantity of striped words.'), 1);
assert.equal(stripedWords('Dog,cat,mouse,bird.Human.'), 3);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
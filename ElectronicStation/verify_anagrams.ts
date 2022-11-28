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

// function swap(a: string, i: number, j: number): string {
//     let temp: string;
//     let charArray = a.split("");
//     temp = charArray[i];
//     charArray[i] = charArray[j];
//     charArray[j] = temp;
//     return (charArray).join("");
// }

// function permute(str: string, l: number, r: number, check: string) {
//     if (l == r && str === check) {
//         // console.log("true", str);
//         return true
//     }
//     else {
//         for (let i = l; i <= r; i++) {
//             str = swap(str, l, i);
//             if (permute(str, l + 1, r, check)) {
//                 return true
//             }
//             str = swap(str, l, i);
//         }
//     }
//     return false
// }

function verifyAnagrams(line1: string, line2: string): boolean {
    line1 = line1.replace(/\s/g, '').toLowerCase().split('').sort().join('')
    line2 = line2.replace(/\s/g, '').toLowerCase().split('').sort().join('')
    if (line1 === line2) {
        return true
    }
    // return permute(line1, 0, line1.length - 1, line2)
    return false
}

console.log('Example:');
// console.log(verifyAnagrams('Programming', 'Gram Ring Mop'));
// console.log(verifyAnagrams('Kyoto', 'Tokyo'))

// These "asserts" are used for self-checking
// assert.equal(verifyAnagrams('Programming', 'Gram Ring Mop'), true)
// assert.equal(verifyAnagrams('Hello', 'Ole Oh'), false);
// assert.equal(verifyAnagrams('Kyoto', 'Tokyo'), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");

// 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU'
// 'UTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba'
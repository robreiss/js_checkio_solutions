#!/usr/bin/env checkio --domain=js run the-most-wanted-letter

// You are given a text, which contains different English letters and punctuation symbols.    You should find the most frequent letter in the text. The letter returned must be in lower case.
// While checking for the most wanted letter, casing does not matter, so for the purpose of your search,    "A" == "a".    Make sure you do not count punctuation symbols, digits and whitespaces, only letters.
// 
// If you havetwo or more letters with the same frequency,    then return the letter which comes first in the Latin alphabet.    For example -- "one" contains "o", "n", "e" only once for each, thus we choose "e".
// 
// Input:A text for analysis as a string.
// 
// Output:The most frequent letter in lower case as a string.
// 
// Precondition:
// A text contains only ASCII symbols.
// 0 < len(text) ≤ 105
// 
// 
// END_DESC

import assert from "assert";

function mostWanted(text: string): string {
    let m: Map<string, number> = new Map()
    text = text.toLowerCase().replace(/[^a-z]/g, '')
    for (let i = 0; i< text.length; i++) {
        let l = text[i]
        m.set(l, (m.get(l) || 0) + 1)
    }
    let x = [...m].sort((a, b) => {
        if (a[1] > b[1]) {
            return -1
        }
        if (a[1] < b[1]) {
            return 1
        }
        return a[0].charCodeAt(0) - b[0].charCodeAt(0)
    })

    // console.log(x)
    // text = text.split('').sort().join('')
    // console.log(text)
    return x[0][0];
}

console.log("Example:");
console.log(mostWanted("Hello World!"));

// These "asserts" are used for self-checking
assert.strictEqual(mostWanted("Hello World!"), "l");
assert.strictEqual(mostWanted("How do you do?"), "o");
assert.strictEqual(mostWanted("One"), "e");
assert.strictEqual(mostWanted("Oops!"), "o");
assert.strictEqual(mostWanted("AAaooo!!!!"), "a");
assert.strictEqual(mostWanted("abe"), "a");

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
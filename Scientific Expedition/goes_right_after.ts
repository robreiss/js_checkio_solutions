#!/usr/bin/env checkio --domain=js run goes-right-after

// In a given word you need to check if one symbol goes only right after another.
// 
// Cases you should expect while solving this challenge:
// 
// If more than one symbol is in the list you should always count the first oneOne of the symbols are not in the given word - your function should return False;Any symbol appears in a word more than once - use only the first one;Two symbols are the same - your function should return False;The condition is case sensitive, which means 'a' and 'A' are two different symbols.Input:Three arguments. The first one is a given string, second is a symbol that should go first, and the third is a symbol that should go after the first one.
// 
// Output:A bool.
// 
// 
// END_DESC

import assert from "assert";

function goesAfter(word: string, first: string, second: string): boolean {
    // your code here
    return false;
}

console.log("Example:");
console.log(goesAfter("world", "w", "o"));

// These "asserts" are used for self-checking
assert.strictEqual(goesAfter("world", "w", "o"), true);
assert.strictEqual(goesAfter("world", "w", "r"), false);
assert.strictEqual(goesAfter("world", "l", "o"), false);
assert.strictEqual(goesAfter("panorama", "a", "n"), true);
assert.strictEqual(goesAfter("list", "l", "o"), false);
assert.strictEqual(goesAfter("", "l", "o"), false);
assert.strictEqual(goesAfter("list", "l", "l"), false);
assert.strictEqual(goesAfter("world", "d", "w"), false);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
#!/usr/bin/env checkio --domain=js run backward-string

// You should return a given string in reverse order.
// 
// Input:A string.
// 
// Output:A string.
// 
// 
// END_DESC

import assert from "assert";

function backwardString(value: string): string {
    return value.split("").reverse().join("");
}

console.log('Example:');
console.log(backwardString('val'));
console.log(backwardString('back one'));

// These "asserts" are used for self-checking
assert.equal(backwardString('val'), 'lav');
assert.equal(backwardString(''), '');
assert.equal(backwardString('ohho'), 'ohho');
assert.equal(backwardString('123456789'), '987654321');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
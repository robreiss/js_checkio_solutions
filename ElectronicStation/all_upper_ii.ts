#!/usr/bin/env checkio --domain=js run all-upper-ii

// Check if a given string has all symbols in upper case. If the string is empty
// or doesn't have any letter in it - function should return False.
// 
// Input:A string.
// 
// Output:a boolean.
// 
// Precondition:a-z, A-Z, 1-9 and spaces
// 
// 
// END_DESC

import assert from "assert";

function isAllUpper(text: string): boolean {
    text = text.replace(/[^a-zA-Z]/g, "");
    if ( text.length === 0 ) {
        return false;
    }
    if ( text === text.toUpperCase() ) {
        return true;
    }
    return false;
}

console.log('Example:');
console.log(isAllUpper('ALL UPPER'));
console.log(isAllUpper('0123'));

// These "asserts" are used for self-checking
assert.equal(isAllUpper('ALL UPPER'), true);
assert.equal(isAllUpper('all lower'), false);
assert.equal(isAllUpper('mixed UPPER and lower'), false);
assert.equal(isAllUpper('0123'), false);
assert.equal(isAllUpper(''), false);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
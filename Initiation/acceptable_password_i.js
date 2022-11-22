#!/usr/bin/env checkio --domain=js run acceptable-password-i

// You are at the beginning of a password series. Every mission is based on the previous one. The missions that follow will become slightly more complex.
// 
// In this mission, you need to create a password verification function.
// 
// The verification condition is:
// 
// the length should be bigger than 6.Input:A string.
// 
// Output:A bool.
// 
// 
// END_DESC

import assert from "assert";

function isAcceptablePassword(password: string): boolean {
    return password.length > 6;
}

console.log('Example:');
console.log(isAcceptablePassword('short'));

// These "asserts" are used for self-checking
assert.equal(isAcceptablePassword('short'), false);
assert.equal(isAcceptablePassword('muchlonger'), true);
assert.equal(isAcceptablePassword('ashort'), false);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
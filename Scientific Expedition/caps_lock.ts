#!/usr/bin/env checkio --domain=js run caps-lock

// Joe Palooka has fat fingers, so he always hits the “Caps Lock” key whenever he actually intends to hit the key  “a” by itself. (When Joe tries to type in some accented version of “a” that needs more keystrokes to conjure the accents, he is more careful in the presence of such raffinated characters ([Shift] + [Char]) and will press the keys correctly.) Compute and return the result of having Joe type in the given text. The “Caps Lock” key affects only the letter keys from “a” to “z” , and has no effect on the other keys or characters. “Caps Lock” key is assumed to be initially off.
// 
// For Joe's keyboard, Caps Lock is always uppercase a letter. That means if Caps Lock is on, and Joe does Shift + b - he gets 'B' (in upper case) printed.
// 
// Input:A string. The typed text.
// 
// Output:A string. The showed text after being typed.
// 
// The mission was taken from Python CCPS 109 Fall 2018. It is taught for Ryerson Chang School of Continuing Education byIlkka Kokkarinen
// 
// 
// END_DESC

import assert from "assert";

function capsLock(text: string): string {
    // your code here
    return text;
}

console.log("Example:");
console.log(capsLock("Why are you asking me that?"));

// These "asserts" are used for self-checking
assert.equal(
    capsLock("Why are you asking me that?"),
    "Why RE YOU sking me thT?"
);
assert.equal(
    capsLock("Always wanted to visit Zambia."),
    "AlwYS Wnted to visit ZMBI."
);
assert.equal(capsLock("Aloha from Hawaii"), "Aloh FROM HwII");

console.log("Coding complete? Click 'Check' to earn cool rewards!");
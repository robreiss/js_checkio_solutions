#!/usr/bin/env checkio --domain=js run fizz-buzz

// "Fizz buzz" is a word game we will use to teach the robots about division. Let's learn computers.
// 
// You should write a function that will receive a positive integer and return:
// "Fizz Buzz"if the number is divisible by 3 and by 5;
// "Fizz"if the number is divisible by 3;
// "Buzz"if the number is divisible by 5;
// The numberas a string for other cases.
// 
// 
// Input:A number as an integer.
// 
// Output:The answer as a string.
// 
// Precondition:0 < number ≤ 1000
// 
// 
// END_DESC

import assert from "assert";

function fizzBuzz(a: number): string {
    if (a % 3 === 0 && a % 5 === 0) {
        return "Fizz Buzz"
    }
    if (a % 3 === 0) {
        return "Fizz"
    }
    if (a % 5 === 0) {
        return "Buzz"
    }
    return a.toString();
}

console.log("Example:");
console.log(fizzBuzz(15));

// These "asserts" are used for self-checking
assert.strictEqual(fizzBuzz(15), "Fizz Buzz");
assert.strictEqual(fizzBuzz(6), "Fizz");
assert.strictEqual(fizzBuzz(10), "Buzz");
assert.strictEqual(fizzBuzz(7), "7");

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
#!/usr/bin/env checkio --domain=js run multiply-intro

// This is an intro mission, the purpose of which is to explain how to solve missions on CheckiO.
// 
// This mission is the easiest one. Write a function that will receive 2 numbers as input and it should return the multiplication of these 2 numbers.
// 
// Input:Two arguments. Both are of type int.
// 
// Output:Int.
// 
// Examples:
// 
// assert.equal(multTwo(3, 2), 6);
// assert.equal(multTwo(0, 1), 0);
// A series of hints below will help you to understand how to solve the mission. Start the series by clicking on "I don’t know how to solve that mission."
// 
// 
// END_DESC

import assert from "assert";

function multTwo(a: number, b: number): number {
    return a * b;
}

console.log("Example:");
console.log(multTwo(3, 2));

// These "asserts" are used for self-checking
assert.equal(multTwo(3, 2), 6);
assert.equal(multTwo(0, 1), 0);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
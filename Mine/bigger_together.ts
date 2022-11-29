#!/usr/bin/env checkio --domain=js run bigger-together

// Your mission here is to find a difference between the maximally positive and maximally negative numbers. Those numbers can be found by concatenating the given array of numbers.
// 
// Let’s check an example. If you have numbers 1,2,3, then 321 is the maximum number, and 123 - is the minimum. The difference between those numbers is 198. But if you have numbers 4, 3 and 12 then 4312 is the maximum number, and 1234 - is the minimum. As you can see, a simple order is not what we are looking for here.
// 
// Input:A list of positive integers.
// 
// Output:An integer.
// 
// Precondition:All elements of the list can't be less than 0
// The list can't be empty
// 
// 
// END_DESC

import assert from "assert";

function biggerTogether(a: number[]): number {
    // your code here
    return 0;
}

console.log('Example:');
console.log(biggerTogether([1, 2, 3, 4]));

// These "asserts" are used for self-checking
assert.equal(biggerTogether([1, 2, 3, 4]), 3087);
assert.equal(biggerTogether([1, 2, 3, 4, 11, 12]), 32099877);
assert.equal(biggerTogether([0, 1]), 9);
assert.equal(biggerTogether([100]), 0);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
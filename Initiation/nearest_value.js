#!/usr/bin/env checkio --domain=js run nearest-value

// Find the nearest value to the given one.
// 
// You are given an Array of numbers and a value for which you need to find the nearest one.
// 
// For example, we have the following sequence of numbers: 4, 7, 10, 11, 12, 17,    and we need to find the nearest value to the number 9. If we sort this sequence    in the ascending order, then to the left of number 9 will be number 7 and to    the right - will be number 10. But 10 is closer than 7, which means that the correct answer is 10.
// 
// A few clarifications:
// 
// If 2 numbers are at the same distance, you need to choose the smallest one;The sequence of numbers is always non-empty;The given value can be in this sequence, which means that it’s the answer;The sequence may contain both positive and negative numbers, but they are always integers;The sequence isn’t sorted and consists only unique numbers.Input:Two arguments: an Array of numbers and sought value as a number.
// 
// Output:A number.
// 
// 
// END_DESC

import assert from "assert";

function nearestValue(values: number[], search: number): number {
    let nearest = -1; 
    let ans = values[0]
    values.forEach((value) => {
        let a = Math.abs(value - search);
        if (nearest == -1 || a <= nearest) {
            if (a < nearest) {
                ans = value;
            } else if (value < ans) {
                ans = value;
            } 
            nearest = a;
        }
    });
    return ans;
}

console.log('Example:');
console.log(nearestValue([4, 7, 10, 11, 12, 17], 9));
console.log(nearestValue([0, -2], -1));

// These "asserts" are used for self-checking
assert.equal(nearestValue([4, 7, 10, 11, 12, 17], 9), 10);
assert.equal(nearestValue([4, 7, 10, 11, 12, 17], 8), 7);
assert.equal(nearestValue([4, 8, 10, 11, 12, 17], 9), 8);
assert.equal(nearestValue([4, 9, 10, 11, 12, 17], 9), 9);
assert.equal(nearestValue([4, 7, 10, 11, 12, 17], 0), 4);
assert.equal(nearestValue([4, 7, 10, 11, 12, 17], 100), 17);
assert.equal(nearestValue([5, 10, 8, 12, 89, 100], 7), 8);
assert.equal(nearestValue([-1, 2, 3], 0), -1);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
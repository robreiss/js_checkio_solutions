#!/usr/bin/env checkio --domain=js run non-unique-elements

// If you have 50 different plug types, appliances wouldn't be available and would be very        expensive. But once an electric outlet becomes standardized, many companies can design        appliances, and competition ensues, creating variety and better prices for consumers.
// -- Bill Gates
// 
// You are given a non-empty list of integers (X).    For this task, you should return a list consisting of only the non-unique elements in this list.    To do so you will need to remove all unique elements (elements which are contained in a given    list only once).    When solving this task, do not change the order of the list.    Example: [1, 2, 3, 1, 3] 1 and 3 non-unique elements and result will be [1, 3, 1, 3].
// 
// 
// 
// Input:A list of integers.
// 
// Output:An iterable of integers.
// 
// 
// How it is used:This mission will help you to understand how to manipulate arrays,    something that is the basis for solving more complex tasks.    The concept can be easily generalized for real world tasks.    For example: if you need to clarify statistics by removing low frequency elements (noise).
// 
// You can find out more about JavaScript arrays inone of our articles featuring lists, tuples, array.array and numpy.array.
// 
// Precondition:
// 0 < len(data) < 1000
// 
// 
// 
// END_DESC

import assert from "assert";

function nonUniqueElements(data: number[]): number[] {
    return data.filter((v, i, a) => { 
        return a.indexOf(v) !== a.lastIndexOf(v) 
    });
}

console.log('Example:')
console.log(nonUniqueElements([1, 2, 3, 1, 3]))
console.log(nonUniqueElements([10, 9, 10, 10, 9, 8]));

assert.deepEqual(nonUniqueElements([1, 2, 3, 1, 3]), [1, 3, 1, 3]);
assert.deepEqual(nonUniqueElements([1, 2, 3, 4, 5]), []);
assert.deepEqual(nonUniqueElements([5, 5, 5, 5, 5]), [5, 5, 5, 5, 5]);
assert.deepEqual(nonUniqueElements([10, 9, 10, 10, 9, 8]), [10, 9, 10, 10, 9]);
console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
#!/usr/bin/env checkio --domain=js run ascending-list

// Determine whether the sequence of elements items is  ascending so that its
// each element is  strictly larger   than (and not merely equal to) the element
// that precedes it.
// 
// Input:Iterable with ints.
// 
// Output:Bool.
// 
// The mission was taken from Python CCPS 109 Fall 2018. It is taught for
// Ryerson Chang School of Continuing Education byIlkka Kokkarinen
// 
// 
// END_DESC

import assert from "assert";

function isAscending(values: number[]): boolean {
    if (values.length < 2) {
        return true
    }
    let lastValue = values[0]
    for (let i = 1; i < values.length; i++) {
        let currentValue = values[i]
        if (currentValue <= lastValue) {
            return false
        }
        lastValue = currentValue
    }
    return true;
}

console.log('Example:');
console.log(isAscending([-5, 10, 99, 123456]));

// These "asserts" are used for self-checking
assert.equal(isAscending([-5, 10, 99, 123456]), true);
assert.equal(isAscending([99]), true);
assert.equal(isAscending([4, 5, 6, 7, 3, 7, 9]), false);
assert.equal(isAscending([]), true);
assert.equal(isAscending([1, 1, 1, 1]), false);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
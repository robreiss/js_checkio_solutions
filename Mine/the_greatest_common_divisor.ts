#!/usr/bin/env checkio --domain=js run the-greatest-common-divisor

// "[The Euclidean algorithm] is the granddaddy of all algorithms, because it is the oldest nontrivial algorithm        that has survived to the present day."
// -- Donald Knuth, The Art of Computer Programming, Vol. 2: Seminumerical Algorithms, 2nd edition (1981).
// 
// The greatest common divisor(GCD), also known as    the greatest common factor of two or more integers (at least one of which is not zero), is the largest positive    integer that divides a number without a remainder. For example, the GCD of 8 and 12 is 4.
// 
// You are given an arbitrary number of positive integers.    You should find the greatest common divisor for these numbers.
// 
// Input:An arbitrary number of positive integers.
// 
// Output:The greatest common divisor as an integer.
// 
// Precondition:
// 1 < len(args) ≤ 10
// all(0 < x ≤ 2 ** 32 for x in args)
// 
// 
// END_DESC

import assert from "assert";

function greatestCommonDivisor(...args: number[]): number {
    // your code here
    return 0;
}

console.log("Example:");
console.log(greatestCommonDivisor(6, 4));

// These "asserts" are used for self-checking
assert.equal(greatestCommonDivisor(6, 4), 2);
assert.equal(greatestCommonDivisor(2, 4, 8), 2);
assert.equal(greatestCommonDivisor(2, 3, 5, 7, 11), 1);
assert.equal(greatestCommonDivisor(3, 9, 3, 9), 3);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
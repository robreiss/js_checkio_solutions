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

// function permute(nums: number[]): number[][] {
//     let result: number[][] = [];
//     if (nums.length === 0) return [];
//     if (nums.length === 1) return [nums];
//     for (let i = 0; i < nums.length; i++) {
//         const currentNum = nums[i];
//         const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
//         const remainingNumsPermuted = permute(remainingNums);
//         for (let j = 0; j < remainingNumsPermuted.length; j++) {
//             const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
//             result.push(permutedArray);
//         }
//     }
//     return result;
// }

function compareSpecial(a: number, b: number): number {
    let astr = a.toString()
    let bstr = b.toString()
    return Number(bstr + astr) - Number(astr + bstr)
}

function biggerTogether(a: number[]): number {
    let bigArr = a.sort((a, b) => {
        return compareSpecial(a,b)
    })
    let bigNum = Number(bigArr.join(''))

    let smallArr = a.sort((a, b) => {
        return compareSpecial(b,a)
    })
    let smallNum = Number(smallArr.join(''))

    return bigNum - smallNum
}

console.log('Example:');
// console.log(biggerTogether([1, 2, 3, 4]));
// console.log(biggerTogether([1, 2, 3, 4, 11, 12]), 32099877)
// console.log(biggerTogether([1, 2, 3]), '321')
// console.log(biggerTogether([11, 2, 3]), '3211')
// console.log(biggerTogether([20, 1, 2, 3]), '31421')
// console.log(biggerTogether([14, 1, 6, 3]), '31614')
// console.log(biggerTogether([420, 42, 423]),381078)
console.log(biggerTogether([31, 3132]), 99)

// These "asserts" are used for self-checking
assert.equal(biggerTogether([1, 2, 3, 4]), 3087);
assert.equal(biggerTogether([1, 2, 3, 4, 11, 12]), 32099877);
assert.equal(biggerTogether([0, 1]), 9);
assert.equal(biggerTogether([100]), 0);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
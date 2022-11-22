#!/usr/bin/env checkio --domain=js run identify-block

// This mission uses a 4x4 grid. Each square is numbered from 1 to 16 in row-major order.
// You are given 4 numbers(a list of integers).These numbers represent the positions of each square on the grid and a whole block if all the squares are adjacent.
// 
// You have to identify the kind of block. (Refer to the following image or comment of initial code for the kind of block).
// The answer is an upper-case alphabet letter ('I', 'J', 'L', 'O', 'S', 'T' or 'Z'). If it’s not a block, then return null.
// 
// The block is placed anywhere on the grid and can be rotated (0, 90, 180 or 270 degrees).
// 
// 
// 
// Input:4 numbers (a list of integers)
// 
// Output:the kind of block (an alphabet letter or         null)
// 
// 
// END_DESC

import assert from "assert";

function identifyBlock(values: number[]): string | null {
    /*
    grid(4x4):
    +--+--+--+--+
    |1 |2 |3 |4 |
    +--+--+--+--+
    |5 |6 |7 |8 |
    +--+--+--+--+
    |9 |10|11|12|
    +--+--+--+--+
    |13|14|15|16|
    +--+--+--+--+

    blocks(7 kinds):
    'I'  'J'  'L'  'O'  'S'  'T'  'Z'

     *    *   *    **    **  ***  **
     *    *   *    **   **    *    **
     *   **   **
     *

    */
    return '';
}

console.log('Example:');
console.log(identifyBlock([10, 13, 14, 15]));

// These "asserts" are used for self-checking
assert.equal(identifyBlock([10, 13, 14, 15]), 'T');
assert.equal(identifyBlock([1, 5, 9, 6]), 'T');
assert.equal(identifyBlock([2, 3, 7, 11]), 'L');
assert.equal(identifyBlock([4, 8, 12, 16]), 'I');
assert.equal(identifyBlock([3, 1, 5, 8]), undefined);
assert.equal(identifyBlock([6, 7, 10, 11]), 'O');
assert.equal(identifyBlock([6, 10, 11, 15]), 'S');
assert.equal(identifyBlock([7, 6, 10, 14]), 'J');
assert.equal(identifyBlock([3, 6, 7, 10]), 'Z');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
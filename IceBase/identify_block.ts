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
    values = values.sort((a, b) => { return a - b })
    let a: [string, number[]][] = [
        ['I', [1, 2, 3, 4]],
        ['I', [1, 5, 9, 13]],
        ['J', [2, 6, 9, 10]],
        ['J', [1, 5, 6, 7]],
        ['J', [1, 2, 5, 9]],
        ['J', [1, 2, 3, 7]],
        ['L', [1, 5, 9, 10]],
        ['L', [1, 2, 3, 5]],
        ['L', [1, 2, 6, 10]],
        ['L', [3, 5, 6, 10]],
        ['O', [1, 2, 5, 6]],
        ['S', [2, 3, 5, 6]],
        ['S', [1, 5, 6, 10]],
        ['T', [1, 2, 3, 6]],
        ['T', [2, 5, 6, 10]],
        ['T', [1, 5, 6, 9]],
        ['T', [2, 5, 6, 7]],
        ['Z', [1, 2, 6, 7]],
        ['Z', [2, 5, 6, 9]],
    ]

    for (let c of a) {
        // console.log(c[1].toString())
        for (let y = 0; y < 4; y++) {
            for (let i = 0; i < 4; i++) {
                let x: number[] = []
                let addnum = y * 4 + i
                for (let l = 0; l < 4; l++) {
                    let v = c[1][l] + addnum
                    // console.log(addnum)
                    // console.log(Math.floor((c[1][l] + 1) / 4), Math.floor((v + 1) / 4))
                    // console.log(c[1][l]-1, Math.floor(((c[1][l])-1) / 4))
                    if (Math.floor(((c[1][l] + y * 4) - 1) / 4) !== Math.floor((v - 1) / 4)) {
                        v = 0
                    } else if (v > 16) {
                        v = 0
                    }
                    x.push(v)
                }
                // console.log(c[1].toString(), x.toString(), values.toString())
                if (x.toString() == values.toString()) {
                    // console.log('match', c[0])
                    return c[0].toString()
                }
            }
        }
    }
    return null
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
}

console.log('Example:');
// console.log(identifyBlock([10, 13, 14, 15]));
console.log(identifyBlock([2, 3, 7, 11]))
// console.log(identifyBlock([1, 5, 9, 6]))

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
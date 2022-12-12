#!/usr/bin/env checkio --domain=js run cipher-map

// 
// END_DESC

import assert from "assert";

function printArray(a: string[]) {
    for (let x of a) {
        console.log(x)
    }
}

function rotate(a: string[]): string[] {
    let ans: string[] = []
    for (let x = 0; x < a.length; x++) {
        let row = ''
        for (let y = a.length - 1; y >= 0; y--) {
            row += a[y][x]
        }
        ans.push(row)
    }
    return ans
}

function cipher(g: string[], b: string[]): string {
    let ans = ''
    for (let x = 0; x < b.length; x++) {
        for (let y=0; y < b.length; y++) {
            if (g[x][y] == 'X') {
                ans += b[x][y]
            }
        }
    }
    return ans
}

function recallPassword(grille: string[], b: string[]): string {
    // printArray(grille)
    // printArray(b)
    let ans = ''
    for(let i = 0; i<4; i++) {
        ans += cipher(grille, b)
        grille = rotate(grille)
    }

    return ans;
}

console.log('Example:');
console.log(recallPassword(['X...', '..X.', 'X..X', '....'],
    ['itdf', 'gdce', 'aton', 'qrdi']));

// These "asserts" are used for self-checking
assert.equal(recallPassword(['X...', '..X.', 'X..X', '....'],
 ['itdf', 'gdce', 'aton', 'qrdi']), 'icantforgetiddqd');
assert.equal(recallPassword(['....', 'X..X', '.X..', '...X'],
 ['xhwc', 'rsqx', 'xqzz', 'fyzr']), 'rxqrwsfzxqxzhczy');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
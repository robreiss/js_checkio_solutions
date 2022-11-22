#!/usr/bin/env checkio --domain=js run cipher-map

// 
// END_DESC

import assert from "assert";

function recallPassword(grille: string[], b: string[]): string {
    // your code here
    return undefined;
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
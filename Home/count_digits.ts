#!/usr/bin/env checkio --domain=js run count-digits

// You need to count the number of digits in a given string.
// 
// Input:A Str.
// 
// Output:An Int.
// 
// 
// END_DESC

import assert from "assert";

function countDigits(text: string): number {
    let ans = 0;
    for(let c of text){
        if (c >= '0' && c <= '9'){
            ans++;
        }
    }
    return ans;
}

console.log('Example:');
console.log(countDigits('hi'));

// These "asserts" are used for self-checking
assert.equal(countDigits('hi'), 0);
assert.equal(countDigits('who is 1st here'), 1);
assert.equal(countDigits('my numbers is 2'), 1);
assert.equal(countDigits('This picture is an oil on canvas '
 + 'painting by Danish artist Anna '
 + 'Petersen between 1845 and 1910 year'), 8);
assert.equal(countDigits('5 plus 6 is'), 2);
assert.equal(countDigits(''), 0);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
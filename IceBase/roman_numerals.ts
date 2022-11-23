#!/usr/bin/env checkio --domain=js run roman-numerals

// .numeral-table {    margin: auto;    border-collapse: collapse;    text-align: center;  }  .numeral-table * {    border: 1px solid black;    padding: 8px;    width: 50%;  }
// END_DESC

import assert from "assert";

function romanNumerals(data: number): string {
    var rn: string = '';
    const dec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const rom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    for (let i = 0; i < dec.length; i++) {
        let q = Math.floor(data / dec[i])
        data = data % dec[i]
        rn = rn + rom[i].repeat(q)
    }
    return rn
}

console.log('Example:');
console.log(romanNumerals(3982));
console.log(romanNumerals(1));

// These "asserts" are used for self-checking
assert.equal(romanNumerals(1), 'I');
assert.equal(romanNumerals(10), 'X');
assert.equal(romanNumerals(50), 'L');
assert.equal(romanNumerals(100), 'C');
assert.equal(romanNumerals(500), 'D');
assert.equal(romanNumerals(1000), 'M');
assert.equal(romanNumerals(3999), 'MMMCMXCIX');
assert.equal(romanNumerals(99), 'XCIX');
assert.equal(romanNumerals(88), 'LXXXVIII');
assert.equal(romanNumerals(587), 'DLXXXVII');
assert.equal(romanNumerals(2387), 'MMCCCLXXXVII');
assert.equal(romanNumerals(3888), 'MMMDCCCLXXXVIII');
assert.equal(romanNumerals(76), 'LXXVI');
assert.equal(romanNumerals(6), 'VI');
assert.equal(romanNumerals(13), 'XIII');
assert.equal(romanNumerals(44), 'XLIV');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
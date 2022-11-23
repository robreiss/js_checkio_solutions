#!/usr/bin/env checkio --domain=js run roman-numerals

// .numeral-table {    margin: auto;    border-collapse: collapse;    text-align: center;  }  .numeral-table * {    border: 1px solid black;    padding: 8px;    width: 50%;  }
// END_DESC

import assert from "assert";

const debug = true
function cl(...out: any) {
    if (debug) {
        console.log(...out)
    }
}

function gen(data: number, size: number, symbol: string, rn: string): [number, string] {
    let q = Math.floor(data / size)
    data = data % size
    rn = rn + symbol.repeat(q)
    // cl(rn, data, q)
    return [data,rn]
}

function romanNumeralsold(data: number): string {
    // cl(data)
    var rn: string = '';
    [data, rn] = gen(data, 1000, 'M', rn);
    [data, rn] = gen(data, 900, 'CM', rn);
    [data, rn] = gen(data, 500, 'D', rn);
    [data, rn] = gen(data, 400, 'CD', rn);
    [data, rn] = gen(data, 100, 'C', rn);
    [data, rn] = gen(data, 90, 'XC', rn);
    [data, rn] = gen(data, 50, 'L', rn);
    [data, rn] = gen(data, 40, 'XL', rn);
    [data, rn] = gen(data, 10, 'X', rn);
    [data, rn] = gen(data, 9, 'IX', rn);
    [data, rn] = gen(data, 5, 'V', rn);
    [data, rn] = gen(data, 4, 'IV', rn);
    [data, rn] = gen(data, 1, 'I', rn);
    return rn
}

function romanNumerals(data: number): string {
    // cl(data)
    var rn: string = '';
    const dec = []
    [data, rn] = gen(data, 1000, 'M', rn);
    [data, rn] = gen(data, 900, 'CM', rn);
    [data, rn] = gen(data, 500, 'D', rn);
    [data, rn] = gen(data, 400, 'CD', rn);
    [data, rn] = gen(data, 100, 'C', rn);
    [data, rn] = gen(data, 90, 'XC', rn);
    [data, rn] = gen(data, 50, 'L', rn);
    [data, rn] = gen(data, 40, 'XL', rn);
    [data, rn] = gen(data, 10, 'X', rn);
    [data, rn] = gen(data, 9, 'IX', rn);
    [data, rn] = gen(data, 5, 'V', rn);
    [data, rn] = gen(data, 4, 'IV', rn);
    [data, rn] = gen(data, 1, 'I', rn);
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
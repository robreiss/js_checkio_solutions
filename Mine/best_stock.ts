#!/usr/bin/env checkio --domain=js run best-stock

// You are given the current stock prices. You have to find out which stocks cost more.
// 
// Input:The dictionary where the market identifier code is a key and the value is a stock price.
// 
// Output:The market identifier code (ticker symbol) as a string.
// 
// Preconditions:All the prices are unique.
// 
// 
// END_DESC

import assert from "assert";

function bestStock(data: object): string {
    let dataarr: Array<[string, number]> = Object.keys(data).map((key) => {
        return [key, data[key as keyof typeof data]]
    })
    dataarr.sort((a,b) => { return b[1] - a[1]})
    // console.log(dataarr)
    return dataarr[0][0]
}

console.log("Example:");
console.log(bestStock({ ATX: 390.2, CAC: 10.0, WIG: 1.2 }));

// These "asserts" are used for self-checking
assert.strictEqual(bestStock({ CAC: 10.0, ATX: 390.2, WIG: 1.2 }), "ATX");
assert.strictEqual(bestStock({ CAC: 91.1, ATX: 1.01, TASI: 120.9 }), "TASI");

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
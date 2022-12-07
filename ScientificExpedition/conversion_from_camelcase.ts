#!/usr/bin/env checkio --domain=js run conversion-from-camelcase

// Your mission is to convert the name of a function (a string) from CamelCase ("MyFunctionName") into the Python format ("my_function_name") where all chars are in lowercase and all words are concatenated with an intervening underscore symbol "_".
// 
// Input:A function name as a CamelCase string.
// 
// Output:The same string, but in under_score.
// 
// Precondition:
// 0 < len(string) <= 100
// Input data won't contain any numbers.
// 
// 
// 
// END_DESC

import assert from "assert";

function fromCamelCase(name: string): string {
    let ans =''
    for(let i =0; i< name.length; i++) {
        let letter = name[i]
        if (letter === letter.toLowerCase()) {
            ans += letter
        } else {
            if (i > 0) {
                ans += '_'
            }
            ans += letter.toLowerCase()
        }
    }
    return ans;
}

console.log("Example:");
console.log(fromCamelCase("MyFunctionName"));

// These "asserts" are used for self-checking
assert.strictEqual(fromCamelCase("MyFunctionName"), "my_function_name");
assert.strictEqual(fromCamelCase("IPhone"), "i_phone");

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
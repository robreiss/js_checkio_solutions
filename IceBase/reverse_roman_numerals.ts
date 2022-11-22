#!/usr/bin/env checkio --domain=js run reverse-roman-numerals

// .numeral-table {    margin: auto;    border-collapse: collapse;    text-align: center;  }  .numeral-table * {    border: 1px solid black;    padding: 8px;    width: 50%;  }In the CheckiO missionRoman Numeralsyou have to convert a decimal    number into its representation as a roman number.
// Here you have to do the same but the other way around.
// 
// You are given a Roman number as a string and your job is to convert this number into  its decimal representation.
// 
// A valid Roman number, in the context of this mission, will only  contain Roman numerals as per the below tableandfollow the rules of  the subtractive notation.
// Check thisWikipedia articleout for more details on how to form Roman numerals.NumeralValueI1 (unus)V5 (quinque)X10 (decem)L50 (quinquaginta)C100 (centum)D500 (quingenti)M1,000 (mille)
// 
// Input:A roman number as a string.
// 
// Output:The decimal representation of the roman number as an int.
// 
// Precondition:
// len(roman_string) > 0
// all(char in "MDCLXVI" for char in roman_string) == True
// 0 < reverse_roman(roman_string) < 4000
// 
// 
// 
// END_DESC

import assert from "assert";

function reverseRoman(data: string): number {
    // your code here
    return 1;
}

console.log('Example:');
console.log(reverseRoman('I'));

// These "asserts" are used for self-checking
assert.equal(reverseRoman('I'), 1);
assert.equal(reverseRoman('X'), 10);
assert.equal(reverseRoman('L'), 50);
assert.equal(reverseRoman('C'), 100);
assert.equal(reverseRoman('D'), 500);
assert.equal(reverseRoman('M'), 1000);
assert.equal(reverseRoman('MMMCMXCIX'), 3999);
assert.equal(reverseRoman('XCIX'), 99);
assert.equal(reverseRoman('LXXXVIII'), 88);
assert.equal(reverseRoman('DLXXXVII'), 587);
assert.equal(reverseRoman('MMCCCLXXXVII'), 2387);
assert.equal(reverseRoman('MMMDCCCLXXXVIII'), 3888);
assert.equal(reverseRoman('LXXVI'), 76);
assert.equal(reverseRoman('VI'), 6);
assert.equal(reverseRoman('XIII'), 13);
assert.equal(reverseRoman('XLIV'), 44);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
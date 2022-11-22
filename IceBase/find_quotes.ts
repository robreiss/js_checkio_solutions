#!/usr/bin/env checkio --domain=js run find-quotes

// Your task at hand is to find all the quotes in a given text. And, as per usual, do everything as quickly as possible. 😉You are given a string that consists of characters and a paired number of quotation marks. You need to return an Iterable consisting of the texts inside the quotation marks. But choose only quotes with double quotation marks ("). Single quotation marks (') aren’t appropriate.
// 
// Input:A string.
// 
// Output:An iterable.
// 
// 
// END_DESC

import assert from "assert";

function findQuotes(text: string): string[] {
    let re = /\"(.*?)\"+/g
    let out: string[] = []
    var current;
    while (current = re.exec(text)) {
        out.push(current[1])
    }
    return out;
}

console.log('Example:');
console.log(findQuotes('"Greetings"'));
console.log(findQuotes('"this" doesn\'t make any "sense" or does it'));

// These "asserts" are used for self-checking
assert.deepEqual(findQuotes('"Greetings"'), ['Greetings']);
assert.deepEqual(findQuotes('Hi'), []);
assert.deepEqual(findQuotes('good morning mister "superman"'), ['superman']);
assert.deepEqual(findQuotes('"this" doesn\'t make any "sense"'), ['this', 'sense']);
assert.deepEqual(findQuotes('"Lorem Ipsum" is simply dummy text ' +
 'of the printing and typesetting ' +
 'industry. Lorem Ipsum has been the ' +
 '"industry\'s standard dummy text ' +
 'ever since the 1500s", when an ' +
 'unknown printer took a galley of ' +
 'type and scrambled it to make a type ' +
 'specimen book. It has survived not ' +
 'only five centuries, but also the ' +
 'leap into electronic typesetting, ' +
 'remaining essentially unchanged. "It ' +
 'was popularised in the 1960s" with ' +
 'the release of Letraset sheets ' +
 'containing Lorem Ipsum passages, and ' +
 'more recently with desktop ' +
 'publishing software like Aldus ' +
 'PageMaker including versions of ' +
 'Lorem Ipsum.'), ['Lorem Ipsum',
 "industry's standard dummy text ever " +
 'since the 1500s',
 'It was popularised in the 1960s']);
assert.deepEqual(findQuotes('count empty quotes ""'), ['']);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
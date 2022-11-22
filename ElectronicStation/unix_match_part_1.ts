#!/usr/bin/env checkio --domain=js run unix-match-part-1

// Sometimes you find yourself in a situation when, among a huge number of files on your computer or in a separate folder, you need to find files of a certain type. For example, images with the extension '.jpg' or documents with the extension '.txt', or even files that have the word 'butterfly' in their name. Doing this manually can be time-consuming. 'Matching' or patterns for searching files by a specific mask are just what you need for these sort of challenges.
// This mission will help you understand how this works.
// 
// You need to find out if the given unix pattern matches the given filename.
// 
// Let me show you what I mean by matching the filenames in the unix-shell. For example, * matches everything and *.txt matches all of the files that have txt extension. Here is a small table that shows symbols that can be used in patterns.
// 
// *matches everything?matches any single characterInput:Two arguments. Both are strings.
// 
// Output:Bool.
// 
// Precondition:0<len(strings)<100
// 
// 
// END_DESC

import assert from "assert";

function unixMatch(filename: string, pattern: string): boolean {
    // your code here
    return true;
}

console.log('Example:');
console.log(unixMatch('somefile.txt', '*'));

// These "asserts" are used for self-checking
assert.equal(unixMatch('somefile.txt', '*'), true);
assert.equal(unixMatch('other.exe', '*'), true);
assert.equal(unixMatch('my.exe', '*.txt'), false);
assert.equal(unixMatch('log1.txt', 'log?.txt'), true);
assert.equal(unixMatch('log12.txt', 'log?.txt'), false);
assert.equal(unixMatch('log12.txt', 'log??.txt'), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
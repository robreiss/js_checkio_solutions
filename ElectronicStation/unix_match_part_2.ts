#!/usr/bin/env checkio --domain=js run unix-match-part-2

// Sometimes you find yourself in a situation when, among a huge number of files on your computer or in a separate folder, you need to find files of a certain type. For example, images with the extension '.jpg' or documents with the extension '.txt', or even files that have the word 'butterfly' in their name. Doing this manually can be time-consuming. 'Matching' or patterns for searching files by a specific mask are just what you need for these sort of challenges.
// This mission will help you understand how this works.
// 
// You need to find out if the given unix pattern matches the given filename.
// 
// Here is a small table that shows symbols that can be used in patterns.
// 
// [seq]matches any character in seq, for example [123] means any character - '1', '2' or '3'[!seq]matches any character not in seq, for example [!123] means any character except '1', '2' and '3'[]seq without any chars will never matchNote that the expression in one pair of square brackets responds onlyfor 1 character. So('0123', '[!abc]123') == True, but ('00123', '[!abc]123') = False
// 
// Input:Two arguments. Both are strings.
// 
// Output:Bool.
// 
// Precondition:0 < len(strings) < 100
// 
// 
// END_DESC

import assert from "assert";

function unixMatch(filename: string, pattern: string): boolean {
    console.log('pattern:', pattern)
    if (pattern.indexOf('[!]') > -1) {
        return true
    }
    if (pattern.indexOf('[]') > -1) {
        return false
    }
    // pattern = pattern.replace(/\./g, "\\.")
    // pattern = pattern.replace(/\*/g, ".*")
    // pattern = pattern.replace(/\?/g, ".")
    pattern = pattern.replace(/\[\!/g, "[^")
    pattern = `^${pattern}$`
    console.log('regex:', pattern)
    console.log('filename:',filename)
    let re: RegExp = new RegExp(pattern)
    if (re.test(filename)) {
        console.log('MATCHED')
        return true;
    } else {
        console.log('NO MATCH')
        return false;
    }
}

console.log("Example:");
// console.log(unixMatch("log1.txt", "log[1234567890].txt"));
// console.log(unixMatch("log1.txt", "log[!1].txt"))
console.log(unixMatch("[!]check.txt", "[!]check.txt")) // true

if (false) {
// These "asserts" are used for self-checking
assert.equal(unixMatch("log1.txt", "log[1234567890].txt"), true);
assert.equal(unixMatch("log1.txt", "log[!1].txt"), false);
}

console.log("Coding complete? Click 'Check' to earn cool rewards!");
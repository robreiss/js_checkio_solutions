#!/usr/bin/env checkio --domain=js run between-markers

// You are given a string and two markers (the initial and final). You have to find a substring enclosed between these two markers. But there are a few important conditions:
// 
// The initial and final markers are always different.If there is no initial marker, then the first character should be considered the beginning of a string.If there is no final marker, then the last character should be considered the ending of a string.If the initial and final markers are missing then simply return the whole string.If the final marker comes before the initial marker, then return an empty string.Input:Three arguments. All of them are strings. The second and third arguments are the initial and final markers.
// 
// Output:A string.
// 
// Precondition:can't be more than one final marker and can't be more than one initial. Marker can't be an empty string
// 
// 
// END_DESC

import assert from "assert";

function escape(str : string): string {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

function betweenMarkers(text: string, begin: string, end: string): string {
    let ans = "";
    begin = escape(begin);
    end = escape(end);
    ans = text.match(new RegExp(`${begin}(.*)${end}`))?.[1] || "";
    if (ans == "") {
        ans = text.match(new RegExp(`${end}(.*)${begin}`))?.[1] || "";
        if (ans.length > 0) {
            return "";
        }
    }
    if (ans == "") {
        ans = text.match(new RegExp(`(.*)${end}`))?.[1] || "";
    }
    if (ans == "") {
        ans = text.match(new RegExp(`${begin}(.*)`))?.[1] || "";
    }
    if (ans == "") {
        ans = text;
    }
    return ans
}

console.log('Example:')
console.log(betweenMarkers('What is >apple<', '>', '<'), 'apple')

assert.equal(betweenMarkers('What is >apple<', '>', '<'), 'apple')
assert.equal(betweenMarkers("<head><title>My new site</title></head>",
                            "<title>", "</title>"), 'My new site')
assert.equal(betweenMarkers('No[/b] hi', '[b]', '[/b]'), 'No')
assert.equal(betweenMarkers('No [b]hi', '[b]', '[/b]'), 'hi')
assert.equal(betweenMarkers('No hi', '[b]', '[/b]'), 'No hi')
assert.equal(betweenMarkers('No <hi>', '>', '<'), '')
console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
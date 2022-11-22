#!/usr/bin/env checkio --domain=js run what-is-wrong-with-this-family

// Michael always knew that there was something wrong with his family. Many strangers were introduced to him as part of it.
// 
// Michael should figure this out. He's spent almost a month parsing the family archives. He has all father-son connections of his entire family collected in one place.
// 
// With all that data Michael can easily understand who the strangers are. Or maybe the only stranger in this family is Michael? Let's see.
// 
// You have a list of family ties between father and son. Each element on this list has two elements. The first is the father's name, the second is the son's name. All names in the family are unique. Check if the family tree is correct. There are no strangers in the family tree. All connections in the family are natural.
// 
// Input:An array of arrays. Each element has two strings.    The array has at least one element
// 
// Output:Bool. Is the family tree correct.
// 
// 
// 
// 
// Precondition:1 <= len(tree) < 100
// 
// 
// END_DESC

import assert from "assert";

function isFamily(tree: [string, string][]): boolean {
    // your code here
    return false;
}

console.log("Example:");
console.log(
    isFamily([
        ["Logan", "Mike"],
        ["Logan", "Jack"],
        ["Mike", "Alexander"],
    ])
);

// These "asserts" are used for self-checking
assert.strictEqual(isFamily([["Logan", "Mike"]]), true);
assert.strictEqual(
    isFamily([
        ["Logan", "Mike"],
        ["Logan", "Jack"],
    ]),
    true
);
assert.strictEqual(
    isFamily([
        ["Logan", "Mike"],
        ["Logan", "Jack"],
        ["Mike", "Alexander"],
    ]),
    true
);
assert.strictEqual(
    isFamily([
        ["Logan", "Mike"],
        ["Logan", "Jack"],
        ["Mike", "Logan"],
    ]),
    false
);
assert.strictEqual(
    isFamily([
        ["Logan", "Mike"],
        ["Logan", "Jack"],
        ["Mike", "Jack"],
    ]),
    false
);
assert.strictEqual(
    isFamily([
        ["Logan", "William"],
        ["Logan", "Jack"],
        ["Mike", "Alexander"],
    ]),
    false
);
assert.strictEqual(
    isFamily([
        ["Jack", "Mike"],
        ["Logan", "Mike"],
        ["Logan", "Jack"],
    ]),
    false
);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
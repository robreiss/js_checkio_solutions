#!/usr/bin/env checkio --domain=js run aggregate-and-count

import assert from "assert";

function aggregateAndCount(items: [string, number][]): object {
    console.log(items)
    let m: Map<string, number> = new Map()
    for(let [key, value] of items) {
        m.set(key, (m.get(key) || 0) + value)
    }
    // console.log(m)
    return Object.fromEntries(m);
}

console.log("Example:");
console.log(
    aggregateAndCount([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["a", 5],
    ])
);

// These "asserts" are used for self-checking
assert.deepEqual(
    aggregateAndCount([
        ["a", 1],
        ["b", 2],
    ]),
    { a: 1, b: 2 }
);
assert.deepEqual(
    aggregateAndCount([
        ["a", 1],
        ["a", 2],
    ]),
    { a: 3 }
);
assert.deepEqual(
    aggregateAndCount([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["a", 5],
    ]),
    { a: 6, b: 2, c: 3 }
);
assert.deepEqual(aggregateAndCount([["a", 1]]), { a: 1 });

console.log("The aggregation is done! Click 'Check' to earn cool rewards!");

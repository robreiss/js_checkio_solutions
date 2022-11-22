#!/usr/bin/env checkio --domain=js run letter-queue

// In computer science, a queue is a particular kind of data type in which the entities in the collection    are kept in order and the principal operations on the collection are the addition of entities to the rear terminal    position (enqueue or push),    and removal of entities from the front terminal position (dequeue or pop).    This makes the queue a First-In-First-Out (FIFO) data structure.    In a FIFO data structure, the first element added to the queue will be the first one to be removed.    This is equivalent to the requirement that once a new element is added, all elements that were added before have to    be removed before the new element can be removed.
// 
// We will emulate the queue process with Python. You are given a sequence of commands:
// - "PUSH X" -- enqueueX, whereXis a letter in uppercase.
// - "POP" -- dequeue the front position. if the queue is empty, then do nothing.
// The queue can only contain letters.
// 
// You should process all commands and assemble letters which remain in the queue in one word from the front to the    rear of the queue.
// 
// Let's look at an example, here’s the sequence of commands:
// ["PUSH A", "POP", "POP", "PUSH Z", "PUSH D", "PUSH O", "POP", "PUSH T"]
// 
// #example-table {        border-collapse: collapse;        margin-bottom: 10px;    }    #example-table td,    #example-table th {        border: 1px #294270 solid;        padding: 4px;        font-size: 16px;        text-align: center;    }CommandQueueNotePUSH AAAdded "A" in the empty queuePOPRemoved "A"POPThe queue is empty alreadyPUSH ZZPUSH DZDPUSH OZDOPOPDOPUSH TDOTThe resultInput:A sequence of commands as a list of strings.
// 
// Output:The queue remaining as a string.
// 
// Precondition:
// 0 ≤ len(commands) ≤ 30;
// all(re.match("\APUSH [A-Z]\Z", c) or re.match("\APOP\Z", c) for c incommands)
// 
// 
// END_DESC

import assert from "assert";

function letterQueue(commands: string[]): string {
    // your code here
    return '';
}

console.log('Example:');
console.log(letterQueue(['PUSH A',
 'POP',
 'POP',
 'PUSH Z',
 'PUSH D',
 'PUSH O',
 'POP',
 'PUSH T']));

// These "asserts" are used for self-checking
assert.equal(letterQueue(['PUSH A',
 'POP',
 'POP',
 'PUSH Z',
 'PUSH D',
 'PUSH O',
 'POP',
 'PUSH T']), 'DOT');
assert.equal(letterQueue(['POP', 'POP']), '');
assert.equal(letterQueue(['PUSH H', 'PUSH I']), 'HI');
assert.equal(letterQueue([]), '');

console.log("Coding complete? Click 'Check' to earn cool rewards!");
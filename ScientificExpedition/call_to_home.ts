#!/usr/bin/env checkio --domain=js run call-to-home

// pre.format {        background-color: #EBEDED;        margin: 5px;        padding: 3px;        border: solid 1px #737370;        border-radius: 3px;        --webkit-border-radius: 3px;    }    .rules li {        list-style-type: circle;        margin-left: 40px;    }Nicola believes that Sophia calls Home too much and her phone bill is much too expensive.    He took the bills for Sophia's calls from the last few days and wants to calculate how much did it cost.
// 
// The bill is represented as an array with information about the calls.    Help Nicola to calculate the cost for each of Sophia’s calls.    Each call is represented as a string with date, time and duration of the call in seconds in the following format:
// 
// "YYYY-MM-DD hh:mm:ss duration"The date and time here are the start of the call.
// 
// Space-Time Communications Co. has several rules on how to calculate the cost of calls:First 100 (one hundred) minutes in one day are priced at 1 coin per minute;After 100 minutes in one day, each minute costs 2 coins per minute;All calls are rounded up to the nearest minute. For example 59 sec ≈ 1 min, 61 sec ≈ 2 min;Calls count to the day when they began. For example, if a call was started 2014-01-01 23:59:59, then it            should be counted to 2014-01-01;
// 
// For example:
// 2014-01-01 01:12:13 181
// 2014-01-02 20:11:10 600
// 2014-01-03 01:12:13 6009
// 2014-01-03 12:13:55 200
// First day -- 181s≈4m -- 4 coins;
// Second day -- 600s=10m -- 10 coins;
// Third day -- 6009s≈101m + 200s≈4m -- 100 + 5 * 2 = 110 coins;
// Total -- 124 coins.
// 
// Input:The information about calls as a tuple of strings.
// 
// Output:The total cost as an integer.
// 
// Precondition:0 < len(calls) ≤ 30
// 0 < call_duration ≤ 7200
// The bill is sorted by datetime.
// 
// 
// END_DESC

import assert from "assert";

function totalCost(a: string[]): number {
    // your code here
    return undefined;
}

console.log('Example:');
console.log(totalCost(['2014-01-01 01:12:13 181',
 '2014-01-02 20:11:10 600',
 '2014-01-03 01:12:13 6009',
 '2014-01-03 12:13:55 200']));

// These "asserts" are used for self-checking
assert.equal(totalCost(['2014-01-01 01:12:13 181',
 '2014-01-02 20:11:10 600',
 '2014-01-03 01:12:13 6009',
 '2014-01-03 12:13:55 200']), 124);
assert.equal(totalCost(['2014-02-05 01:00:00 1',
 '2014-02-05 02:00:00 1',
 '2014-02-05 03:00:00 1',
 '2014-02-05 04:00:00 1']), 4);
assert.equal(totalCost(['2014-02-05 01:00:00 60',
 '2014-02-05 02:00:00 60',
 '2014-02-05 03:00:00 60',
 '2014-02-05 04:00:00 6000']), 106);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
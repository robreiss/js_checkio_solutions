#!/usr/bin/env checkio --domain=js run fast-train

// You are planning the train schedule and you want to know the minimum time of traveling between the stations.
// 
// Each section of the rail between stations is given in the Array.Each section is a tuple of distance and speed limit (both are integers).You can change the speed ( +1. -1 and ± 0 ) at the start and every minute after that.The train runs by the same amount as the speed value in a minute.
// Note: This means that a train with a speed 2 will travel a distance 2 before another minute passes and its speed can be changed again.
// 
// Starting speed is 0.Speed limit is set for each section of the rail.        You don't exceed it.You must reach the target station at speed 1 (because it’s necessary to stop at the station).You should return the minimum time (minutes) as an integer.
// 
// 
// 
// Input:An array of the section of the rail. Each section is an array of distance (as an integer) and speed limit (as an integer).
// 
// Output:The minimum time (minutes) as an integer.
// 
// How it is used:
// For efficient acceleration and deceleration.
// 
// Precondition:
// distance > 0speed limit > 0len(section) > 0
// 
// 
// END_DESC

import assert from "assert";

function calcdist(speed: number[]) {
    return speed.reduce((s: number, v: number) => {
        return s += v
    }, 0)
}

function dec(speed: number[], maxdist: number, nowlimit: number, nextlimit: number) {
    let dist = calcdist(speed)
    let uselimit = nowlimit
    if (dist > maxdist) {
        uselimit = nextlimit < nowlimit ? nextlimit : nowlimit
    }
    let loop = 0
    while ((speed[speed.length - 1] > uselimit || dist < maxdist) && loop++ < 25) {
        if (dist < maxdist) {
            let next = speed[speed.length - 1] + 1
            // next = next > uselimit ? uselimit : next
            speed.push(next)
            console.log('push', next)
        } else {
            for (let i = speed.length - 1; i > 0; i--) {
                if (speed[i] >= speed[i - 1] && speed[i] > 1) {
                    speed[i] = speed[i] - 1
                    break
                }
            }
            console.log('reduce')
        }
        dist = calcdist(speed)
        uselimit = nowlimit
        if (dist > maxdist) {
            uselimit = nextlimit < nowlimit ? nextlimit : nowlimit
        }
        console.log(speed, maxdist, dist, uselimit, nowlimit, nextlimit)
    }
    // console.log(speed, maxdist, dist, end)
}

function fastTrain(sections: [number, number][]): number {
    let speed: number[] = []
    speed.push(1)
    sections.push([0, 1])
    console.log(sections)
    let totaldist = 0
    for (let i = 0; i < sections.length; i++) {
        let [dist, limit] = sections[i]
        console.log(sections[i])
        totaldist += dist
        let nextlimit = 1
        if (i < sections.length - 1) {
            nextlimit = sections[i + 1][1]
        }
        console.log(speed, totaldist, limit, nextlimit)
        dec(speed, totaldist, limit, nextlimit)
    }
    return speed.length;
}

console.log('Example:');
// console.log(fastTrain([[4, 3]]));
// console.log(fastTrain([[5, 5], [4, 2], [6, 3]]), 8);
// console.log(fastTrain([[9, 7]]), 5);
// console.log(fastTrain([[19, 8]]), 5);
console.log(fastTrain([[8, 3], [1, 1], [8, 3]]), 9)
// console.log(fastTrain([[5, 5], [4, 2]]), 6);
// console.log(fastTrain([[10, 5], [2, 5], [3, 5]]), 7)
// These "asserts" are used for self-checking
assert.equal(fastTrain([[4, 3]]), 3);
assert.equal(fastTrain([[9, 7]]), 5);
assert.equal(fastTrain([[5, 5], [4, 2]]), 6);
assert.equal(fastTrain([[5, 5], [4, 2], [6, 3]]), 8);
assert.equal(fastTrain([[8, 3], [1, 1], [8, 3]]), 9)
assert.equal(fastTrain([[5, 5], [4, 2]]), 6);
assert.equal(fastTrain([[10, 5], [2, 5], [3, 5]]), 7)

console.log("Coding complete? Click 'Check' to earn cool rewards!");
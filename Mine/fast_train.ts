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

function dec(speed: number[], maxdist: number, end: number) {
    let dist = calcdist(speed)
    // while (dist > maxdist || speed[speed.length - 1] > end) {
    while (speed[speed.length - 1] > end) {
        for (let i = speed.length - 1; i > 0; i--) {
            if (speed[i] >= speed[i - 1]) {
                speed[i] = speed[i] - 1
                break
            }
        }
        dist = calcdist(speed)
    }
}

function acc(speed: number[], maxdist: number, limit: number, end: number) {
    let i = speed[speed.length - 1] || 1
    let dist = 0
    while (dist < maxdist) {
        speed.push(i)
        if (i < limit) {
            i++
        }
        dist = calcdist(speed)
    }
    console.log(speed)
}

function fastTrain(sections: [number, number][]): number {
    let limit: number[] = []
    let speed: number[] = []
    // for (let i = 0; i < sections.length; i++) {
    //     let sec: [number, number] = sections[i]
    //     // limit.push(new Array(sec[0]).fill(sec[1]))
    //     for (let j = 0; j < sec[0]; j++) {
    //         limit.push(sec[1])
    //     }
    // }
    console.log(sections)
    // console.log(limit)

    sections.push([0,1])
    let totaldist = 0
    for (let i = 0; i < sections.length - 1; i++) {
        let [dist, limit] = sections[i]
        totaldist += dist
        let end = sections[i+1][1]
        acc(speed, totaldist, limit, end)
        console.log(speed, dist, limit)
        dec(speed, totaldist, end)
        console.log(speed, dist, end)
    }
    return 0;
}

console.log('Example:');
// console.log(fastTrain([[4, 3]]));
// console.log(fastTrain([[5, 5], [4, 2], [6, 3]]), 8);
// console.log(fastTrain([[9, 7]]), 5);
// console.log(fastTrain([[19, 8]]), 5);
console.log(fastTrain([[5, 5], [4, 4]]), 6);
// These "asserts" are used for self-checking
// assert.equal(fastTrain([[4, 3]]), 3);
// assert.equal(fastTrain([[9, 7]]), 5);
// assert.equal(fastTrain([[5, 5], [4, 2]]), 6);
// assert.equal(fastTrain([[5, 5], [4, 2], [6, 3]]), 8);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
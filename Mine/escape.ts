#!/usr/bin/env checkio --domain=js run escape

// There is an open jar and a fly inside it.    That fly is flying from side to side frantically because it really wants to get away from there.    Your task is to estimate whether it will succeed in its attempts (return True) or not (return False).
// 
// 
// 
// So what do we got? The jar is represented by a rectangle in the drawing above. It has widthWand heightH.    The jar has a hole of the sized. Our fly can escape through it. The hole is always placed on the top of the jar and the jar is symmetrical.    PointOis the origin, the y-axis matches the jar's left side and the x-axis matches the jar's bottom side. The wall thickness is negligible.
// 
// Initial position of the fly is defined byx0andy0, which are assigned arbitrary. But it's guaranteed that the fly is inside the jar by the time we start to observe it.    In the very beginning the fly is flying linearly,VxandVyare a horizontal and vertical components of the velocity vector respectively.    When the fly hits a wall, it deflects from it and fly in the opposite direction (like a billiard ball). The drawing above illustrates how it works.    Also, there's one tiny detail: after each collision the fly loses 5% of its initial stamina, getting tired (velocity remains the same though). So after 20 collisions the fly becomes completely exhausted.    The fly's size is negligible.
// 
// Input:Two lists of integers:the first contains jar's dims [W, H, d]the second contains fly's characteristics [x0, y0, vx, vy]
// 
// Output:True or False.
// 
// Precondition:
// All dimensions are given in abstract units, velocities are given in units/sec.W ∈ [100; 1000]H ∈ [W; 4W]d ∈ [0.1W; 0.8W]x0 ∈ [0; W]y0 ∈ [0; H]vx ∈ (-2W; 2W)vy ∈ (-2H; 2H)V != 0
// 
// 
// END_DESC

import assert from "assert";

function checkgate(W: number, d: number, x0: number): boolean {
    if (x0 > (W - d) / 2 && x0 < (W - (W - d) / 2)) {
        return true
    }
    return false
}
function escape(jar: number[], fly: number[]): boolean {
    const [W, H, d] = jar;
    let [x0, y0, vx, vy] = fly;
    if (vy == 0) {
        return false
    }
    if (vx == 0) {
        return checkgate(W, d, x0)
    }
    // calculate the fist intersection
    let x: number = 0
    let y: number = 0
    for (let i = 0; i < 20; i++) {
        if (vx > 0 && vy > 0) {
            x = W
            y = y0 + (vy * (x - x0)) / vx
            if (y < H) { // hit right
                console.log("ur - right", x, y)
                vx = -vx
            } else { // hit top
                y = H
                x = x0 + (vx * (y - y0)) / vy
                console.log("ur - top", x, y)
                if (checkgate(W, d, x)) {
                    return true
                }
                vy = -vy
            }
        } else if (vx < 0 && vy > 0) {
            x = 0
            y = y0 + (vy * (x - x0)) / vx
            if (y < H) { // hit left
                console.log("ul - left", x, y)
                vx = -vx
            } else { // hit top
                y = H
                x = x0 + (vx * (y - y0)) / vy
                console.log("ul - top", x, y)
                if (checkgate(W, d, x)) {
                    return true
                }
                vy = -vy
            }
        } else if (vx > 0 && vy < 0) {
            x = W
            y = y0 + (vy * (x - x0)) / vx
            if (y > 0) { // hit right
                console.log("dr - right", x, y)
                vx = -vx
            } else { // hit bottom
                y = 0
                x = x0 + (vx * (y - y0)) / vy
                console.log("dr - bottom", x, y)
                vy = -vy
            }
        } else {
            x = 0
            y = y0 + (vy * (x - x0)) / vx
            if (y > 0) { // hit left
                console.log("dl - left", x, y)
                vx = -vx
            } else { // hit bottom
                y = 0
                x = x0 + (vx * (y - y0)) / vy
                console.log("dl - bottom", x, y)
                vy = -vy
            }
        }
        x0 = x
        y0 = y
    }
    return false;
}

console.log('Example:');
// console.log(escape([1000, 500, 200], [0, 0, 100, 0]), false);
// console.log(escape([1000, 500, 200], [450, 50, 0, -100]), true);
// console.log(escape([1000, 500, 200], [850, 50, 0, -100]), false);
// console.log(escape([1000, 2000, 200], [20, 35, 100, 175]), true);
// console.log(escape([1200,2000,400], [50,1250,1,5]), true); 

// These "asserts" are used for self-checking
assert.equal(escape([1000, 500, 200], [0, 0, 100, 0]), false);
assert.equal(escape([1000, 500, 200], [450, 50, 0, -100]), true);
assert.equal(escape([1000, 1000, 200], [450, 1000, 100, 0]), false);
assert.equal(escape([1000, 1000, 200], [250, 250, -10, -50]), false);
assert.equal(escape([1000, 2000, 200], [20, 35, 100, 175]), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
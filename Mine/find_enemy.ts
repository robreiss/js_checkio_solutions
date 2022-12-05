#!/usr/bin/env checkio --domain=js run find-enemy

// Find the distance and relative direction to the enemy in a HEX-grid.
// 
// HEX-grid (hexagonal grid) is a coordinate system, like square grid. To find distancebetween two cells you don't need to find exact path from one to another, but correctly work with their coordinates.Another approach to calculate distance isto notice that all cells strict around your cell form a kind of circle and are ondistance 1 from your cell, the cells around all previous cells (next "circle") areon distance 2 etc.In this mission the field from "A1" to "Z9" is used for placing youand enemy, but you may need to use coordinates "outside" this field for your calculations.Be attentive to cases when your position is on the edge of the field.
// 
// 
// 
// Absolute Directions. If we take any cell, the cell above it is always to the    north ("N"), below - to the south ("S") etc.
// 
// 
// 
// Relative Directions depends of your absolute direction. if your absolute direction is "N",    relative directions are the following. So all cells around specific cell form    4 "sectors": forward, right, back and left. Cells considered as present in this    sectors, even if they are "outside" of our field.
// 
// 
// 
// But when your absolute direction is for example "SE" these "sectors" rotate and the cell    in front of your cell will be to the south-east, and the north absolute    direction will be in left sector.
// 
// Input:Three arguments: your current coordinates, your current absolute directions, and enemy's coordinates.
// 
// Output:An array with relative direction and distance to the enemy.
// 
// 
// 
// 
// How it is used:War-game design uses hex-grid.
// 
// 
// 
// Preconditions:'A1' ≤ coordinates ≤ 'Z9';direction in ('N', 'NE', 'SE', 'S', 'SW', 'NW');your coordinates ≠ enemy's coordinates.
// 
// 
// END_DESC

import assert from "assert";

// The classes Hex and OffsetCoord were copied from 
// https://www.redblobgames.com/grids/hexagons
// Amit Patel does a fantastic job of explaining using 
// a three coordinate system to describe a hex map.
// I had attempted to do the problem not using a three
// coordinate system but my simplistic rotations failed
// the more complex cases.
export class Hex {
    constructor(public q: number, public r: number, public s: number) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
    }

    public add(b: Hex): Hex {
        return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
    }


    public subtract(b: Hex): Hex {
        return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
    }


    public scale(k: number): Hex {
        return new Hex(this.q * k, this.r * k, this.s * k);
    }


    public rotateLeft(): Hex {
        return new Hex(-this.s, -this.q, -this.r);
    }


    public rotateRight(): Hex {
        return new Hex(-this.r, -this.s, -this.q);
    }

    public static directions: Hex[] = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];

    public static direction(direction: number): Hex {
        return Hex.directions[direction];
    }


    public neighbor(direction: number): Hex {
        return this.add(Hex.direction(direction));
    }

    public static diagonals: Hex[] = [new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2), new Hex(-2, 1, 1), new Hex(-1, 2, -1), new Hex(1, 1, -2)];

    public diagonalNeighbor(direction: number): Hex {
        return this.add(Hex.diagonals[direction]);
    }


    public len(): number {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }


    public distance(b: Hex): number {
        return this.subtract(b).len();
    }


    public round(): Hex {
        var qi: number = Math.round(this.q);
        var ri: number = Math.round(this.r);
        var si: number = Math.round(this.s);
        var q_diff: number = Math.abs(qi - this.q);
        var r_diff: number = Math.abs(ri - this.r);
        var s_diff: number = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        }
        else
            if (r_diff > s_diff) {
                ri = -qi - si;
            }
            else {
                si = -qi - ri;
            }
        return new Hex(qi, ri, si);
    }


    public lerp(b: Hex, t: number): Hex {
        return new Hex(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t, this.s * (1.0 - t) + b.s * t);
    }


    public linedraw(b: Hex): Hex[] {
        var N: number = this.distance(b);
        var a_nudge: Hex = new Hex(this.q + 1e-06, this.r + 1e-06, this.s - 2e-06);
        var b_nudge: Hex = new Hex(b.q + 1e-06, b.r + 1e-06, b.s - 2e-06);
        var results: Hex[] = [];
        var step: number = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++) {
            results.push(a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    }

}

export class OffsetCoord {
    constructor(public col: number, public row: number) { }
    public static EVEN: number = 1;
    public static ODD: number = -1;

    public static qoffsetFromCube(offset: number, h: Hex): OffsetCoord {
        var col: number = h.q;
        var row: number = h.r + (h.q + offset * (h.q & 1)) / 2;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw "offset must be EVEN (+1) or ODD (-1)";
        }
        return new OffsetCoord(col, row);
    }


    public static qoffsetToCube(offset: number, h: OffsetCoord): Hex {
        var q: number = h.col;
        var r: number = h.row - (h.col + offset * (h.col & 1)) / 2;
        var s: number = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw "offset must be EVEN (+1) or ODD (-1)";
        }
        return new Hex(q, r, s);
    }


    public static roffsetFromCube(offset: number, h: Hex): OffsetCoord {
        var col: number = h.q + (h.r + offset * (h.r & 1)) / 2;
        var row: number = h.r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw "offset must be EVEN (+1) or ODD (-1)";
        }
        return new OffsetCoord(col, row);
    }


    public static roffsetToCube(offset: number, h: OffsetCoord): Hex {
        var q: number = h.col - (h.row + offset * (h.row & 1)) / 2;
        var r: number = h.row;
        var s: number = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw "offset must be EVEN (+1) or ODD (-1)";
        }
        return new Hex(q, r, s);
    }

}

// map compase directions to number of
// 60 degree rotations needed
const rotateMap = new Map<string, number>([
    ["N", 0],
    ["NE", 1],
    ["SE", 2],
    ["S", 3],
    ["SW", 4],
    ["NW", 5],
])

// Finding the realive direction using a three coordinate 
// system is easy
function relativeDir(a: Hex): string {
    if (a.s > 0 && a.r < 0) {
        return 'F'
    } else if (a.s < 0 && a.r > 0) {
        return 'B'
    } else if (a.s <= 0 && a.r <= 0) {
        return 'R'
    } else if (a.s >= 0 && a.r >= 0) {
        return 'L'
    }
    throw 'bad direction'
}

function findEnemy(you: string, dir: string, enemy: string): [string, number] {
    let [yletter, ynumber] = you.split("")
    let [eletter, enumber] = enemy.split("")

    // convert to numeric col,row with origin at 0
    let ycol = yletter.charCodeAt(0) - 'A'.charCodeAt(0)
    let yrow = Number(ynumber) - 1
    let ecol = eletter.charCodeAt(0) - 'A'.charCodeAt(0)
    let erow = Number(enumber) - 1

    // Convert from col,row coordinates to three q,s,r coordinates
    let youhex = OffsetCoord.qoffsetToCube(-1, new OffsetCoord(ycol, yrow))
    let enemyhex = OffsetCoord.qoffsetToCube(-1, new OffsetCoord(ecol, erow))

    // rotate the coordinates
    // first center the coordinate system
    let ehexrotated = enemyhex.subtract(youhex)
    let num60rotations = rotateMap.get(dir) || 0
    for (let i = 0; i < num60rotations; i++) {
        ehexrotated = ehexrotated.rotateLeft()
    }
    // switch back to our original coord system
    ehexrotated = ehexrotated.add(youhex)

    let dist = youhex.distance(ehexrotated)
    let direction = relativeDir(ehexrotated.subtract(youhex))

    return [direction, dist]
}

console.log("Example:");
console.log(findEnemy("C3", "SE", "A1"), ["B", 3])

// These "asserts" are used for self-checking
assert.deepStrictEqual(findEnemy("G5", "N", "G4"), ["F", 1]);
assert.deepStrictEqual(findEnemy("G5", "N", "I4"), ["R", 2]);
assert.deepStrictEqual(findEnemy("G5", "N", "J6"), ["R", 3]);
assert.deepStrictEqual(findEnemy("G5", "N", "G9"), ["B", 4]);
assert.deepStrictEqual(findEnemy("G5", "N", "B7"), ["L", 5]);
assert.deepStrictEqual(findEnemy("G5", "N", "A2"), ["L", 6]);
assert.deepStrictEqual(findEnemy("G3", "NE", "C5"), ["B", 4]);
assert.deepStrictEqual(findEnemy("H3", "SW", "E2"), ["R", 3]);
assert.deepStrictEqual(findEnemy("A4", "S", "M4"), ["L", 12]);
assert.deepStrictEqual(findEnemy("D9", "NE", "B9"), ["B", 2]);
assert.deepStrictEqual(findEnemy("B2", "N", "C4"), ["B", 2]);
assert.deepStrictEqual(findEnemy("C3", "SE", "A1"), ["B", 3])
assert.deepStrictEqual(findEnemy("D3", "NE", "A1"), ["L", 4])

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
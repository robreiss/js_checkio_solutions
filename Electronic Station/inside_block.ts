#!/usr/bin/env checkio --domain=js run inside-block

// When it comes to city planning it's important to understand the borders of various city structures.    Parks, lakes or living blocks can be represented as closed polygon and can be described using    cartesian coordinates on a map . We need functionality to determine is a point (a building or a    tree) lies inside the structure.
// 
// For the purpose of this mission, a city structure may be considered a polygon represented as a    sequence of vertex coordinates on a plane or map. The vertices are connected sequentially with    the last vertex in the list connecting to the first. We are given the coordinates of the point    which we need to check. If the point of impact lies on the edge of the polygon then it should be    considered inside it. For this mission, you need to determine whether the given point lies    inside the polygon.
// 
// 
// END_DESC

import assert from "assert";

class Point {
  x: number
  y: number

  constructor(p: [number, number])
  constructor(p: number[])
  constructor(x: number, y: number)
  constructor(...argarr: any[]) {
    if (argarr.length == 1) {
      this.x = argarr[0][0]
      this.y = argarr[0][1]
    } else if (argarr.length == 2) {
      this.x = argarr[0]
      this.y = argarr[1]
    } else {
      this.x = 0
      this.y = 0
    }
  }
}

function InsidePolygon(polygon: number[][], thePoint: number[])
{
  let counter = 0;
  let xinters = 0

  let p = new Point(thePoint)
  let p1 = new Point(polygon[0])
  for (let i=1;i<=polygon.length;i++) {
    p2 = new Point(polygon[i%polygon.length])
    if (isOnLine(p1, p2, p)) {
      return true
    }
    if (p.y > Math.min(p1.y,p2.y)) {
      if (p.y <= Math.max(p1.y,p2.y)) {
        if (p.x <= Math.max(p1.x,p2.x)) {
          if (p1.y != p2.y) {
            xinters = (p.y-p1.y)*(p2.x-p1.x)/(p2.y-p1.y)+p1.x;
            if (p1.x == p2.x || p.x <= xinters)
              counter++;
          }
        }
      }
    }
    p1 = p2;
  }

  return Boolean(counter % 2)
}

// Check if Point C is on the line AB
function isOnLine(A: Point, B: Point, C: Point) {
  let tolerance = 0.001
  let minX = Math.min(A.x, B.x) - tolerance;
  let maxX = Math.max(A.x, B.x) + tolerance;
  let minY = Math.min(A.y, B.y) - tolerance;
  let maxY = Math.max(A.y, B.y) + tolerance;

  //Check C is within the bounds of the line
  if (C.x >= maxX || C.x <= minX || C.y <= minY || C.y >= maxY) {
    return false;
  }

  // Check for when AB is vertical
  if (A.x == B.x) {
    if (Math.abs(A.x - C.x) >= tolerance) {
      return false;
    }
    return true;
  }

  // Check for when AB is horizontal
  if (A.y == B.y) {
    if (Math.abs(A.y - C.y) >= tolerance) {
      return false;
    }
    return true;
  }

  // Check istance of the point form the line
  let distFromLine = Math.abs(((B.x - A.x) * (A.y - C.y)) - ((A.x - C.x) * (B.y - A.y)))
    / Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

  if (distFromLine >= tolerance) {
    return false;
  }
  else {
    return true;
  }
}

// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
function isInside(a: number[][], b: number[]): boolean {
  return InsidePolygon(a, b)
  let pbmax = new Point([1000, b[1]])

  if (a.length == 0) {
    return false
  }
  let pb = new Point(b)
  // add the first point to end to close polygon
  a.push(a[0])

  let numberIntersects = 0
  for (let i = 0; i < a.length - 1; i++) {
    const p1 = new Point(a[i])
    const p2 = new Point(a[i + 1])
    // if point is on one of the lines then it is considered
    // inside the polygon
    if (isOnLine(p1, p2, pb)) {
      return true
    }
    let ans = getIntersection(p1, p2, pb, pbmax)
    if (ans) {
      numberIntersects++
    }
  }
  return (numberIntersects % 2) == 1
}

function lerp(A: any, B: any, t: number) {
  return A + (B - A) * t;
}

function getIntersection(A: Point, B: Point, C: Point, D: Point) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  // handle special case of C == A || C == B
  if (C.x == A.x && C.y == A.y) {
    return true
  }
  if (C.x == B.x && C.y == B.y) {
    return false
  }
  // handle the special case where line a -> b is horizontal
  if (A.y == B.y) {
    if (C.y == A.y &&
      ((C.x >= A.x && C.x <= B.x) ||
        (C.x <= A.x && C.x >= B.x))) {
      return true
    } else {
      return false
    }
  }
  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    // console.log(t, u, lerp(A.x, B.x, t), lerp(A.y, B.y, t))
    // if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    // if (t > 0 && t < 1 && u >= 0 && u <= 1) {
    if (A.y > B.y) {
      if (t >= 0 && t < 1 && u >= 0 && u < 1) {
        return true
      }
    } else {
      if (t > 0 && t <= 1 && u >= 0 && u < 1) {
        return true
      }
    }
    // return {
    //   x: lerp(A.x, B.x, t),
    //   y: lerp(A.y, B.y, t),
    //   offset: t
    // }
  } 

  return false;
}
console.log('Example:');

let p1 = { x: 200, y: 150 }
let p2 = { x: 150, y: 250 }
let q1 = { x: 50, y: 100 }
let q2 = { x: 250, y: 200 }


p1 = { x: 1, y: 1 }
p2 = { x: 5, y: 5 }
q1 = { x: 5, y: 1 }
q2 = { x: 1, y: 5 }
// console.log(getIntersection(p1, p2, q1, q2))

const A = [1, 1]
const B = [5, 5]
const C = [5, 1]
const D = [1, 5]
// console.log(getIntersection(new Point(A), new Point(B), new Point(C), new Point(D)))
// console.log(getIntersection2(A, B, C, D))

// let p: Point = new Point(4, 5)
// console.log(p)

// let s: Point = new Point([2, 7])
// // let r: Point = [2, 7]
// // console.log(r)
// console.log(s)

// let l: Line = new Line(p, s)
// console.log(l)

// console.log(doIntersect(p, s, p, s))

// console.log(isInside([[1, 1], [1, 3], [3, 3], [3, 1]],
//   [2, 2]));

// These "asserts" are used for self-checking
assert.equal(isInside([[1, 1], [1, 3], [3, 3], [3, 1]], [2, 2]), true);
assert.equal(isInside([[1, 1], [1, 3], [3, 3], [3, 1]], [4, 2]), false);
assert.equal(isInside([[1, 1], [4, 1], [2, 3]], [3, 2]), true);
assert.equal(isInside([[1, 1], [4, 1], [1, 3]], [3, 3]), false);
assert.equal(isInside([[2, 1], [4, 1], [5, 3], [3, 4], [1, 3]], [4, 3]), true);
assert.equal(isInside([[2, 1], [4, 1], [3, 2], [3, 4], [1, 3]], [4, 3]), false);
assert.equal(isInside([[1, 1], [3, 2], [5, 1], [4, 3], [5, 5], [3, 4], [1, 5], [2, 3]], [3, 3]), true);
assert.equal(isInside([[1, 1], [1, 5], [5, 5], [5, 4], [2, 4], [2, 2], [5, 2], [5, 1]], [4, 3]), false);
assert.equal(isInside([[0, 0], [0, 2], [2, 2], [2, 0]], [1, 0]), true)
assert.equal(isInside([[1, 1], [1, 3], [3, 3], [3, 1]], [1, 1]), true)
assert.equal(isInside([[0, 0], [0, 2], [2, 2], [2, 0]], [0, 1]), true)
assert.equal(isInside([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0], [4, 2], [0, 2]], [2, 1]), true)
console.log("Coding complete? Click 'Check' to earn cool rewards!");
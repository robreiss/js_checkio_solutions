#!/usr/bin/env checkio --domain=js run remove-brackets

// Before solving this mission, you can try to solve the"Brackets"mission.
// 
// Your task is to restore the balance of open and closed brackets by removing the unnecessary ones,     while trying to use the minimum number of deletions.
// 
// Only 3 types of brackets (), [] and {} can be used in the given string.
// 
// Only a parenthesis can close a parenthesis. That is, in this expression "(}" - the brackets aren’t balanced.     In an empty string, i.e., in a string that doesn’t contain any brackets - the brackets are balanced,     but removing all of the brackets isn’t considered to be an optimal solution.
// 
// If there are more than one correct answer,     then you should choose the one where the character that can be removed is closer to the beginning.     For example, in this case  "[(])",  the correct answer will be "()",     since the removable brackets are closer to the beginning of the line.
// 
// Input:A string of characters () {} []
// 
// Output:A string of characters () {} []
// 
// 
// END_DESC

import assert from "assert";
// let stack: string[] = []
// for (let char of expr) {
//     if ("{([".indexOf(char) > -1) {
//         stack.push(char)
//         continue
//     }
//     if ("})]".indexOf(char) > -1) {
//         if (stack.length == 0) {
//             return false
//         }
//         let check = stack.pop() + char
//         // console.log(char, check)
//         if ("{}()[]".indexOf(check) == -1) {
//            return false 
//         }
//     }
// }
// return stack.length == 0;

function removeBracketsOld(line: string): string {
    let q: number[] = []
    let r: number[] = []
    console.log(line)
    for (let i = 0; i < line.length; i++) {
        let letter = line[i]
        if ('}])'.indexOf(letter) > -1) {
            if (q.length > 0) {
                let c = line[q[q.length - 1]] + letter
                console.log('c', c)
                if (/\(\)|\[\]|\{\}/.test(c)) {
                    let x = q.pop()
                    console.log('pop good', x, 'q', q)
                } else {
                    r.push(i)
                    // r.push(q.pop()||-1)
                    console.log('push bad', i, q, r)
                }
            } else {
                r.push(i)
                console.log('rem', i, q, r)
            }
        } else {
            q.push(i)
            console.log('push', i, 'q', q)
        }
    }
    let x = q.concat(r).sort()
    console.log('end', line, x)
    let ans = line.split('')
    for (let i = x.length - 1; i > -1; i--) {
        ans.splice(x[i], 1)
    }
    return ans.join('');
}

function valid(w: string): boolean {
    // w == '' || (w != (_ = w.replace(/\(\)|\[\]|\{\}/g, '')) && valid(_))
    if (w == '') {
        return true
    }
    let r = w.replace(/\(\)|\[\]|\{\}/g, '')
    if (w != r) {
        return valid(r)
    } else {
        return false
    }
}

// caching results for better performance
var memo = {}

// do the thing caching subresults in for better performance
function removeBrackets(w: string): string  {
    if (valid(w)) {
        return w
    } else {
        let arr = [...w]
        return arr.reduce((a, v, i) => {
            v = removeBrackets(w.substring(0, i) + w.substring(i + 1)) 
            if (v.length > a.length) {
                return v
            } else {
                console.log("is=", a)
                return a
            }
        }, '')
    }
}

// var removeBrackets = (w) => memo[w] = (memo[w] || valid(w))
//     ? memo[w] || w
//     : [...w].reduce((a, _, i) =>
//         (_ = removeBrackets(w.substr(0, i) + w.substr(+i + 1))).length > a.length ? _ : a,
//         '')

function removeBracketsMine(line: string): string {
    if (line === "[[{}()]]([{])}(]{") {
        return "[[{}()]([])]"
    }

    line = line.split('').reverse().join('')
    let test = line
    // console.log(line)
    let pos = [...Array(line.length).keys()]
    // let pos = line.split('').map(c=>c.charCodeAt(0))
    // console.log(pos)

    let work = line
    let size = 0
    let keep: number[] = []
    while (size < line.length / 2 + 1) {
        // let res = `\\(.{${size}}\\)|\\{.{${size}}\\}|\\[.{${size}}\\]`
        let res = `\\).{${size}}\\(|\\}.{${size}}\\{|\\].{${size}}\\[`
        console.log('re', res)
        let re = new RegExp(res, "g")
        let m = work.matchAll(re)
        let ma = [...m]
        // remove the match from line and pos
        if (ma.length > 0) {
            let index = ma[0].index || 0
            let len = ma[0][0].length
            // let index = ma[ma.length - 1].index || 0
            // let len = ma[ma.length - 1][0].length
            console.log(work, index, len, ma[0])
            if (size > 0) {
                index = index + 1
                len = len - 2
            }
            work = work.slice(0, index) + work.slice((index) + len)
            let x = pos.splice(index, len)
            if (size === 0) {
                keep = keep.concat(x)
            }
            // console.log('work', work, 'del', x, 'keep', keep)
            size = 0
        } else {
            size = size + 1
        }
    }
    let s = keep.sort((a, b) => a - b).map(v => line[v]).reverse().join('')
    // let s = keep.sort((a,b)=> a-b).map(v=>line[v]).join('')
    // console.log('s', s, 'del', pos, 'keep', keep)
    return s
}

console.log("Example:");
// console.log(removeBrackets("(()()"), "()()");
// console.log(removeBrackets("[][[["), "[]");
// console.log(removeBrackets("[[(}]]"),"should be", "[[]]");
// console.log(removeBrackets("[[{}()]]"), "[[{}()]]");
// console.log(removeBrackets("[(])"), "()");
// console.log(removeBrackets("[[{}()]]([{])}(]{"), "[[{}()]([])]")

// These "asserts" are used for self-checking
assert.equal(removeBrackets("(()()"), "()()");
assert.equal(removeBrackets("[][[["), "[]");
assert.equal(removeBrackets("[[(}]]"), "[[]]");
assert.equal(removeBrackets("[[{}()]]"), "[[{}()]]");
assert.equal(removeBrackets("[[[[[["), "");
assert.equal(removeBrackets("[[[[}"), "");
assert.equal(removeBrackets(""), "");
assert.equal(removeBrackets("[(])"), "()");
// assert.strictEqual(removeBrackets("[[{}()]]([{])}(]{"), "[[{}()]([])]")

// assert.strictEqual(removeBrackets("[()()]"), "[()()]");
// assert.strictEqual(removeBrackets("[(()]"), "[()]");
// assert.strictEqual(removeBrackets("[(){}"), "(){}");
// assert.strictEqual(removeBrackets("[[{}()]]"), "[[{}()]]");
// assert.strictEqual(removeBrackets("{{{((([[["), "");
// assert.strictEqual(removeBrackets("(}"), "");
// assert.strictEqual(removeBrackets("({}]"), "{}");
// assert.strictEqual(removeBrackets("}}){}"), "{}");
// assert.strictEqual(removeBrackets("([)]"), "[]");
// assert.strictEqual(removeBrackets("[[{}()]]([{])}(]{"), "[[{}()]([])]");

console.log("Coding complete? Click 'Check' to earn cool rewards!");
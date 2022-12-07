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

function removeBrackets(line: string): string {
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
                    console.log('push bad', i ,q, r)
                }
            } else {
                r.push(i)
                console.log('rem', i,q, r)
            }
        } else {
            q.push(i)
            console.log('push', i, 'q', q)
        }
    }
    let x = q.concat(r).sort()
    console.log('end', line, x)
    let ans = line.split('')
    for(let i = x.length - 1; i>-1; i--) {
        ans.splice(x[i],1)
    }
    return ans.join('');
}

console.log("Example:");
// console.log(removeBrackets("(()()"), "()()");
// console.log(removeBrackets("[][[["), "[]");
console.log(removeBrackets("[[(}]]"), "[[]]");
// console.log(removeBrackets("[[{}()]]"), "[[{}()]]");
// console.log(removeBrackets("[(])"), "()");

// These "asserts" are used for self-checking
// assert.equal(removeBrackets("(()()"), "()()");
// assert.equal(removeBrackets("[][[["), "[]");
// assert.equal(removeBrackets("[[(}]]"), "[[]]");
// assert.equal(removeBrackets("[[{}()]]"), "[[{}()]]");
// assert.equal(removeBrackets("[[[[[["), "");
// assert.equal(removeBrackets("[[[[}"), "");
// assert.equal(removeBrackets(""), "");
// assert.equal(removeBrackets("[(])"), "()");

console.log("Coding complete? Click 'Check' to earn cool rewards!");
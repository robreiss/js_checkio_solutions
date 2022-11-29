#!/usr/bin/env checkio --domain=js run what-is-wrong-with-this-family

// Michael always knew that there was something wrong with his family. Many strangers were introduced to him as part of it.
// 
// Michael should figure this out. He's spent almost a month parsing the family archives. He has all father-son connections of his entire family collected in one place.
// 
// With all that data Michael can easily understand who the strangers are. Or maybe the only stranger in this family is Michael? Let's see.
// 
// You have a list of family ties between father and son. Each element on this list has two elements. The first is the father's name, the second is the son's name. All names in the family are unique. Check if the family tree is correct. There are no strangers in the family tree. All connections in the family are natural.
// 
// Input:An array of arrays. Each element has two strings.    The array has at least one element
// 
// Output:Bool. Is the family tree correct.
// 
// 
// 
// 
// Precondition:1 <= len(tree) < 100
// 
// 
// END_DESC

import assert from "assert";

function isFamily2(tree: [string, string][]): boolean {
    let son: string[] = []
    let father: string[] = []
    father.push(tree[0][0])
    son.push(tree[0][1])
    for (let i = 1; i < tree.length; i++) {
        if (tree[i][1] == tree[i][0]) {
            return false
        }
        if (son.indexOf(tree[i][1]) > -1) {
            return false
        } else {
            son.push(tree[i][1])
        }
    }
    for (let i = 1; i < tree.length; i++) {
        if (father.indexOf(tree[i][0]) == -1 && son.indexOf(tree[i][0]) == -1) {
            return false
        }
        if (father.indexOf(tree[i][0]) > -1 && son.indexOf(tree[i][0]) > -1) {
            return false
        }
        if (father.indexOf(tree[i][0]) == -1 && son.indexOf(tree[i][0]) > -1) {
            father.push(tree[i][0])
        }
    }
    for (let i = 1; i < tree.length; i++) {
        if (father.indexOf(tree[i][1]) > -1 && son.indexOf(tree[i][0]) > -1) {
            return false
        }
    }
    // console.log(son)
    // console.log(father)
    return true;
}
class node {
    name: string
    sons: node[]

    constructor(name: string) {
        this.name = name;
        this.sons = []
    }

    findNode(searchName: string): node|undefined {
        if (this.name == searchName) {
            return this
        } else {
            for (let s of this.sons) {
                return s.findNode(searchName)
            }
        }
        return undefined
    }
    
    addSon(father: string, son: string): boolean {
        console.log(this.name, father, son)
        let sonnode = new node(son)
        if (this.name == son) {
            return false
        }
        if (this.name == father) {
            this.sons.push(sonnode)
            return true
        } else {
            for (let c of this.sons) {
                if (c.name == father) {
                    c.sons.push(sonnode)
                    return true
                } else {
                    return c.addSon(father, son)
                }
            }
        }
        return false
    }

    addFather(father: string, sonnode: node): node {
        let fathernode = new node(father)
        fathernode.sons.push(sonnode)
        return fathernode
    }

    flatten(names: string[]) {
        names.push(this.name)
        for (let c of this.sons) {
            c.flatten(names)
        }
    }

    printTree(tab: string) {
        console.log(tab + this.name)
        for (let c of this.sons) {
            c.printTree(tab + "   ")
        }
    }
}

function containsDuplicates(array: string[]) {
    if (array.length !== new Set(array).size) {
        return true;
    }

    return false;
}

function isFamily(tree: [string, string][]): boolean {
    let root: node = new node(tree[0][0])
    root.addSon(tree[0][0], tree[0][1])

    for (let i = 1; i < tree.length; i++) {
        // if the child is the root father add to front
        if (root.name == tree[i][1]) {
            root = root.addFather(tree[i][0], root)
        } else {
            if (!root.addSon(tree[i][0], tree[i][1])) {
                root.printTree("")
                return false
            }
        }
    }
    let names: string[] = []
    root.flatten(names)
    if (containsDuplicates(names)) {
        return false
    }
    root.printTree("")
    return true
}

console.log("Example:");
console.log(
    isFamily([
        // ["Logan", "Mike"], 
        // ["Alexander", "Jack"], 
        // ["Jack", "Logan"]

        // ["Logan", "William"],
        // ["Logan", "Jack"],
        // ["Mike", "Alexander"],

        ["Logan", "William"],
        ["Logan", "Jack"],
        ["Jack", "Alexander"],
    ]))

// These "asserts" are used for self-checking
if (false) {
    assert.strictEqual(isFamily([["Logan", "Mike"]]), true);
    assert.strictEqual(
        isFamily([
            ["Logan", "Mike"],
            ["Logan", "Jack"],
        ]),
        true
    );
    assert.strictEqual(
        isFamily([
            ["Logan", "Mike"],
            ["Logan", "Jack"],
            ["Mike", "Alexander"],
        ]),
        true
    );
    assert.strictEqual(
        isFamily([
            ["Logan", "Mike"],
            ["Logan", "Jack"],
            ["Mike", "Logan"],
        ]),
        false
    );
    assert.strictEqual(
        isFamily([
            ["Logan", "Mike"],
            ["Logan", "Jack"],
            ["Mike", "Jack"],
        ]),
        false
    );
    assert.strictEqual(
        isFamily([
            ["Logan", "William"],
            ["Logan", "Jack"],
            ["Mike", "Alexander"],
        ]),
        false
    );
    assert.strictEqual(
        isFamily([
            ["Jack", "Mike"],
            ["Logan", "Mike"],
            ["Logan", "Jack"],
        ]),
        false
    );
    assert.strictEqual(
        isFamily([
            ["Logan", "William"],
            ["Logan", "Jack"],
            ["Mike", "Alexander"]
        ]), false);
}
console.log("Coding complete? Click 'Check Solution' to earn rewards!");
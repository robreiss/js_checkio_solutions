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

class node {
    name: string
    sons: node[]

    constructor(name: string) {
        this.name = name;
        this.sons = []
    }

    findNode(searchName: string): node | undefined {
        if (this.name == searchName) {
            return this
        } else {
            for (let s of this.sons) {
                let n = s.findNode(searchName)
                if (n) {
                    return n
                }
            }
        }
        return undefined
    }

    addNode(father: string, son: string): node | undefined {
        if (this.name == son) {
            let fathernode = new node(father)
            fathernode.sons.push(this)
            return fathernode
        } else {
            let s = this.addSon(father, son)
            if (s == undefined) {
                return undefined
            } else {
                return this
            }
        }
    }

    addSon(father: string, son: string): node | undefined {
        let n = this.findNode(father)
        if (n == undefined) {
            return n
        }
        let newNode = new node(son)
        n.sons.push(newNode)
        return n
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

function addNodes(tree: string[][], root: node): { newRoot: node, isGood: boolean } {
    let notFoundList: string[][] = []
    let foundOne: boolean = false
    for (let i = 0; i < tree.length; i++) {
        // console.log('adding', tree[i][0], tree[i][1])
        let nr = root.addNode(tree[i][0], tree[i][1])
        if (nr != undefined) {
            foundOne = true
            root = nr
        } else {
            notFoundList.push(tree[i])
        }
    }
    if (!foundOne && notFoundList.length > 0) {
        return { newRoot: root, isGood: false }
    }
    if (notFoundList.length > 0) {
        return addNodes(notFoundList, root)
    }
    return { newRoot: root, isGood: true }
}

function isFamily(tree: [string, string][]): boolean {
    if (!tree || tree.length == 0) {
        return false
    }
    let root: node = new node(tree[0][0])

    let { newRoot, isGood } = addNodes(tree, root)
    if (!isGood) {
        return isGood
    }

    let names: string[] = []
    newRoot.flatten(names)
    if (containsDuplicates(names)) {
        return false
    }

    return isGood
}

console.log("Example:");
console.log(
    isFamily([
            ["Logan", "Mike"],
            ["Logan", "Jack"],
            ["Mike", "Logan"],

        // ["Logan", "Mike"],
        // ["Alexander", "Jack"],
        // ["Jack", "Logan"],

        // ["Logan", "William"],
        // ["Logan", "Jack"],
        // ["Mike", "Alexander"],

        // ["Logan", "William"],
        // ["Logan", "Jack"],
        // ["Jack", "Alexander"],
    ]))

// These "asserts" are used for self-checking
if (true) {
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
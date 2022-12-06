#!/usr/bin/env checkio --domain=js run domino-chain

// You have a Domino box. Domino tiles contain two numbers from 0 (empty) to 6. Tiles are unordered and 1-6 is the same as 6-1. The double-six set contains 28 unique tiles - all combinations of number pairs.
// 
// Several tiles fell out of the box. You should try to line up a chain from these tiles, compiling them to each other's suitable sides (sides with the same numbers). Thus, you can get a continuous chain of tiles. In some cases, such a chain will not be the only one.
// 
// For example, you've ended up these tiles:
// 1-5, 2-5, 3-5, 4-5, 3-4
// So, with them you can build two complete chains:
// 1-5, 5-3, 3-4, 4-5, 5-2
// 1-5, 5-4, 4-3, 3-5, 5-2
// 
// 
// Your goal in this missionis to count how many complete chains you can make using all of the given dominoes.
// 
// Note.Chains must be unique. An inverted chain is not considered as unique: "1-2, 2-3, 3-4, 4-5" and "5-4, 4-3, 3-2, 2-1" are the same chain.
// 
// Input:String with the description of the domino tiles. Like this one: "5-4, 4-3, 3-2, 2-1".
// 
// Output:Integer. The maximum number of complete chains that you can build using all of the given tiles.
// 
// Precondition:5<= len(given_tiles)<= 17
// 
// 
// END_DESC

import assert from "assert";

function reverse(s: string) {
    return s.split("").reverse().join("");
}

function permute(nums: string[]): string[][] {
    let result: string[][] = [];
    if (nums.length === 0) return [];
    if (nums.length === 1) {
        return [nums];
    }
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumsPermuted = permute(remainingNums);
        for (let j = 0; j < remainingNumsPermuted.length; j++) {
            let x = remainingNumsPermuted[j]
            // console.log(currentNum, x[0])
            if (x[0].indexOf(currentNum[0]) === -1
                && x[0].indexOf(currentNum[2]) === -1) {
                // console.log('continue')
                continue
            }
            let permutedArray = [currentNum].concat(x);
            result.push(permutedArray);
            permutedArray = [reverse(currentNum)].concat(x);
            result.push(permutedArray);
            if (x.length === 1) {
                permutedArray = [currentNum].concat([reverse(x[0])]);
                result.push(permutedArray);
                permutedArray = [reverse(currentNum)].concat([reverse(x[0])]);
                result.push(permutedArray);
            }
        }
    }
    return result;
}

function match(chain: number[], tile: number[]): number[][] {
    let chains: number[][] = []
    if (chain[0] === tile[0]) {
        let x = [tile[1], tile[0], ...chain]
        chains.push(x)
    }
    if (chain[0] === tile[1]) {
        let x = [tile[0], tile[1], ...chain]
        chains.push(x)
    }
    if (chain[chain.length - 1] === tile[0]) {
        let x = [...chain, tile[0], tile[1]]
        chains.push(x)
    }
    if (chain[chain.length - 1] === tile[1]) {
        let x = [...chain, tile[1], tile[0]]
        chains.push(x)
    }
    return chains
}

function dominoChainOld(line: string): number {
    let tiles = line.split(',').map(v => {
        return v.trim()
    })
    let perm = permute(tiles)
    // for (let i = 0; i < perm.length; i++) {
    //     let p = perm[i].join('').split('-')
    //     if (p[0] === '2' && p[1] === '55' && p[2] === '44') {
    //         console.log(p)

    //     }
    // }
    // return 0
    let ans: string[] = []
    for (let i = 0; i < perm.length; i++) {
        let p = perm[i].join('').split('-')
        let isGood = true
        for (let j = 1; j < p.length - 1; j++) {
            let c = p[j]
            if (c[0] !== c[1]) {
                isGood = false
                break
            }
        }
        if (isGood) {
            ans.push(p.join('-'))
        }
    }
    // ans = [...new Set(ans)]
    let seen: Set<string> = new Set()
    ans = ans.filter((item) => {
        if (seen.has(item) || seen.has(reverse(item))) {
            return false
        } else {
            seen.add(item)
            return true
        }
    })
    console.log('answer', ans)
    // console.log(perm)
    // let x = line.split(',').map(v => {
    //     return v.split('-').map(n=>Number(n))
    // })
    // let chain = x[0]
    // for(let i = 1; i< x.length; i++) {
    //     let chains = match(chain, x[i])
    //     console.log(chains.map(v=>v.join(' ')))
    //     chain = chains[0]
    // }

    return ans.length;
}

class Tile {
    left: number
    right: number

    constructor(left: number, right: number) {
        this.left = left
        this.right = right
    }

    flip(): Tile {
        return new Tile(this.right, this.left)
    }
}
class Game {
    board: Tile[]
    hand: Tile[]

    constructor(board: Tile[], hand: Tile[]) {
        this.board = board
        this.hand = hand
    }

    printtiles(set: Tile[]): string {
        let ans = ""
        for (let t of set) {
            ans += t.left + '-' + t.right + ' '
        }
        if (ans.length > 0) {
            ans = ans.slice(0, -1)
        }
        return ans
    }

    printgame() {
        console.log('board', this.printboard())
        console.log('hand', this.printhand())
    }

    printboard(): string {
        return this.printtiles(this.board)
    }

    printhand() {
        return this.printtiles(this.hand)
    }

    hash() {
        let ans = ""
        for (let t of this.board) {
            ans += t.left + t.right
        }
        return ans
    }

    same(b: Game): boolean {
        if (this.board.length != b.board.length) {
            return false
        }
        for (let i = 0; i<this.board.length; i++) {
            if (this.board[i].left !== b.board[i].left) {
                return false
            }
            if (this.board[i].right !== b.board[i].right) {
                return false
            }
        }
        return true
    }
}

function playtile(board: Tile[], tile: Tile): boolean {
    if (board.length === 0) {
        return true
    }
    if (board[board.length - 1].right === tile.left) {
        return true
    }
    return false
}

function playturn(games: Game[]): Game[] {
    let newgames: Game[] = []
    let newmap: Map<string, Game> = new Map()
    console.log('game length', games.length)
    for (let gi = 0; gi < games.length; gi++) {
        let g = games[gi]
        for (let hi = 0; hi < g.hand.length; hi++) {
            let tile = g.hand[hi]
            for (let ti = 0; ti < 2; ti++) {
                if (playtile(g.board, tile)) {
                    let newboard = [...g.board, tile]
                    let newhand = [...g.hand]
                    newhand.splice(hi, 1)
                    let newgame = new Game(newboard, newhand)
                    // newgames.push(newgame)
                    newmap.set(newgame.hash(), newgame)
                }
            tile = tile.flip()
            }
        }
    }
    return newgames
}

function filtergames(games: Game[]): Game[] {
    let seen: Set<string> = new Set()
    games = games.filter((item) => {
        if (seen.has(item.printboard())) {
            return false
        } else {
            seen.add(item.printboard())
            return true
        }
    })
    return games
}

function uniquegames(games: Game[]): Game[] {
    let seen: Set<string> = new Set()
    games = games.filter((item) => {
        if (seen.has(item.printboard()) || seen.has(reverse(item.printboard()))) {
            return false
        } else {
            seen.add(item.printboard())
            return true
        }
    })
    return games
}

function dominoChain(line: string): number {
    let tiles = line.split(',').map(v => {
        v = v.trim()
        return new Tile(Number(v[0]), Number(v[2]))
    })
    let b: Tile[] = []
    let h = tiles
    let g = new Game(b, h)
    let games: Game[] = []
    games.push(g)

    while (games.length > 0 && games[0].hand.length > 0) {
        games = playturn(games)
    }

    games = uniquegames(games)

    for (let game of games) {
        game.printgame()
    }

    return games.length
}

console.log('Example:');
// console.log(dominoChain('0-2, 0-5, 1-5, 1-3, 5-5'));
// console.log(dominoChain('5-5, 1-5, 1-3, 0-5, 0-2'));
// console.log(dominoChain('0-2, 0-5, 1-5, 0-3, 5-5'));
// console.log(dominoChain('1-5, 2-5, 3-5, 4-5, 3-4'), 2);
// console.log(dominoChain('1-5, 2-5, 2-3'), 2);
// console.log(dominoChain('0-5, 1-5, 2-5, 3-5, 4-5, 3-4'), 0)
// console.log(dominoChain('0-1, 0-2, 1-3, 1-2, 3-4, 2-4, 3-0'), 0);
// console.log(dominoChain('0-1, 0-2, 1-3, 1-2, 3-4, 2-4, 3-0, 0-4'), 0);
// console.log(dominoChain('0-0, 4-6, 5-6, 1-4, 0-6, 0-5, 1-6, 0-4, 2-2, 0-3, 3-4'))
console.log(dominoChain('1-2, 0-1, 2-6, 0-0, 5-5, 6-6, 5-6, 4-4, 0-6, 1-5, 1-1, 1-6, 0-5, 3-6, 0-4, 2-5, 2-4'))
// These "asserts" are used for self-checking
// assert.equal(dominoChain('0-2, 0-5, 1-5, 1-3, 5-5'), 1);
// assert.equal(dominoChain('1-5, 2-5, 3-5, 4-5, 3-4'), 2);
// assert.equal(dominoChain('0-5, 1-5, 2-5, 3-5, 4-5, 3-4'), 0);
// assert.equal(dominoChain('0-1, 0-2, 1-3, 1-2, 3-4, 2-4'), 6);
// assert.equal(dominoChain('0-1, 0-2, 1-3, 1-2, 3-4, 2-4, 3-0, 0-4'), 0);
// assert.equal(dominoChain('1-2, 2-2, 2-3, 3-3, 3-1'), 5);
// assert.equal(dominoChain('1-4, 3-4, 0-4, 0-5, 4-5, 2-4, 2-5'), 0);
// assert.equal(dominoChain('1-4, 1-5, 0-2, 1-6, 4-6, 4-5, 5-6'), 0);
// assert.equal(dominoChain('1-2, 2-3, 2-4, 3-4, 2-5, 2-6, 5-6'), 8);
// assert.equal(dominoChain('1-2, 2-3, 3-1, 4-5, 5-6, 6-4'), 0);
// assert.equal(dominoChain('1-2, 1-4, 1-5, 1-6, 1-1, 2-5, 4-6'), 28);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
#!/usr/bin/env checkio --domain=js run spaceship-landing-strip

// "Wow! That was a terrible landing!" Stephen was the first one to break the silence after the ship descended.
// 
// "Who set up the landing vector?" asked Sofia as she emerged from a heap of cables and shook ashes off herself.        "Who borks it that badly? I bet that was the Ship's last landing ever!"
// 
// "I’m doing a systems check right now." said Nikola, brushing off Sofias comment. At the computer, typing away furiously, Nikola had this        infamousdo not disturb melook on his face. It seemed as though there were no computational errors.
// 
// “Well we’ve got loads of opportunity for adventure here!” Sofia said, making the best of a bad situation.
// 
// "Sofia, I beg you... don’t tell me what a great opportunity this is. The trip has already gotten off to the WORST possible        start." Stephen responded tersely.
// 
// "Fine..."
// 
// "Geez, now I understand why expeditions to these lands happen so rarely…"
// 
// "It won't take off." Nikola announced, banging the console with his fist.
// 
// "What? The ship is fine! We can just fix the damage and continue on our journey," Sofia started hopefully.
// 
// "It’s not going to work. The engine is pretty well toasted and we don’t have the necessary parts to fix it."
// 
// "Awesome...” Stephen said, his voice dripping with sarcasm. “So now we're stuck here for the rest of eternity        until we all bluescreen in the cold."
// 
// "Stephen, calm down," interrupted Sofia. "Is everything fine with the communications array? Can we call for        help?"
// 
// "It’s only working one way... we can only send data," Nikola started saying slowly as he tested something on the        computer. "We can't receive any data, so the receiver must be broken. I'll set the transmitter to continuously        send out a mayday signal."
// 
// "Okay, let’s do that. Now, in order to be saved from this frozen... place, we’ll need to carve up a landing site.     We can't have our potential resucuers crash and burn too."
// 
// "I'm already scanning the area and making a map to calculate the best place for them to land," Nikola said        agreeing to Sofia’s proposition.
// 
// "Great! And I get to clear out the landing area, right?" said Stephen then paused. "Just in advance, I want to        say that even though I am a handyman, I cannot move mountains or change the flow of rivers."
// 
// "I suppose we should take that into consideration... Now let's write a calculation module."
// 
// "Yeah, good idea. For now we can settle into this Rossum forsaken place."
// 
// The Robots have discovered a new island and accidentally crashed on it.    Tо survive, they need to create the largest rectangular field possible to make a landing strip.    While surveying the land, they encountered a number of obstacles which they marked on their map.    Each square of the map is marked according to whether it contains grass (G), rock (R), water (W), shrubs (S), or trees (T).    While the grass can be mowed and the shrubs can be dug from the ground,    the water, rocks, and trees cannot be removed with the tools at their disposal.    Given these obstacles, they need your help to determine the area of the largest possible rectangular field.
// 
// The island map is represented as a list of strings.    Each string contains letter characters which indicate the conditions for each square of land (G, R, W, S, or T).    The map is rectangular.
// 
// 
// 
// Input:An island map as a array of strings.
// 
// Output:The maximum area of the largest possible rectangle that can be cleared as an integer.
// 
// Precondition:
// 0 < len(landing_map) < 10
// all(0 < len(row) < 10 for row in landing_map)
// 
// 
// END_DESC

import assert from "assert";

function maxArea(area: string[], xstart: number, ystart:number) {
    let ymax: number = area.length
    let xmax: number = area[0].length

    let maxsize = 0

    let ycount = 1
    let xt = xmax
    for (let y = ystart; y < ymax; y++) {
        let xcount = 0
        for (let x = xstart; x < xmax; x++) {
            // console.log(area[y][x])
            if (area[y][x] == 'G') {
                xcount++
            } else {
                break
            }
        }
        if (xcount == 0) {
            break
        }
        if (xcount < xt) {
            xt = xcount
        }
        // console.log('size: ', xt * ycount)
        maxsize = xt * ycount > maxsize ? xt * ycount : maxsize
        ycount++
    }
    return maxsize;
}

function landingArea(area: string[]): number {
    // quick standardize letters
    for (let i = 0; i < area.length; i++) {
        area[i] = area[i].replace(/S/g, 'G')
        area[i] = area[i].replace(/R/g, 'T')
        area[i] = area[i].replace(/W/g, 'T')
    }
    let ymax: number = area.length
    let xmax: number = area[0].length

    let maxsize = 0
    for (let y = 0; y < ymax; y++) {
        for (let x = 0; x < xmax; x++) {
            let next = maxArea(area, x, y)
            maxsize = next > maxsize ? next : maxsize
        }
    }
    return maxsize
}

console.log('Example:');
// console.log(landingArea(['G']), 1);
// console.log(landingArea(['GS', 'GS']), " = 4")
// console.log(landingArea(['GT', 'SR']), " = 2")
console.log(landingArea(['GSWGG', 'SGRST', 'WGSRS', 'RSSST']), 4)

if (true) {
    // These "asserts" are used for self-checking
    assert.equal(landingArea(['G']), 1);
    assert.equal(landingArea(['GS', 'GS']), 4);
    assert.equal(landingArea(['GT', 'GG']), 2);
    assert.equal(landingArea(['GGTGG',
        'TGGGG',
        'GSSGT',
        'GGGGT',
        'GWGGG',
        'RGTRT',
        'RTGWT',
        'WTWGR']), 9);
    assert.equal(landingArea(['GSWGG', 'SGRST', 'WGSRS', 'RSSST']), 4);
    assert.equal(landingArea(['GSWGG',
        'SGRST',
        'WGSRS',
        'RSSST',
        'RGTWW']), 5);
    assert.equal(landingArea(['GSGSS',
        'GWSRS',
        'SWSTG',
        'GGSGG',
        'GGSGG']), 10);
    assert.equal(landingArea(['GWGWS',
        'RSRGR',
        'TTTTT',
        'TGGGT',
        'TGGGT']), 6);
    assert.equal(landingArea(['GGGGGG',
        'GGGGGG',
        'SSSSSS',
        'SSSSSS',
        'GGGGGG',
        'GGGGGG']), 36);
    assert.equal(landingArea(['RRRRRRR',
        'RGGGGGR',
        'RGSSSGR',
        'RGSSSGR',
        'RGSSSGR',
        'RGGGGGR',
        'RRRRRRR']), 25);
}
console.log("Coding complete? Click 'Check' to earn cool rewards!");
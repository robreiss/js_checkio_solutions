#!/usr/bin/env checkio --domain=js run birthday-party

import assert from "assert";

function getNextDayOfTheWeek(dayName: string, excludeTodayX:boolean = true, refDate: Date = new Date()): Date {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    let ans = new Date(refDate)
    // ans.setHours(0,0,0,0);
    let excludeToday = 0
    ans.setDate(ans.getDate() +  
                    (dayOfWeek + 7 - ans.getDay()) % 7);
    return ans;
}

function birthdayParty(birthday: Date): Date {
    let dsat = getNextDayOfTheWeek('sat', false, birthday)
    let dsun = getNextDayOfTheWeek('sun', false, birthday)

    if (dsat < dsun) {
        return dsat
    } else {
        return dsun
    }
}

console.log("Example:");
// console.log(birthdayParty(new Date(2022, 1, 5)));
console.log(
    birthdayParty(new Date(2022, 3, 17)),
    new Date(2022, 3, 17)
);

// These "asserts" are used for self-checking
assert.deepStrictEqual(
    birthdayParty(new Date(2022, 0, 5)),
    new Date(2022, 0, 8)
);
assert.deepStrictEqual(
    birthdayParty(new Date(2022, 1, 21)),
    new Date(2022, 1, 26)
);
assert.deepStrictEqual(
    birthdayParty(new Date(2022, 2, 26)),
    new Date(2022, 2, 26)
);
assert.deepStrictEqual(
    birthdayParty(new Date(2022, 3, 17)),
    new Date(2022, 3, 17)
);
assert.deepStrictEqual(
    birthdayParty(new Date(2022, 2, 30)),
    new Date(2022, 3, 2)
);

console.log("Coding complete? Click 'Check' to earn cool rewards!");
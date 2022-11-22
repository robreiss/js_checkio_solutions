#!/usr/bin/env checkio --domain=js run sort-by-extension

// You are given an array of files. You need to sort this list by the file extension.     The files with the same extension (or without one) should be sorted by name.
// 
// Some possible cases:
// 
// Filename cannot be an empty string;Sorting order: files without name, files without extension, files with name and extension;Filename ".config" or "config." is all name with an empty extension;Filename like "str1.str2.str3" has an extension "str3" and a name "str1.str2";Filename like ".str1.str2" has an extension "str2" and a name ".str1".Input:Array of strings.
// 
// Output:Array of strings.
// 
// 
// END_DESC

import assert from "assert";

function sortByName(a: string, b: string): number {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

function filesToNameAndExtension(files: string[]): [string, string][] {
    return files.map((file) => {
        if (file == ".config" || file == "config.") {
            return [file, ""];
        }
        let parts = file.split(".");
        if (parts.length == 1) {
            return [parts[0], ""];
        }
        let name = parts.slice(0, -1).join(".");
        let extension = "." + parts[parts.length - 1];
        return [name, extension];
    });
}

function sortByExt(files: string[]): string[] {
    let nameAndExtension = filesToNameAndExtension(files);
    nameAndExtension.sort((a, b) => {
        if (a[0] == "" && b[0] != "") {
            return -1;
        }
        if (a[0] != "" && b[0] == "") {
            return 1;
        }
        if (a[1] == "" && b[1] != "") {
            return -1;
        }
        if (a[1] != "" && b[1] == "") {
            return 1;
        }
        if (a[1] == "" && b[1] == "") {
            return sortByName(a[0], b[0]);
        }
        if (a[1] != "" && b[1] != "") { 
            if (a[1] == b[1]) {
                return sortByName(a[0], b[0]);
            }
            return sortByName(a[1], b[1]);
        }
        return 0;
    });
    return nameAndExtension.map((ne) => ne.join(""));
}

console.log("Example:");
// console.log(JSON.stringify(sortByExt(["1.cad", "1.bat", "1.aa"])));
console.log(JSON.stringify(sortByExt(["1.cad", ".config", ".doc.cc", "1.bat", "sally", ".cat", "doc", "1.aa", ".bat", "1.bat.bat", "1.aa.doc", "after.", "config."])));

// These "asserts" are used for self-checking
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", "1.aa"]), [
    "1.aa",
    "1.bat",
    "1.cad",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", "1.aa", "2.bat"]), [
    "1.aa",
    "1.bat",
    "2.bat",
    "1.cad",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", "sally", "doc", "1.aa", ".bat"]), [
    ".bat",
    "doc",
    "sally",
    "1.aa",
    "1.bat",
    "1.cad",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", ".aa", ".bat"]), [
    ".aa",
    ".bat",
    "1.bat",
    "1.cad",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.", "1.aa"]), [
    "1.",
    "1.aa",
    "1.cad",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", "1.aa", "1.aa.doc"]), [
    "1.aa",
    "1.bat",
    "1.cad",
    "1.aa.doc",
]);
assert.deepStrictEqual(sortByExt(["1.cad", "1.bat", "1.aa", ".aa.doc"]), [
    "1.aa",
    "1.bat",
    "1.cad",
    ".aa.doc",
]);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
const each = require('jest-each').default;
const {getBigger, getSmallest, countValue} = require("./numberFunctions.js");

describe("getBigger", () => {

    it("Exists", () => {
        expect(getBigger).toBeDefined();
    })

    it("Is a function", () => {
        expect(getBigger instanceof Function).toEqual(true);
    })

    it("Returns a number when passed two numbers", () => {
        expect(typeof getBigger(1, 1) == "number").toEqual(true);
    })

    each([
        [1, 1, 0],
        [1000, 3, 1000],
        [0, 0, 0],
        [5, 3, 5],
        [-10, -15, -10]
    ]).test(`Returns %s when passed %s and %s`, (expected, a, b) => {
        expect(getBigger(a, b)).toBe(expected);
    })

})

describe("getSmallest", () => {

    it("Exists", () => {
        expect(getSmallest).toBeDefined();
    })

    it("Is a function", () => {
        expect(getSmallest instanceof Function).toEqual(true);
    })

    it("Returns a number when passed an array of numbers", () => {
        expect(typeof getSmallest([1, 2, 3]) == "number").toEqual(true);
    })

    it("Returns null when passed an empty array", () => {
        expect(getSmallest([])).toBe(null);
    })

    each([
        [0, [0, 0, 0]],
        [1, [1, 2, 3]],
        [-100, [-1, -10, -100]],
        [null, []],
        [500, [1000, 500, 900]],
        [-2, [-1, 0, -2]]
    ]).test(`Returns %s when passed %s`, (expected, arr) => {
        expect(getSmallest(arr)).toBe(expected);
    })

})

describe("countValue", () => {

    it("Exists", () => {
        expect(countValue).toBeDefined();
    })

    it("Is a function", () => {
        expect(countValue instanceof Function).toEqual(true);
    })

    it("Returns a number when passed an array and a value", () => {
        expect(typeof countValue([1], 1) == "number").toEqual(true);
    })

    it("Returns zero when passed an empty array and a value", () => {
        expect(countValue([], 1)).toEqual(0);
    })

    it("Returns null when passed an array only", () => {
        expect(countValue([1, 2, 3])).toEqual(null);
    })

    each([
        [1, [0, 1, 2], 0],
        [3, [1, 1, 1, 2], 1],
        [0, [2, 3, 1], 4],
        [6, [3, 3, 3, 3, 3, 3], 3],
        [0, [1000, 1000, 1000], -1000]
    ]).test(`Returns %s when passed %s and %s`, (expected, arr, target) => {
        expect(countValue(arr, target)).toBe(expected);
    })

})
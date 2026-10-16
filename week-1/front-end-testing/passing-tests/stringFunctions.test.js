
const each = require('jest-each').default;
const { getLonger, greet, isSubstring } = require("./stringFunctions.js");

describe("getLonger", () => {

    it("Exists", () => {
        expect(getLonger).toBeDefined();
    })

    it("Is a function", () => {
        expect(getLonger instanceof Function).toEqual(true);
    })

    it("Throws an error when passed no values", () => {
        expect(() => getLonger()).toThrow("This function requires two arguments!");
    })

    it("Throws an error when passed only one value", () => {
        expect(() => getLonger("red")).toThrow("This function requires two arguments!");
    })

    it("Throws an error when passed non-string arguments", () => {
        expect(() => getLonger(3, 6)).toThrow("Arguments must be strings!");
    })

    it("Throws an error when passed one non-string argument", () => {
        expect(() => getLonger(3, "blue")).toThrow("Arguments must be strings!");
    })

    each([
        ["a", "a", ""],
        ["", "", ""],
        ["blue", "red", "blue"],
        ["green", "green", "blue"],
        ["hopscotch", "hopscotch", "I"]
    ]).test(`Returns %s when passed %s and %s`, (expected, a, b) => {
        expect(getLonger(a, b)).toBe(expected);
    })

})

describe("greet", () => {

    it("Exists", () => {
        expect(greet).toBeDefined();
    })

    it("Is a function", () => {
        expect(greet instanceof Function).toEqual(true);
    })

    it("Returns 'Hi!' when called with no arguments", () => {
        expect(greet()).toBe("Hi!");
    })

    it("Returns 'Hi!' when called with an empty string", () => {
        expect(greet("")).toBe("Hi!");
    })

    each([
        ["Hello, Julia!", "Julia"],
        ["Hello, 2!", 2],
        ["Hello, Norman!", "Norman"],
        ["Hello, Bernadette D'Anjou!", "Bernadette D'Anjou"],
        ["Hello, X!", "X"],
    ]).test(`Returns %s when passed %s`, (expected, name) => {
        expect(greet(name)).toBe(expected);
    })

})
/*
describe("isSubstring", () => {

    it("Exists", () => {
        expect(isSubstring).toBeDefined();
    })

    it("Is a function", () => {
        expect(isSubstring instanceof Function).toEqual(true);
    })

    it("Throws an error when passed no values", () => {
        expect(() => isSubstring()).toThrow("This function requires two arguments!");
    })

    it("Throws an error when passed only one value", () => {
        expect(() => isSubstring("red")).toThrow("This function requires two arguments!");
    })

    it("Throws an error when passed non-string arguments", () => {
        expect(() => isSubstring(3, 6)).toThrow("Arguments must be strings!");
    })

    it("Throws an error when passed one non-string argument", () => {
        expect(() => isSubstring(3, "blue")).toThrow("Arguments must be strings!");
    })

    it("Throws an error when passed empty strings", () => {
        expect(() => isSubstring("", "")).toThrow("Arguments must have a length greater than zero!");
    })

    each([
        [true, "catapult", "cat"],
        [false, "catapult", "dog"],
        [true, "emptiness", "ess"],
        [false, "green", "blue"],
        [true, "hopscotch", "sco"]
    ]).test(`Returns %s when passed %s and %s`, (expected, a, b) => {
        expect(isSubstring(a, b)).toBe(expected);
    })
}) 
*/ 
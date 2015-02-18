// Appending A: Awful Parts
// Stuff that can't be easily avoided and to be aware of.
//
// Global Variables
// Three ways to make global vars -
// 1. Declare using var keyword outside any function.
// 2. Attach property to global object. In browser this is window and in nodejs
// it is global.
// 3. Use a var without declaring it. !! Called implied global this is horrible!
//
// Scope
// JS is a C like language in terms of syntax i.e it has blocks but no block
// scope which is a source of confusion. So declare vars at beginning of
// function not at point of first use to avoid overwriting already used
// var. However I wonder if using this strategy will lead to using undeclared
// var by mistake creating a global var.
//
// Semicolon Insertion
// If you leave out semicolons then JS will try to add them often with
// misleading consequences. For example:
// return
// {
//   status: true
// };
// Will result in return of undefined because a ; will be added on line of
// return statement. Avoid statements without semicolons!
//
// Reserved Words
// Woah lots of words reserved even though they aren't used. Can use reserved
// words as object properties if they are quoted i.e
// { 'case': true } is OK but { case: true } is not.
// Flycheck + JSlint can keep that in check.
//
// Unicode
// JS can handle only the basic Unicode chars. The extended set is represented
// as a pair of chars. Unicode sees them as one but JS sees them as
// separate. More info: https://mathiasbynens.be/notes/javascript-unicode
//
// typeof
// > typeof null
// 'object'
//
// Use obj && typeof obj === 'object' to check is obj is actually an object and
// not null.
//
// parseInt
// Converts string to integer. It stops when it encounters non numeric
// text. Also parseInt takes a second arg for specifying radix. ALWAYS PASS IT
// IN!
//
// +
// Wow this operator is messed up. Different behavior depending on type of
// args. Best to make sure both args are numbers if performing addition.
//
// Floating Point
// Ugh I know little about floating point numbers. Apparently JS uses binary
// floating point spec. Which is not so good at floating point math but very
// good at integer math. So for example convert paise to integer by multiplying
// with 100 and perform addition/subtraction and then divide by 100.
//
// NaN
// Part of IEEE 754 (binary floating point spec). Stands for Not a Number.
// typeof NaN
// > 'number'
// Hmm. Other oddities:
// NaN === NaN
// > false
// NaN !== NaN
// > true
// Use isNaN() method
// To actually check if a value is a number you could use isFinite() which
// rejects NaN and undefined but it converts value to number so you'll get
// strings too. Use typeof number and isFinite together.

var isNumber = function (n) {
    return typeof n === 'number' && isFinite(n);
};

// Phone Arrays
// Beware of JS Arrays they are objects in disguise. Also arguments obj inside
// functions are objects with length property they lack the methods Arrays
// have. So no map, reduce etc. We've already seen this while doing the
// Exercism.io JS problems. Testing for Array is also not straight forward since
// typeof reports them as objects. The book has a method that takes care of the
// oddities hopefully I'll always use a lib.
//
// Falsy Values
// 0, '', NaN, false, null and undefined are all falsy. Remember!
//
// hasOwnProperty
// Crockford says it's a member of the object prototype chain so can be
// overriden but we can always use Object.prototype.hasOwnProperty using
// apply/call. So I don't think this is a big deal? Although having it as an
// operator would have been awesome.
//
// Object
// They are not truly empty since they inherit from
// Object.prototype. Encountered this while doing an Exercism.io word-count
// https://github.com/rohit/exercism/
// It's the same example used by Crockford. I got around the problem by checking
// if the property is a number and storing 1 if it's not thus overriding any
// inherited methods/properties. However we can use Object.create(null) which
// is trully empty since it doesn't inherit from anything. Jasmine lacked
// support for using them in assert_equal although I provided a patch to fix
// this.

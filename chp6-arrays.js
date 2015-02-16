var util = require('./util.js');

// Chapter 6: Arrays
// JS doesn't have C like arrays. Instead it provides an Object with an array
// like API. The Array like object converts number indices to string so that
// they can be used as keys. So a value of an array is stored as the value of a
// property that is the string representation of number index. Hmm.
//
// JS also provides Array literal notation to make creating arrays
// easier. Array objects also have lots of useful functions built in like
// reduce, map and forEach.

var numbers = ['zero', 'one', 'two', 'three', 'four', 'five'];
var numbers_obj = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five'
};

// Both numbers and numbers_obj are objects with same properties and values BUT
// numbers inherits from Array.prototype and hence has the usefull Array methods
// and length property while numbers_obj does not.
// The postfix [] operators converts it's expression into a string using the
// expressions toString method.

// Array Length
// Array objects have length property that is largest integer property name plus
// one. Which is not necessarily the number of properties in the Array.

var has_one = [1];
has_one[10000] = 2;
console.log(has_one.length); // 10001

// If the expression to [] operator is an integer like string greater than or
// equal to current length then the length property is set to one plus this new
// expression.

// Length can be set manually. Setting larger then current length will not
// allocate more space. Setting a length less than current length will delete
// elements with property names equal or greater than new length.

var has_three = [1,2,3,5,6,7];
has_three.length = 3;
console.log(has_three); // [ 1, 2, 3 ]

// JS Arrays are objects so you can use delete operator to remove elements
// however it leaves a hole since the elements surrounding the deleted element
// retain their property names.
// Array provides splice method to do this. First arg is starting index, second
// argument is number of elements to delete and any remaining arguments are
// added to array at that point.

numbers.splice(2, 1);
console.log(numbers); // [ 'zero', 'one', 'three', 'four', 'five' ]

// Enumeration
// for..in operator can be used but does not guarantee order of elements and can
// bring in elements from the prototype chain. Using a normal for loop wll work
// as expected.

// Confusion
// Don't use an Obj instead of Array Obj and vice versa!
// JS typeof operator returns object for array obj which is not helpful.
// Writing your own isArray function requires a bit of work to deal with other
// window or frame.

var isArray = function (value) {
    return value &&
        typeof value === 'object' &&
        value.constructor === Array;
};

// This does not take care of other frame or window. Refer to book for extra
// steps.

// Can add methods to Array.prototype. Can also add methods directly to
// individual array objects. Since method names are not numbers this won't
// affect the length property.

var f1 = function () { console.log('I\'m function 1'); console.log(this); };
var f2 = function () { console.log('I\'m function 2'); };

var f_array = [f1, f2];
f_array.f3 = function () { console.log('I\'m function 3'); console.log(this); };

// NOTE: Calling f_array[0]() and f_array.f3() both set this inside function to
// f_array.

// JS doesn't provide built in methods to initialize an array to some initial
// value. It is also missing matrices but you can use array of arrays to have
// some matrices. Again initializing one has to be done manually. You can of
// course write helper functions to do this for you.

// Functions are the fundamental modular unit of JS. Used for information
// hiding, code reuse, composition and specify behaviour of objects.

// Functions in JS are objects! Objects are collections of key-value pairs
// and have a hidden link to a prototype object from which it inherits
// properties. Objects created using the literal notation are linked to
// Object.prototype while function Objects are linked to Function.prototype.
// Note: Function.prototype is linked to Object.prototype.

// Every function has two additional hidden properties: the context of the
// function (#prog-lang MUPL intepreter) and the code that implements the
// functions behavior.

// Every function object has a prototype property. It's value is an object
// with a constructor property whose value is the function. This is distinct
// from the hidden link to Function.prototype object. Ah this distinction took
// some time to figure out while reading MDN JS docs.
// Note: The meaning of this structure will be explained in next chapter AND
// Crockford called it convoluted! I'm not the only one!

// Since functions are objects they can be stored in variables, passed to a
// function as argument or returned from a function. They can also be stored
// in arrays and objects.
//?Interesting functions can also have methods! What's the use of this?

// What makes function objects special is that they can be called or invoked.

// Function objects are created using function literals. Interesting choice of
// name.

// Create a var add and store a function in it

var add = function (a, b) {
    return a + b;
};

// The name for a function is optional. Without the name the function is an
// anonymous function.

// JS has closures!

// Invoking a function passes control to the new function. The parameters are
// are passed in via declared arguments. In addition two parameters are passed
// implicitly: this and arguments.
// this is like self in Ruby! The value of this is determined by which
// invocation pattern is used. There are 4 types of invocation patterns:
// 1. Method invocation pattern
// 2. Function invocation pattern
// 3. Constructor invocation pattern
// 4. Apply invocation pattern

// Invocation operator is () which follows any expression that produces a
// function value. No type checking on parametrs and arguments. Number of
// parameters and arguments need not match. If greater then extra are
// ignored and fewer then missing arguments are set to undefined.

// 1. Method invocation pattern
// When a function is stored as a property of an object it is called a method.
// When the method is invoked, this is bound to the object. If invocation
// expression contains refinement (. or []) then function is invoked as a
// method.
// example:

var myObject = {
    value: 0,
    increment: function (n) {
        this.value += (typeof n) === 'number' ? n : 1;
    }
};

console.log(myObject.value); // 0
myObject.increment();
console.log(myObject.value); // 1
myObject.increment(2);
console.log(myObject.value); // 3

// 2. Function invocation pattern
// When a function is not the property of an object it is invoked as a
// function.
var sum = add(3, 5); // 8

//!When a function is invoked using this pattern, this is bound to the global
// object. This is also true for inner functions. Although the inner function
// captures the environment it does not capture this. So it cannot be used
// as a helper function to do some work by the outer method since it does
// not have access to the object.
// To get around this we can save this in a var to which the inner function
// will have access. By convention such a var is named that.

myObject.double = function () {
    var that = this;

    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper();
};

myObject.double();
console.log(myObject.value); // 6

// 3. Constructor invocation pattern
// When a function is invoked using the new prefix a new object is created and
// it's hidden prototype link is set to the value of prototype property of the
// function. Also inside the function, this is bound to the new object.

var Quo = function (string) {
    this.status = string;
};

Quo.prototype.get_status = function () {
    return this.status;
};

var myQuo = new Quo('confused');
console.log(myQuo.get_status());

// Function used with the new prefix are called constructors and are capitalized
// by convention. If a constructor function is called without the new prefix
// no warnings or errors will be raised so bad things can happen like global
// state getting polluted.
// Crockford says this style is not recommended and promises better alternatives.


// 4. Apply invocation pattern
// Functions have methods, remember?! The apply method of function objects
// allows us to bind this to any object and pass in arguments as an array.
// We thus invoke the function by manually setting this and the arguments.

var array = [3, 4];
var sum = add.apply(null, array); // sum = 7

var statusObject = {
    status: 'ZOMG JavaScript!'
};

Quo.prototype.get_status.apply(statusObject);

// The second implicitly passed object to a invoked function is arguments.
// It makes available all arguments passed in the invocation including
// those arguments not assigned to parameters. This allows function to accept
// arbitrary number of arguments.

var sum = function () {
    var i,
        sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
};

console.log(sum(1,2,3,4,5)); // 15

// Note: The sum var inside the function does not interfere with the
// sum var outside. The function only sees the inner var. The inner var
// shadows the outer var.

// Also the arguments object is not a real array. It has a length property
// however lacks the functions available on arrays such as map and reduce.

// Return
// Two things two note about JS function return. If no value is explicitly
// returned then undefined is returned. When using constructor invocation
// if no explicit return or if the return value is not an object then this
// is returned which is the new obj created by new operator.

// Exceptions
// JS has exceptions using throw, try and catch
// Use throw to raise exception. Give it an object with a name property
// and a message property.
// Also a try block has a single catch block so to check for different
// types of exceptions make the handler check.

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add requires number arguments'
        };
    }
    return a + b;
};

try {
    add('seven', 'twenty four');
} catch (e) {
    console.log(e.name + ': ' + e.message);
}

// OUTPUT:
// TypeError: add requires number arguments

// Augmenting Types
// Like Ruby you can monkey patch existing types/objects. So you can add
// properties/methods to existing types like Function, Array, String, Number.
// To do this we add the property to the prototype object of the type. So adding
// a property to Object.prototype makes the property accessible by all objects
// that inherit from Object.prototype (almost all objects in JS). Similarly to
// add a method on Array we only need to assign the function to a property of
// Array.prototype.

// Examples:
// We first define a helper method to add methods to an existing type. We basically
// skip having to mention the prototype property of the type. Honestly though is this
// required?

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// Extract integer part of a number
Number.method('integer', function () {
    // Accessing the ceiling and floor methods of Math via the object
    // refinement []. This produces a function value which can be invoked.
    return Math[this < 0? 'ceil' : 'floor'](this);
});
console.log((-10/3).integer()); // -3

// Trim whitespace at beginning and end of a string
String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});
console.log("  my name is Douglas. ".trim()); // my name is Douglas.

// Since the lookup of properties via the prototype chain is dynamic even
// objects created before the augmented properties are added can access
// the them.

// Above Function.prototype.method will replace any existing method. Check
// if a method exists before replacing!
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

// Javascript supposedly lacks tail recursion. However there other means by
// which exhausting the stack can be achieved like streams (Racket #proglang).

// Since the DOM structure is a tree traversing it is natural using recursion.
// The following of course can't be called in node.js so use it in the browser.

// Given a node as the starting element this function will apply given
// function func on given node and each child node recursively. So the
// given node is treated as a root of a tree.
var walk_the_DOM = function (node, func) {
    func(node);
    node = node.firstChild;
    while(node) {
        walk_the_DOM(node, func);
        node = node.nextSibling;
    }
};

// Using walk_the_DOM to implement a getElementsByAttribute
// Note that the inner function is taking advantage of closure, i.e
// the result var is accessible inside the inner function.
var getElementsByAttribute = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {
        // If a node try getting given attribute
        var actual = node.nodeType === 1 && node.getAttribute(att);
        // getAttribute returns string representation of the attributes
        // value otherwise null if attribute is not present
        // If actual is of string type then we check if it's equal to
        // given value or ignore value if provided value is not string
        // type, basically value was skipped.
        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
};
// Interestingly I would have probably used nested if's to begin with
// then tried to refactor.

// Scope
// Scope controls lifetime and visibility of variables. Useful since it
// helps avoid naming collisions and provides automatic memory management(?).

// Javascript does not have block scope so adding statements surrounded
// by {} does not create a new scope. JS does have function scope. So
// variables defined within a function are only visible inside and variables
// defined in a function are accessible everywhere inside the function (including)
// inner functions (by means of closure). A function var will shadow an outer var
// with the same name.

// Closure
// Functions get access to parameters and variables on enclosing function. They
// however don't have access to enclosing functions this & arguments.

// Using closure to improve the increment object from above. This will hide the
// value variable from outside changes.
var myObject = function () {
    var value = 0;

    return {
        increment: function (n) {
            value += typeof n === 'number' ? n : 1;
        },
        getValue: function () {
            return value;
        }
    };
}();

// Note that we are calling the function immediately so the returned object
// is store in myObject. The two functions increment and getValue have access
// to value var of the function even though there is no way to access it
// outside of the function.
// The inner functions have access to the variables i.e they can mutate them!

// JS has callbacks. :)
// Basically allows you to make an asynchronous call possibly to a network
// and return immediately. To handle to result you pass in a callback, just
// a function that knows what to do with the result.

// Modules
// A simple way of creating modules that hide implementation details from the
// user is to use a function that is called immediately. Define private
// properties and methods in the function and return an object or function
// that is the public interface.

// Cascade
// Basically method chaining. You return this to allow further methods
// to be invoked. Very useful for graphics and GUI API's.

// Curry
// JS implementations don't have a utility method to create curried methods.
// Crockford provides an example of such a method.
Function.method('curry', function ( ) {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments), // convert arguments to array trick
        that = this;
    return function ( ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

// Memoization
// Store results of previous function calls in a memo table and lookup the
// table next time to check if value already computed. If not compute and
// store. If already computed then we get the value without performing possibly
// costly computation.


var util = require('./util.js');

// Chapter 5: Inheritance

// Two uses of Inheritance: Code reuse and specification of system of types.
// I think Crockford is conflating sub classing and sub typing here?
// JS supports different inheritance patterns.

// Pseudoclassical
// When a function object is created the Function constructor runs code like:
// this.prototype = { constructor: this };
//
// This gives every function object a prototype object whose constructor is
// set to the function object.
//
// All function objects have a prototype object since no way to differentiate
// which function objects will be used as constructors. Apparently constructor
// property is not very useful only the prototype property is.
//
// Constructor invocation operator new if implemented would look
// something like this.

Function.method('new', function () {
    // Create new obj inheriting from constructor's prototype
    var that = Object.create(this.prototype);

    // Apply constructor to new obj
    var other = this.apply(that, arguments)

    // if returned other is not an object then return our new obj
    return (typeof other === 'object ' && other) || that;
});

// If we call a constructor function without the new operator then this will not
// be bound to a new obj but the global object. No compile warning or runtime
// warning for this. By convention constructor functions begin with a capital
// letter. So this allows visual inspection to find missing new. Crockford
// suggests not to use new at all!
//
// In pseudoclassical inheritance in JS we manually set the Child objects
// prototype to to an instance (created using new operator) of Parent
// object. This is problematic in that it doesn't provide private properties
// and you cannot access super methods. Apparently there are better ways in
// JS.

// Object Specifiers
// Instead of passing many parameters to a constructor pass in an object
// specifier which is basically an object with the parameters described in
// it.
var Person = function (first, last, city, phone) {
    this.first = first;
    this.last = last;
    this.city = city;
    this.phone = phone;
};
new Person('Adam', 'Wu', 'New York', '+1972610986');

// Instead of above we do the following to improve readability, reduce errors
// while calling the constructor. It also allows handling missing parameters
// if the constructor handles them using defaults (not done here).

var Person = function (personParams) {
    this.first = personParams.first;
    this.last = personParams.last;
    this.city = personParams.city;
    this.phone = personParams.phone;
};
new Person({
    first: 'Adam',
    last: 'Wu',
    city: 'New York',
    phone: '+1972610986'
});

// Prototypal Inheritance
// Avoid creating class heirarchies just inherit from objects directly. Nothing
// new here if I'm correct. Examples show using Object.create to inherit from
// another object. Assign properties that specialize the object.

// Functional Inheritance
// Above patterns lack privacy. One way is to name properties that you don't
// want outside world using differently for e.g starting with
// underscore. However there is a better way i.e using module pattern.
//
// We create a constructor function of sorts but it won't be invoked using
// new. So the function name is not capitalized. Inside the function we follow
// these basic steps:
// 1. Create an object. Can be created anyway: object literal, new operator,
// Object.create or calling some other functional obj constructor function.
// 2. Optionally define private vars and methods. These are just normal vars and
// inner functions of the constructor method.
// 3. Augments the created object with methods. Theses methods will have
// privileged access vars and methods defined in second step.
// 4. Return the created object.
//
// A pseudocode template:
// var constructor = function (spec, my) {
//     var that, other private instance variables;
//     my = my || {};
//     // Add shared variables and functions to my
//     that = a new object;
//     // Add privileged methods to that
//     return that;
// };
//
// The spec object contains information required to created the object. The my
// object is used to share secrets between constructors in the inheritance
// chain.
// Hmm the template is not complete-ish. We add the private vars and methods by
// just declaring vars inside the function. Then the privileged methods of that
// will have access to them but no client of that will be able to access them.

var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };

    that.says = function () {
        return spec.saying || '';
    };

    return that;
};
var myMammal = mammal({ name: 'Herb' });

// Note that name and saying properties are private and only accessible via the
// get_name and says methods.

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);

    that.purr = function () {
        return 'purrrr';
    };

    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };

    return that;
};

var myCat = cat({ name: 'chinky' });

// We can access the super method by first saving the method before redefining
// it. To do this Crockford has created a method on Object called superior that
// returns a function which when called returns the result of calling super. To
// do this he has saved a reference to this and this[method_name]. Frankly I
// didn't like this somehow feels unclean and forced. Apparently ES6 will have
// ability to access super so.

// Parts Pattern
// Since object properties can be added/removed/modified at runtime we can
// compose objects from a set of parts. So we define a function that adds
// properties to it. By following the module pattern we can define vars in the
// function that will be private. Then augment the given object with the API
// methods to perform whatever task. The example in the book is to add event
// handling to any object. To do this we add a private event registry, an on
// method for registering event handlers and a fire method to trigger events
// resulting in calling the events resp. handlers. not adding it here but very
// nice example take a look if you are referring back to the notes!

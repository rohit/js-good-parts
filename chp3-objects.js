// I'm guessing this is done so that any object can be used as
// a prototype. The prototype of an object created using new
// is set to Constructor.prototype.
// To simply inherit from any object you'd have to create a
// no-op constructor function.
// Newer JS (ES5) already defines an Object.create so this won't
// be defined anyways.
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

// The prototype chain isn't touched when updating an objects property.
// Only when retrieving properties the prototype chain might be looked up.
// If the current object does not contain the the requested property then
// it's prototype is checked. If the prototype lacks the property then it's
// prototype is checked and so on until we reach Object.prototype. If the
// property is not contained in the protype chain then undefined is returned.
var person = {
    first: 'Robert',
    last: 'Green',
    nick: 'Hulk'
};
var another_person = Object.create(person);
another_person.middle = 'Short';
console.log(another_person.nick); // Hulk

// The prototype relationship is dynamic. Adding new properties to a prototype
// makes them visible immediately to all objects based on that prototype.
person.location = 'Washington DC';
console.log(another_person.location); // Washington DC

// An example object
var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

// Any property on the prototype chain can produce a value so care must be taken.
// For example obj.constructor and obj.toString are functions and reside in Object.
// To check if a property belongs to the particular object and not some object on
// the prototype chain use Object.hasOwnProperty or obj.hasOwnProperty. It is
// the only method that does not look up the prototype chain IIRC.
//
// > flight.hasOwnProperty('number')
// true
// > flight.hasOwnProperty('constructor')
// false

// Can enumerate the properties of an object using for in statement.
// It will enumerate all properties including functions and properties on
// the prototype chain. Also the order of retrieved properties is not guaranteed.
// Need to filter using hasOwnProperty and typeof.

var listOwnProperties = function (obj) {
    var name;
    var result = [];
    for (name in obj) {
        if (obj.hasOwnProperty(name)) {
            result.push(name);
        }
    }

    return result;
};

// To ensure ordering better to list the properties in the required order
// and enumerate manually using a normal for loop.

// Can delete properties of an object. The delete operator does not touch
// the prototype chain only affecting own properties. Deleting a property
// can reveal a property with same name in the prototype chain.
another_person.nick = 'Furball';
console.log(another_person.nick); // Furball
delete another_person.nick;
console.log(another_person.nick); // Hulk

// All variables not declared inside a function using the var keyword
// are available in the global object. In case of browser this is window.
// To avoid polluting the global namespace we can create a single object
// for our application and store everything inside.

var MYAPP = {};
MYAPP.person = {
    first: 'Robert',
    last: 'Green',
    nick: 'Hulk'
};

MYAPP.flight = flight;

// Now all our application objects are within the MYAPP object and can
// be accessed using MYAPP.property_name. This reduces interaction with
// other applications and widgets. Crockford calls this Global Abatement.

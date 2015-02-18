// Appendix B: Bad Parts
// The bad parts that can be avoided and probably must be.
//
// ==
// I already knew about this one. == and != behave weirdly when two operands are
// of different types. It tries to coerce them with really weird results. Just
// use === and !===.
//
// with
// For using properties of an object directly like with(obj) { a = b; }
// Unfortunately the actual outcome depends on wether a and b are defined or not
// leading to different outcomes. Just don't use!
//
// eval
// Hard to read, slower and need to run a compiler just to evaluate simple
// code(possibly). Also a vector for vulnerabilities. Don't use. Hidden as
// Function constructor:

var my_func = new Function("return 2;");

// and if string args given to setTimeout and setInterval. Avoid these too.
//
// continue statement
// Don't remember the last time I've used this. But supposedly bad.
//
// switch fall through
// I can see how this might be problematic although it can be usefull when
// writing simple parsing type thingies IIRC.
//
// Blockless statements
// Agree on this.
//
// ++ --
// A I remember the str copy in one line using a for loop with no statements!
// Precious. But even I try avoiding ++ and --.
//
// Bitwise Operators
// JS doesn't have integers. Numbers are converted to integers (internal
// format?) and do the bit twiddling and convert back to numbers. This is not
// close to the metal operations so definitely avoid.
//
// Function statement vs expression
// Statement is sole function def while expression is when you assign the
// function to a var. Need to end the later with a semicolon being an
// expression. Crockford prefers the later and I've noticed in the wild the
// expression form is preferred so I've come to use it myself.
// First thing in a statement can't be a function expression since the function
// keyword will signal to the interpreter that this is a function statement. So
// wrap that expression in parenthesis.
//
// Typed Wrappers
// Using new String/Boolean/Object/Array will give an wrapped object with a
// method valueOf that you can use to access the value. Umm not useful AFAICT.
//
// new
// Crockford says don't use new. He defined an Object.create but looks like ES5
// onwards already has it. You need to be careful while using new since
// forgetting it leads pollution of the global object.
//
// void
// What?! It takes an operand and returns undefined. Why is this even there?!
// Avoid void!

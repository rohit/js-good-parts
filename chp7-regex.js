var util = require('./util.js');

// Chapter 7: Regular Expressions
// JS regex don't have comments or whitespace.

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.rohitarondekar.com:80/projects?id=2#desc";
parse_url.exec(url);
// Return value of exec:
// [ 'http://www.rohitarondekar.com:80/projects?id=2#desc',
//   'http',
//   '//',
//   'www.rohitarondekar.com',
//   '80',
//   'projects',
//   'id=2',
//   'desc',
//   index: 0,
//   'input': 'http://www.rohitarondekar.com:80/projects?id=2#desc' ]

// Available flags
// g Global
// i Ignore case
// m Multiline (^ and $ can match line ending chars)

// Can make a regexp using the literal notation or RegExp constructor.

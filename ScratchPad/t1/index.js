/**
 * Created by mccaul on 5/19/16.
 */

console.log("Hello World");

var myjson = require("./data.json");

// console.log(JSON.stringify(myjson));
var mynode = myjson.rows[0].elements[0].duration.text;

console.log(mynode);

console.log("Done!");


// but I can’t dig into the distance.text and the durantion.text values
// because its and array within an array


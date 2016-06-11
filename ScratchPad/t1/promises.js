/**
 * Created by mccaul on 5/31/16.
 */
console.log("hello");
var https = require("https");

var mypromise = new Promise(function(resolve,reject) {
        if(true) {

            resolve("Success");
        } else {
            reject("Failure");
        }

    }
);

mypromise.then(function() {
    // do something with result


}).catch(function() {
    // error
});
var sa = {
        "myList": [
            "red bird",
            "black sheep"
        ]
}
var sl = {
    "Animal": {
        "name": "Animal",
        "value": "frog"
    },
    "Color": {
        "name": "Color",
        "value": "green"
    }
}

GetExternalData(sl, sa)
    .then(
        function(response){
            console.log(response.toString());
        })
    .catch(
        function(error){
            console.error("not so good " + error);
        }
    );

// -------------------------------------------------------------
function GetExternalData(slots, sessAtts){
    return new Promise(function(resolve,reject){

        var jsonServicePayload = // perform any special filtering or node selection available slots or session attributes
        JSON.stringify(
            {
            "color": slots.Color.value,
            "animal": slots.Animal.value
            }
        );

        var postheaders = { 'Content-Type' :  'application/json' // 'application/x-www-form-urlencoded'  //
            // , 'Content-Length' : Buffer.byteLength(jsonServicePayload, 'utf8')
        };

        var options = {
            host: "p1zdyowef4.execute-api.us-east-1.amazonaws.com",  // public Amazon API Gateway service
            port: 443,
            path: '/prod/brownbeardoubler',
            method: 'POST',
            headers: postheaders
        };

        var req = https.request(options, function(res) {
            // console.log(res.statusCode);
            req.on('error', function(e) {  console.error(e); reject(Error(req.status, e.toString())); });

            var body = "";
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                resolve(body);
            });
        });

        req.write(jsonServicePayload.toString());
        req.end();


    })
};



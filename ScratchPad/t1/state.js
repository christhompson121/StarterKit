/**
 * Created by mccaul on 5/24/16.
 */
// state machine navigation tree
function load() {
    cmd = "";
    arg1 = "b";

    process.argv.forEach(function (val, index, array) {
        cmd = cmd + " " +  val;
        if (index == 2) {		arg1 = val;	  }
        //console.log(index + " " + val);
    });
    console.log();
    console.log(' -----------------> Begin ran at  ' + new Date().toTimeString());
    console.log(' -----------------> Running      ' + cmd);
    console.log();
    counter = 0;
    path = "";
    patharray = [];

    //console.log(myJson.nfl.afc);
    //getChildren(myJson);

    var ret = gotoo(myJson, arg1);

    console.log("ret = ");
    console.log(ret);
    console.log(patharray);
    //console.log(goto(myJson["n1"], "n4"));
    //console.log("------------------------------------");
    //console.log(goto(myJson["n1"], "n7"));

    // console.log(myJson.nfl.afc.east);
    // var menu = populate_test();
    // console.log(menu);

}
var menu = {};
var foundnode = false;

function gotoo(obj, NodeId) {
    var result;
    if (typeof NodeId == "undefined") {
        return obj;
    }
    for (key in obj) {
        if (typeof obj[key] == "object") {

            //console.log(" loop key = " + key + " obj[key] = " + obj[key].prompt );
            patharray.push(obj[key].prompt);

            if (NodeId == key) {
                //console.log("Found One");
                return obj[key];

            } else {
                result = gotoo(obj[key], NodeId);

                if (result !== false) {
                    return result;
                }
            }
        }
    }
    return false;
}


function showpath(thepath) {
    console.log(thepath.join(" : ").toString());
}

function getmenu(node) {
    console.log("in getmenu");
}

function getChildren(node) {

    counter = counter + 1;

    // console.log(Array(counter).join("-") +  "bb");
    for (var key in node ) {

        if (key == "id" ) {
            console.log(node[key]);
        } else if (key == "prompt") {
            console.log(Array(counter).join(".") +  " " + node[key]);
            patharray.push(node[key]);
            showpath(patharray);
            //console.log();
        }

        if (typeof node[key] == "object") {
            var len = node[key].prompt.length;
            //path = path + '/' + node[key].prompt;
            //console.log("path = " + path);
            getChildren(node[key]);
            //console.log("proposed path truncation = " + path.substring(1, path.lastIndexOf("/") ));
            counter = counter -1;
            patharray.pop();
        }
        // console.log(path.substring(1, path.lastIndexOf("/")));

        // console.log("path = " + path + " last / at " + path.lastIndexOf("/") + "/" + path.length);
        //console.log('--------------------------end');
        //counter = counter - 1;
    }

}
var myJson = {"n1": {
    "id":1,
    "prompt": "NFL",
    "url": "www.nfl.com/",
    "say": "national football league",
    "label": "The NFL",

    "n2": {
        "id":2,
        "prompt": "AFC",
        "url": "www.nfl.com/afc",
        "say": "american football conference",
        "label": "The AFC",

        "n4" : {
            "id":4,
            "prompt": "East",
            "url": "www.nfl.com/afceast",
            "say": "east",
            "label": "The AFC East",

            "n6" : {
                "id":6,
                "prompt": "Patriots",
                "url": "www.nfl.com/patriots",
                "say": "patriots",
                "label": "The Patriots",

                "n8" : {
                    "id":8,
                    "prompt": "Offense",
                    "url": "www.nfl.com/patriots/offense",
                    "say": "offense",
                    "label": "The Patriots Offense"
                },
                "n9" : {
                    "id":9,
                    "prompt": "Defence",
                    "url": "www.nfl.com/patriots/defence",
                    "say": "defence",
                    "label": "The Patriots Defence"
                }
            },
            "n7" : {
                "id":7,
                "prompt": "Dolphins",
                "url": "www.nfl.com/dolphins",
                "say": "dolphins",
                "label": "The Dolphins",
                "n10" : {
                    "id":10,
                    "prompt": "Offense",
                    "url": "www.nfl.com/dolphins/offense",
                    "say": "offense",
                    "label": "The Dolphins Offense"
                },
                "n11" : {
                    "id":11,
                    "prompt": "Defence",
                    "url": "www.nfl.com/dolphins/defence",
                    "say": "defence",
                    "label": "The Dolphins Defence"
                }
            }

        },
        "n5" : {
            "id":5,
            "prompt": "South",
            "url": "www.nfl.com/afcsouth",
            "say": "south",
            "label": "The AFC South"
        }
    },

    "n3": {
        "id":3,
        "prompt": "NFC",
        "url": "www.nfl.com/nfc",
        "say": "national football conference",
        "label": "The NFC"
    },
}
}
function populate_test() {

    var dataset = {
        top: {
            ch1: {
                "id":1,
                "prompt": "News",
                "url": "https://news.google.com",
                "say": "news headlines",
                "label": "Google News"
            },
            ch2: {
                "id":2,
                "prompt": "Sports",
                "url": "https://www.espn.com",
                "say": "sports headlines",
                "label": "ESPN"
            },
            ch3: {
                "id":3,
                "prompt": "Stock",
                "url": "http://finance.yahoo.com/q?s=amzn",
                "say": "amazon stock quote",
                "label": "AMZN"
            },
            ch4: {
                "id":4,
                "prompt": "Shopping",
                "url": "https://www.amazon.com",
                "say": "online shopping",
                "label": "Amazon.com"
            },
            ch5: {
                "id":5,
                "prompt": "Cats",
                "url": "https://www.reddit.com/r/catpictures",
                "say": "cat pictures",
                "label": "Reddit Cats"
            }
        }
    }


    // url = "https://kivadashboards.kivasystems.com/#/views/Supply/DeliveryPerformance";
    // url = "http://weoclan.com/intenterror.html?word=" + metric;
    return dataset;

}

load();

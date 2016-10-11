/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();

/* Eample URL
 http://127.0.0.1:3000/getDistance/coords%7B%22point1%22:%20%7B%22lat%22:%2026.4325,%22lng%22:%2051.3345%7D,%22point2%22:%20%7B%22lat%22:%2026.4444,%22lng%22:%2051.2633%7D%7D

 Input Example
 {
 "point1": {
 "lat": 26.4325,
 "lng": 51.3345
 },
 "point2": {
 "lat": 26.4444,
 "lng": 51.2633
 }
 }

 /* Example response
 {
 "distance": 7211.49
 }
 */


//I really should have hijacked res.send and moved it into a fuction where I could also lot what was passed to it.

router.get('/:coords', function (req, res, next) {

    try {
        var rawJSONInput = req.params.coords.toString().substring(6);
        var paramArray = JSON.parse(rawJSONInput);

        if (typeof paramArray == "object") {
            if (typeof paramArray.point1 == "object") {
                if (typeof paramArray.point1.lng == "number" && typeof paramArray.point1.lat == "number") {
                    if (paramArray.point1.lng < 0 || paramArray.point1.lng > 180 || paramArray.point1.lat < 0 || paramArray.point1.lat > 180) {
                        res.send(formatError("Point1 lng or lat is not sane make sure the are >0 and <180"));
                        return;
                    }
                }
                else {
                    res.send(formatError("Point1 lng or lat is not a valid number"));
                    return;
                }
            }
            else {
                res.send(formatError("JSON is not valid Point1 is not a valid object"));
                return;
            }
            if (typeof paramArray.point2 == "object") {
                if (typeof paramArray.point2.lng == "number" && typeof paramArray.point2.lat == "number") {
                    if (paramArray.point2.lng < 0 || paramArray.point2.lng > 180 || paramArray.point2.lat < 0 || paramArray.point2.lat > 180) {
                        res.send(formatError("Point2 lng or lat is not sane make sure the are >0 and <180"));
                        return;
                    }
                }
                else {
                    res.send(formatError("Point2 lng or lat is not a valid number"));
                    return;
                }
            }
            else {
                res.send(formatError("JSON is not valid Point2 is not a valid object"));
                return;
            }
        }
        else {
            res.send(formatError("JSON is not valid"));
            return;
        }
    }
    catch (err) {
        res.send(formatError("input error > " + err));
        return;
    }


    var distance = calcDistance(paramArray.point1.lat, paramArray.point1.lng, paramArray.point2.lat, paramArray.point2.lng, "K")

    //console.log("Recieved P1Lat : " + paramArray.point1.lat + "P1Long" +  paramArray.point1.lng  +  "P2Lat" + paramArray.point2.lat + "P2Long" + paramArray.point2.lng);
    //console.log(distance + "KM");

    distance = (distance * 1000).toFixed(2); // we want Meters and only two decimal places like the example.
    varDistArray = {"distance": distance};

    writeToLogFile("Returning " + JSON.stringify(varDistArray));
    res.send(JSON.stringify(varDistArray));
});


function formatError(errorMessage) {
    /* Example Error
     {
     "error": "point2 must be js object with lat and lng params"
     }
     */
    //console.log(errorMessage);
    error = {"error": errorMessage};

    return error;
    //it wouldn't let me res.send from here.
}

/*
 I got this from http://www.geodatasource.com
 */

function calcDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}

function writeToLogFile(message)
{
    var fs = require('fs');
    fs.appendFile("log.txt",message,null);
}
module.exports = router;
/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:coords', function(req, res, next) {

    /* Eample URL
     http://127.0.0.1:3000/getDistance/coords%7B%22point1%22:%20%7B%22lat%22:%2026.4325,%22lng%22:%2051.3345%7D,%22point2%22:%20%7B%22lat%22:%2026.4444,%22lng%22:%2051.2633%7D%7D
     */



    /*
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

     */
    var rawJSON = req.params.coords.toString();

    rawJSON = rawJSON.toString().substring(6);

    console.log("coords > " + rawJSON);
    //res.send('activeLocations');

    var paramArray = JSON.parse(rawJSON);
    console.log("Recieved P1Lat : " + paramArray.point1.lat + "P1Long" +  paramArray.point1.lng  +  "P2Lat" + paramArray.point2.lat + "P2Long" + paramArray.point2.lng);



    var distance = calcDistance(paramArray.point1.lat,paramArray.point1.lng,paramArray.point2.lat ,paramArray.point2.lng,"K")
    console.log(distance + "KM");


    distance = (distance *1000).toFixed(2); // we want Meters and only two decimal places like the example.

    varDistArray = {"distance" : distance },

    res.send(JSON.stringify(varDistArray));


/* Example response
    {
        "distance": 7211.49
    }
*/






});

/*
I got this from http://www.geodatasource.com
 */

function calcDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}




module.exports = router;
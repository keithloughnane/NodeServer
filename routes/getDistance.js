/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:coords', function(req, res, next) {


    console.log(req.params.coords);
    //res.send('activeLocations');

    var dist = distance(26.4325,51.3345,26.4444,51.2633,"K")
    console.log(dist + "KM");


    //locations = require('../data.json');

    //res.send(JSON.stringify(locations));



});

/*
I got this from http://www.geodatasource.com
 */

function distance(lat1, lon1, lat2, lon2, unit) {
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
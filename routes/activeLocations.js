/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

    //Takes UNIX Time, returns active locations (between startTime and expireTime)

    console.log(req.params.unixtime);
    //res.send('activeLocations');

    locations = require('../data.json');

    res.send(JSON.stringify(locations));

});

module.exports = router;
/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:date', function(req, res, next) {

    //Takes UNIX Time, returns active locations (between startTime and expireTime)

    console.log(req.params.date);
    //res.send('activeLocations');
    locations = require('../data.json');

    locations.forEach(function(item, index, object)
        {
            if(item.id%2 > 0)
            {
                locations.splice(index, 1)
            }

        }
    );


    res.send(JSON.stringify(locations));

});

module.exports = router;
/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:date', function(req, res, next) {

    //Takes UNIX Time, returns active locations (between startTime and expireTime)


    //res.send('activeLocations');
    locations = require('../data.json');


    /* Just testing for now */

    var currentDate = parseInt(req.params.date.toString().substring(4));
    while (currentDate < 1000000000000)
    {
        /* I could have juse *1000 but I wanted to get the edge cases*/
        currentDate*=10;
    }

    //currentDate = currentDate.toString();
    //console.log("Date > " + currentDate);


    //locations.forEach(function(item, index, object)
      //  {
    // The for each was more trouble than it was word. Elements moveing around as their removed caused issues.

    for(i = 0 ; i < locations.length;)
    {


        var testCRDate = parseInt(new Date(locations[i].date_created).getTime());
        var testDSDate = parseInt(new Date(locations[i].date_disabled).getTime());
        console.log("ID > " + locations[i].id);
        console.log("Created > " + testCRDate);
        console.log("Date > " + currentDate);
        console.log("Disabled > " + testDSDate);


        if (testCRDate < currentDate && testDSDate > currentDate) {
            console.log((testCRDate < currentDate).toString() + "," + (testDSDate > currentDate).toString());
            console.log("Passed Test, keeping");
            i++;

        }
        else {
            console.log((testCRDate < currentDate).toString() + "," + (testDSDate > currentDate).toString());
            console.log("Failed test, removing");
            locations.splice(i, 1);

            //Don't increment of removing the whole array drops down by one which results in more or less the same effect.
        }

        console.log("----------------");
    }
      //  }

    //);

    res.send(JSON.stringify(locations));
});
module.exports = router;
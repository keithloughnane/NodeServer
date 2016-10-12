/**
 * Created by keith Loughnane on 10/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:date', function(req, res, next) {
    //Takes UNIX Time, returns active locations (between startTime and expireTime)
    writeToLogFile("activeLocations parsing " + req.params.date.toString())
    //Take and process perameters
    var currentDate = parseInt(req.params.date.toString().substring(4));
    while (currentDate < 1000000000000) //Make sure milliseconds are included
        currentDate*=10;

    //Get location data
    locations = require('../data.json');

    //locations.forEach(function(item, index, object)
    // The for each was more trouble than it was word. Elements moveing around as their removed caused issues.
    for(i = 0 ; i < locations.length;)
    {
        var testCRDate = parseInt(new Date(locations[i].date_created).getTime());
        var testDSDate = parseInt(new Date(locations[i].date_disabled).getTime());
        console.log("ID > " + locations[i].id);
        console.log("Created > " + testCRDate);
        console.log("Date > " + currentDate);
        console.log("Disabled > " + testDSDate);
        if ((testCRDate != null && testDSDate != null) && testCRDate < currentDate && testDSDate > currentDate) {
            //console.log((testCRDate < currentDate).toString() + "," + (testDSDate > currentDate).toString());
            console.log("Passed Test, keeping");
            i++;
        }
        else {
            //console.log((testCRDate < currentDate).toString() + "," + (testDSDate > currentDate).toString());
            console.log("Failed test, removing");
            locations.splice(i, 1);
            //Don't increment of removing the whole array drops down by one which results in more or less the same effect.
        }
    }
    //writeToLogFile("Returning " + JSON.stringify(locations));
    writeAndReturn(res, "RETURNING > ",  JSON.stringify(locations));
});

function writeAndReturn(res, logMessage, data)
{
    writeToLogFile(logMessage + "\n********************************************\n" + data)
    res.send(data);
}

function writeToLogFile(message)
{
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();


    var fs = require('fs');
    //String slog = datetime + ">" + message + "\n"
    console.log(datetime + ">" + message + "\n");
    fs.appendFile("log.txt",datetime + ">" + message + "\n",null);
}
module.exports = router;
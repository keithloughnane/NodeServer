/**
 * Created by keith on 10/10/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('getDistance');
});

module.exports = router;
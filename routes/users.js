var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient(); // this creates a new client

var client = redis.createClient();

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

router.get('/', function (req, res, next) {
    client.lrange('saved_text', 0, -1, function (err, result) {
        console.log(result);
        res.json(result);
    });
});

router.post('/', function (req, res, next) {
    client.rpush('saved_text', req.param('dataVal'), function (err, result) {
        console.log(result)
    });
});

router.delete('/', function (req, res) {
    client.rpop('saved_text', function (err, result) {
        console.log(result)
    });

});

module.exports = router;
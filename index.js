console.log('IoTHuB REST server.');

var express = require('express');

var mongoose = require('mongoose');




var app = express();

var config = {
  port: 9000,
    database:{
        host: 'localhost',
        port:27017,
        name: 'IoTHuB',
        /**
         * @TODO Add user and password
         */
    }
};
mongoose.connect('mongodb://'+config.database.host+':'+ config.database.port + '/' +config.database.name);


app.get('/', function (req, res) {
    res.send('IoTHuB REST server.');
});

app.listen(config.host);

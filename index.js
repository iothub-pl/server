console.log('IoTHuB REST server.');

var express = require('express');
var app = express();

var config = {
  host: 9000
};
app.get('/', function (req, res) {
    res.send('IoTHuB REST server.');
});


app.listen(config.host);

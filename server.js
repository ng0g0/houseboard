"use strict";

let express = require('express'),
    compression = require('compression'),
    //products = require('./api/products'),
    app = express();
	
var db = require('./api/queries');

app.set('port', process.env.PORT || 80);

app.use(compression());

app.use('/', express.static(__dirname + '/www'));

// Adding CORS support
app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        next();
    }
});

//app.get('/object/:id', products.findObjectMaster);
//app.get('/object/', products.findObjects);
app.get('/api/object/:id', db.getSinglePuppy);
//GET('/products/find/:objId', req => db.findObjects(req.params));



// Generic GET handler;
function GET(url, handler) {
    app.get(url, (req, res) => {
        handler(req)
            .then(data => {
                res.json({
                    success: true,
                    data
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
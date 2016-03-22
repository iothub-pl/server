/**
 * info & example http://code.tutsplus.com/tutorials/using-nodes-event-module--net-35941
 * @param data
 */
module.exports = function (server, app) {

    var WebSocketServer = require('ws').Server,
        url = require('url'),
        wss = new WebSocketServer({server: server, path: 'socket'});

    console.log(wss);
    app.locals.websocket = [];
    wss.on('connection', (ws) => {
        app.locals.websocket.push(ws);
        /**
         * @TODO fix error when ssl ...received: reserved fields must be empty
         */
        // you might use location.query.access_token to authenticate or share sessions
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

        ws.on('message', (message) => {
            console.log('received: %s', message);
        });
        ws.on('error', (message)=> {
            console.log('received: %s', message);
        });
        var x = setInterval(()=> {
            try {
                ws.send('something');
            }
            catch (e) {

                for (var i = 0; i < app.locals.websocket.length; i++) {
                    if (app.locals.websocket[i] === ws) {
                        delete  app.locals.websocket[i];
                    }
                }
                clearInterval(x);
                winston.debug(e);
            }
        }, 100);
    });
}
var wss;
function init() {


    wss.on('connection', (ws) => {
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
    });
}
/**
 * info & example http://code.tutsplus.com/tutorials/using-nodes-event-module--net-35941
 * @param data
 */
module.exports = function (server) {
    setInterval(()=> {
        console.log(wss.clients.length);

    }, 250);
    if (!wss) {
        var WebSocketServer = require('ws').Server,
            url = require('url');
        wss = new WebSocketServer({server: server});
        init();
    }


    return wss;
}

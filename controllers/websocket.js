var wss;
var Authentication = require('./../models/authentication');
const authenticationHelper = require('./../helpers/authentication');

function init() {


    wss.on('connection', (ws) => {
        // console.log(ws.headers);
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
    // setInterval(()=> {
    //     console.log(wss.clients.length);
    //
    // }, 250);
    if (!wss) {
        var WebSocketServer = require('ws').Server,
            url = require('url');
        wss = new WebSocketServer({
            server: server, verifyClient: (data)=> {

                if (data.req.headers.authorization) {

                    return Authentication
                        .findOne().select('+token')
                        .where('token').equals(data.req.headers.authorization.split(' ')[1])
                        .where('valid').equals(true)
                        .then((authentication)=> {
                            return authenticationHelper
                                .verifyToken(authentication.getToken())
                                .then((decoded)=> {
                                    return authentication.findOwner()
                                        .select('+salt').select('+password')
                                        .then((account) => {
                                            if (!account) {
                                                return false;
                                            } else {
                                                console.log(account);

                                                return true;
                                            }
                                        });
                                });
                        })
                        .catch((err)=> {
                            console.log(err);
                            return false;
                        });

                } else {
                    return false;
                }
            }
        });
        init();
    }


    return wss;
}

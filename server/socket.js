const ws = require('socket.io');
let vl = require('./objects/VotersList');
let ioInstance = null;

function socket(server) {

    let votersList = new vl();

    if(!ioInstance) {
    
        console.log('creating-server-socket-instance');
        ioInstance =  ws(server);
    }

    ioInstance.on('connection', (client) => {
        console.log('connection to the socket successful');
        client.on('logged-in', (data) => {
            ioInstance.emit('new-user', {votersCount: votersList.getUsersCount()})
        })
    })

    return ioInstance;
}

function getSocketInstance() {

    if(ioInstance) {
        return ioInstance;
    } else {
        new Error('There is no web socket instance');
    }
}

module.exports = {
    socket: socket,
    getInstance: getSocketInstance
}
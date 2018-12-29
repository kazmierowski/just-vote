let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();
const socket = require('../socket').getInstance();

router.post('/is-waiting', (req, res) => {

    votersList.checkIfAllUsersReady().then(
        (data) => {

            if(data.areReady) {
                socket.emit('all-voters-ready');
                setTimeout(() => {
                    socket.emit('end-of-vote');
                }, 90000);
            }

            res.send({success: data.success, app: {isWaiting: !data.areReady}})
        })
        .catch((error) => {
            res.send(error)
        })
})

module.exports = router;
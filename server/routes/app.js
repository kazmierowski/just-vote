let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

router.post('/is-waiting', (req, res) => {

    console.log('request is app waiting');

    votersList.checkIfAllUsersReady().then(
        (data) => {
            res.send({success: data.success, app: {isWaiting: !data.areReady}})
        })
        .catch((error) => {
            res.send(error)
        })
})

module.exports = router;
let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();
const socket = require('../socket').getInstance();

router.post('/login', (req, res) => {

    votersList.addVoter({name: req.body.name}).then(
        (id) => {
            res.cookie('voter', {id: id});
            res.send({success: true, voter: {id: id, name: req.body.name}});

            socket.emit('new-voter', {name: req.body.name, id: id, votersCount: votersList.getAllVotersNames().length})
        }
    ).catch((error) => {
        res.send(error);
    })
})

router.post('/add-selected-names', (req, res) => {

    votersList.addVotersSelectedName(req.cookies.voter.id, req.body.names).then(
        (data) => {
            res.send({success: data.success, message: 'Names added', names: data.names})
        })
        .catch((error) => {
            res.send(error)
    })
})

module.exports = router;
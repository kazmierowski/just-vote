let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

router.post('/add-vote', (req, res) => {

    let votesCount = votersList.addVote(req.body.nameId);

    res.send({success: true, name: {votesCount: votesCount}});
})

router.post('/remove-vote', (req, res) => {

    let votesCount = votersList.removeVote(req.body.nameId);

    res.send({success: true, name: {votesCount: votesCount}});
})

router.post('/get-all', (req, res) => {
    res.send({names: votersList.getAllVotersSelectedNames()});
})

module.exports = router;
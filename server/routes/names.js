let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

router.post('/get-all', (req, res) => {
    res.send({names: votersList.getAllVotersSelectedNames()});
})

router.post('/vote', (req, res) => {

    if(req.body.option === 'add') {

        console.log('add vote router');

        let votesCountResponse = votersList.addVote(req.body.nameId);
        console.log('count: ', votesCountResponse.votesCount);

        res.send({success: true, voteResponse: votesCountResponse});
    } else {

        console.log('remove vote router');

        let votesCountResponse = votersList.removeVote(req.body.nameId);

        console.log('count: ', votesCountResponse.votesCount);

        res.send({success: true, voteResponse: votesCountResponse});;
    }
})

module.exports = router;
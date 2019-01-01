let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();
const socket = require('../socket').getInstance();

router.post('/get-all', (req, res) => {
    res.send({names: votersList.getAllVotersSelectedNames()});
})

router.post('/vote', (req, res) => {

    if(req.body.option === 'add') {

        console.log('add vote router');

        let votesCountResponse = votersList.addVote(req.body.nameId);

        if(votersList.getAllVotesCount() === (votersList.getAllVotersNames().length * 2)) {
            setTimeout(() => {
                if(votersList.getAllVotesCount() === (votersList.getAllVotersNames().length * 2)) {
                    
                    votersList.getWinnerName().then(
                        (winner) => socket.emit('end-of-vote', winner)
                    )
                }
            }, 5000)
        }

        res.send({success: true, voteResponse: votesCountResponse});
    } else {

        console.log('remove vote router');

        let votesCountResponse = votersList.removeVote(req.body.nameId);

        console.log('count: ', votesCountResponse.votesCount);

        res.send({success: true, voteResponse: votesCountResponse});;
    }
})

router.post('/winner', (req, res) => {

    votersList.getWinnerName().then(
        (winner) => res.send({winner: winner})
    )
    console.log('getting the winner');
})

module.exports = router;
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

        console.log('add vote to', req.body.nameId);

        let votesCountResponse = votersList.addVote(req.body.nameId);
        let allowedVotes = votersList.getRoundsCount() > 1 ? 1 : 2;

        if(votersList.getAllVotesCount() === (votersList.getAllVotersNames().length * allowedVotes)) {
            setTimeout(() => {
                if(votersList.getAllVotesCount() === (votersList.getAllVotersNames().length * allowedVotes)) {
                    
                    votersList.getWinnerName().then(
                        (winner) => socket.emit('end-of-vote', {message: 'And the winner is:', winner: winner}),
                        (newVote) => {
                            votersList.resetAllVotesCount();
                            socket.emit('next-round', {roundCount: newVote.roundCount, newRoundNames: newVote.newRoundNames, message: 'We need to have another vote...'});
                        }
                    ).catch(error => {
                        console.log(error);
                    })
                }
            }, 3000)
        }

        res.send({success: true, voteResponse: votesCountResponse});

    } else {

        console.log('remove vote from', req.body.nameId);

        let votesCountResponse = votersList.removeVote(req.body.nameId);

        console.log('count: ', votesCountResponse.votesCount);

        res.send({success: true, voteResponse: votesCountResponse});;
    }
})

router.post('/winner', (req, res) => {

    //TODO: We need to move the middleware to separate function to have the winner / newVote options in one place
    votersList.getWinnerName().then(
        (winner) => res.send({message: 'And the winner is:', winner: winner}),
        (newVote) => {
            votersList.resetAllVotesCount();
            socket.emit('next-round', {roundCount: newVote.roundCount, newRoundNames: newVote.newRoundNames, message: 'We need to have another vote...'});
        }
    ).catch(error => console.log(error))
})

module.exports = router;
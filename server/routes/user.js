let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

router.post('/login', (req, res) => {

    let voterId = votersList.addVoter({name: req.body.name});

    res.cookie('voter', {id: voterId});
    res.send({success: true, voter: {id: voterId, name: req.body.name}});
})

router.post('add-selected-names', (req, res) => {
    console.log('body from add-selected-names', req.body);


    votersList.addVotersSelectedNames(req.cookies.voter.id, req.body.names).then(
        () => {
            console.log('send response');
            res.send({success: true, message: 'Names added'})
        },
        (error) => {
            res.send(error)
        }
    )
})

module.exports = router;
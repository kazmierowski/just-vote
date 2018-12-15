let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

router.post('/login', (req, res) => {

    let voterId = votersList.addVoter({name: req.body.name});

    res.cookie('voter', {id: voterId});
    res.send({success: true, voter: {id: voterId, name: req.body.name}});
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
let vl = require('./../objects/VotersList');
let express = require ('express');

let router = express.Router();
let votersList = new vl();

let voterId = 1;


router.post('/login', (req, res) => {
    console.log(req.body);

    let voterId = votersList.addVoter({name: req.body.name});

    res.send({success: true, voter: {id: voterId}});
})

module.exports = router;
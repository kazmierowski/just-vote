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
    console.log('body from add-selected-names', req.body);


    votersList.addVotersSelectedName(req.cookies.voter.id, req.body.names).then(
        (data) => {
            console.log('send response');
            console.log(data);
            res.send({success: data.success, message: 'Names added', names: data.names})
        })
        .catch((error) => {
            console.log('error lol');
            res.send(error)
    })
})

module.exports = router;
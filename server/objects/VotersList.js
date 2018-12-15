let Voter = require('./Voter');
let Name = require('./Name');
let instance = null;

class VotersList {

    constructor() {

        if(!instance) {
            instance = this;
        }
        this.votersNames = [];
        this.votersSelectedNames = [];
        this.voters = {};
        this.voterId = 0;
        this.nameId = 0;

        return instance;
    }

    addNameToVotersNames(userName) {
        this.votersNames.push(userName);
    }

    addVoter(user) {
        let id = this.getVoterId();
        this.voters[id] = new Voter(id, user.name);

        this.addNameToVotersNames(user.name);

        return id;
    }

    getAllVotersNames() {
        return this.votersNames;
    }

    getAllVotersSelectedNames() {
        return this.votersSelectedNames;
    }

    addVotersSelectedName(voterId, name) {

        return new Promise((resolve, reject) => {

            if(this.voters[voterId] instanceof Voter) {

                this.votersSelectedNames.push(new Name(this.getNameId(), name))

                this.voters[voterId].addName(name);
                resolve({success: true, names: this.voters[voterId].getNames()});

            } else {
                reject({success: false, message: 'Voter with this ID do not exist'});
            }
        })
    }

    getVoterId() {
        this.voterId++;
        return this.voterId;
    }

    getNameId() {
        this.nameId++;
        return this.nameId;
    }
}

module.exports = VotersList;
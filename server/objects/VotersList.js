let Voter = require('./Voter');
let Name = require('./Name');
let instance = null;

class VotersList {

    constructor() {

        if(!instance) {
            instance = this;
        }
        this.votersNames = [];
        this.votersSelectedNames = {};
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

                let nameId = this.getNameId();

                let nameObject = new Name(nameId, name);

                this.votersSelectedNames[nameId] = nameObject;

                this.voters[voterId].addName(nameObject);

                if(this.voters[voterId].getNames().length === 2) {
                    this.voters[voterId].setIsReady(true);
                } else {
                    this.voters[voterId].setIsReady(false);
                }

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

    addVote(nameId) {
        return {votesCount: this.votersSelectedNames[nameId].addVote(), id: nameId};
    }

    removeVote(nameId) {
        return {votesCount: this.votersSelectedNames[nameId].removeVote(), id: nameId};
    }

    checkIfAllUsersReady() {

        return new Promise((resolve, reject) => {
            for(let voter in this.voters) {

                if(!this.voters[voter].getIsReady()) {
                    resolve({areReady: false})
                }
            }

            resolve({areReady: true})
        })
    }
}

module.exports = VotersList;
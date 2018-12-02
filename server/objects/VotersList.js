let Voter = require('./Voter');
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

        return instance;
    }

    addNameToVotersNames(userName) {
        this.votersNames.push(userName);
    }

    addVoter(user) {
        let id = this.getVoterId();
        this.voters[id] = new Voter(id, user.name);

        this.addNameToVotersNames(user.name);

        console.log(this.voters);
        return id;
    }

    getAllVotersNames() {
        return this.votersNames;
    }

    getAllVotersSelectedNames() {
        return this.votersSelectedNames;
    }

    addVotersSelectedNames(voterId, names) {

        return new Promise((resolve, reject) => {

            if(this.voters[voterId]) {
                console.log('names added:', names);
                names.forEach((name) => {
                    this.votersSelectedNames.push(name);
                })

                this.voters[voterId].names = names;
                resolve({success: true});
            } else {
                reject({success: false, message: 'Voter with this ID do not exist'});
            }
        })
    }

    getVoterId() {
        this.voterId++;
        return this.voterId;
    }
}

module.exports = VotersList;
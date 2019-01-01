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
        this.allVotesCount = 0;

        return instance;
    }

    addNameToVotersNames(userName) {
        this.votersNames.push(userName);
    }

    addVoter(user) {

        return new Promise((resolve, reject) => {
            let id = this.getVoterId();
            this.voters[id] = new Voter(id, user.name);
    
            this.addNameToVotersNames(user.name);
    
            resolve(id);
            // console.log('voters from add voter:', this.voters);
        })
        
        // return id;
    }

    getAllVotersNames() {
        return this.votersNames;
    }

    getAllVotersSelectedNames() {
        return this.votersSelectedNames;
    }

    addVotersSelectedName(voterId, name) {

        console.log('add voters selected name id', voterId);
        return new Promise((resolve, reject) => {

            if(this.voters[voterId] instanceof Voter) {

                for(let nameId in this.votersSelectedNames) {

                    if(this.votersSelectedNames[nameId].getValue() === name) {

                        this.votersSelectedNames[nameId].addVote();

                        this.voters[voterId].addName(this.votersSelectedNames[nameId]);
                        return resolve({success: true, names: this.voters[voterId].getNames()})
                    }
                }

                let nameId = this.getNameId();

                let nameObject = new Name(nameId, name, this.voters[voterId].getName());

                this.votersSelectedNames[nameId] = nameObject;

                this.voters[voterId].addName(nameObject);

                // if(this.voters[voterId].getNames().length === 2) {
                //     this.voters[voterId].setIsReady(true);
                // } else {
                //     this.voters[voterId].setIsReady(false);
                // }

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
        this.allVotesCount = this.allVotesCount + 1;
        return {votesCount: this.votersSelectedNames[nameId].addVote(), id: nameId};
    }

    removeVote(nameId) {
        this.allVotesCount = this.allVotesCount - 1;
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

    getUsersCount() {
        return this.votersNames.length;
    }

    getAllVotesCount() {
        return this.allVotesCount;
    }

    getWinnerName() {
        return new Promise((resolve, reject) => {
            //TODO: add option for the same votes count
            // it will need to include second round
            
            let winner = {name: null, ownerName: null, votesCount: 0};

            for(let name in this.votersSelectedNames) {
                
                if(this.votersSelectedNames[name].getVotesCount() > winner.votesCount) {
                    winner = {
                        name: this.votersSelectedNames[name].getValue(),
                        ownerName: this.votersSelectedNames[name].getOwnerName(),
                        votesCount: this.votersSelectedNames[name].getVotesCount()
                    }
                }
            }

            resolve(winner);
        })
    }

    setUserReady(state, voterId) {
        return new Promise((resolve, reject) => {

            this.voters[voterId].setIsReady(state);

            resolve({isReady: state});
        })
    }
}
module.exports = VotersList;
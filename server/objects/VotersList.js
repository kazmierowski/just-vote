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
        this.roundsCount = 1;
        this.historyVotes = {};

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
            
            let winner = [];

            // let winningVoteCount = Math.max.apply(Math, Object.keys(this.votersSelectedNames)
            //     .map((name) => {return this.votersSelectedNames[name].getVotesCount()})
            // )

            let winningVoteCount = Math.max(...Object.keys(this.votersSelectedNames)
                .map(name => this.votersSelectedNames[name].getVotesCount()), 0)

            for(let name in this.votersSelectedNames) {
                
                if(this.votersSelectedNames[name].getVotesCount() === winningVoteCount) {

                    winner.push(this.votersSelectedNames[name]);
                    // winner.push({
                    //         id: this.votersSelectedNames[name].getId(),
                    //         name: this.votersSelectedNames[name].getValue(),
                    //         ownerName: this.votersSelectedNames[name].getOwnerName(),
                    //         votesCount: this.votersSelectedNames[name].getVotesCount()
                    //     })
                }
            }

            // include second vote if there is more than one winner
            if(winner.length > 1) {
                this.addRoundsCount();

                console.log(`There need to be ${this.getRoundsCount()} round`)

                if(this.getRoundsCount() === 0) {
                    this.historyVotes.initial = this.votersSelectedNames;
                } else {
                    this.historyVotes[`round_${this.getRoundsCount()}`] = this.votersSelectedNames;
                }

                this.votersSelectedNames = {};

                console.log('history votes:', this.historyVotes);

                winner.forEach(name => {
                    console.log('name id', name.id)
                    this.votersSelectedNames[name.id] = name;
                })

                console.log('second round names:', this.votersSelectedNames);
            
                return reject({roundCount: this.getRoundsCount(), newRoundNames: this.votersSelectedNames[`round_${this.getRoundsCount()}`]})
            }

            console.log('sending the winner');
            resolve(winner[0]);
        })
    }

    setUserReady(state, voterId) {
        return new Promise((resolve, reject) => {

            this.voters[voterId].setIsReady(state);

            resolve({isReady: state});
        })
    }

    addRoundsCount() {
        this.roundsCount = this.roundsCount + 1;
    }

    getRoundsCount() {
        return this.roundsCount;
    }

    resetAllReadyStates() {
        
        Object.entries(this.voters).forEach(([index, voter]) => {
            voter.setIsReady(false);
        })
    }

    resetAllVotesCount() {
        this.allVotesCount = 0;
    }
}
module.exports = VotersList;
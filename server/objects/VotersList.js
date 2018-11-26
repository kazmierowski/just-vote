let instance = null;

class VotersList {

    constructor() {

        if(!instance) {
            instance = this;
        }
        this.nameList = [];
        this.voters = {};
        this.voterId = 0;

        return instance;
    }

    addNameToNameList(userName) {
        this.nameList.push(userName);
    }

    addVoter(user) {
        let id = this.getVoterId();
        this.voters[id] = user;

        this.addNameToNameList(user.name);

        console.log(this.voters);
        return id;
    }

    getAllNames() {
        return this.nameList;
    }

    getVoterId() {
        this.voterId++;
        return this.voterId;
    }
}

module.exports = VotersList;
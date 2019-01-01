class Name {

    constructor(id, value, ownerName) {
        this.id = id;
        this.value = value;
        this.votesCount = 0;
        this.ownerName = ownerName;
    }

    getValue() {
        return this.value;
    }

    getVotesCount() {
        return this.votesCount;
    }

    getOwnerName() {
        return this.ownerName;
    }

    getId() {
        return this.id;
    }

    addVote() {

        this.votesCount++;

        return this.votesCount;
    }

    removeVote() {

        if(this.votesCount > 0) {
            this.votesCount--;
        }

        return this.votesCount;
    }
}

module.exports = Name;
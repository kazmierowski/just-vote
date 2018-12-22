class Name {

    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.votesCount = 0;
    }

    getValue() {
        return this.value;
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
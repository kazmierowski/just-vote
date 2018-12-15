
class Voter {

    constructor(id, name, names = []) {
        this.id = id;
        this.name = name;
        this.names = names;
        this.isReady = false;
    }

    addName(name) {
        this.names.push(name);
    }

    getName() {
        return this.name;
    }

    getNames() {
        return this.names;
    }

    getId() {
        return this.id;
    }

    getIsReady() {
        return this.isReady;
    }

    setIsReady(isReady) {
        this.isReady = isReady;
    }
}

module.exports = Voter;
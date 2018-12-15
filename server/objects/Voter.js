
class Voter {

    constructor(id, name, names = []) {
        this.id = id;
        this.name = name;
        this.names = names;
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
}

module.exports = Voter;
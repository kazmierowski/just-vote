class Name {

    constructor(id, value) {
        this.id = id;
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    getId() {
        return this.id;
    }
}

module.exports = Name;
class Index {
    constructor(schema) {
        this.value = {};
        this.uuid = [];
        this.index = {};
        this.schema = [];
        if (schema) {
            this.schema = schema;
        }
    }
    makeSchema(schema) {
        this.schema = schema;
        return this.schema;
    }
    insert(data) {
        if (this.schema) {
            if (this.schemaCheck(data)) {
                const uuid = this.create_UUID();
                this.value[uuid] = data;
                this.uuid.push(uuid);
                Object.keys(this.index).forEach((indexName) => { this.useIndex(uuid, indexName, data); });
                return uuid;
            }
            else {
                console.error('provided data wont match to provided schema');
                return 'provided data wont match to provided schema';
            }
        }
        else {
            const uuid = this.create_UUID();
            this.value[uuid] = data;
            this.uuid.push(uuid);
            Object.keys(this.index).forEach((indexName) => { this.useIndex(uuid, indexName, data); });
            return uuid;
        }
    }
    schemaCheck(data) {
        if (JSON.stringify(Object.keys(data)) === JSON.stringify(this.schema)) {
            return true;
        }
        else
            return false;
    }
    noSchema() {
        this.schema = undefined;
    }
    create_UUID() {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    delete(uuid) {
        delete this.value[uuid];
        let index = this.uuid.indexOf(uuid);
        this.uuid.splice(index);
        return this.value;
    }
    deleteByIndex(index) {
        let uuid = this.uuid[index];
        delete this.value[uuid];
        this.uuid.splice(index, 1);
        return this.value;
    }
    getByIndex(index) {
        let uuid = this.uuid[index];
        return this.value[uuid];
    }
    get(uuid) {
        return this.value[uuid];
    }
    getByValue(key2, value) {
        const obj = this.value;
        return obj[Object.keys(obj).find(key => JSON.stringify(obj[key][key2]) === JSON.stringify(value))];
    }
    getId(value) {
        const obj = this.value;
        return Object.keys(obj).find(key => JSON.stringify(obj[key]) === JSON.stringify(value));
    }
    getAllOf(key2, value) {
        const obj = this.value;
        const key = Object.keys(obj);
        const main = [];
        for (let i of key) {
            if (JSON.stringify(obj[i][key2]) === JSON.stringify(value)) {
                main.push(obj[i]);
            }
        }
        return main;
    }
    getAll() {
        return this.value;
    }
    getAllOrdered() {
        const ar = [];
        this.uuid.forEach((value) => {
            ar.push(this.value[value]);
        });
        return ar;
    }
    length() {
        const key = Object.keys(this.value);
        return key.length;
    }
    getIdByIndex(index) {
        return this.uuid[index];
    }
    //*custum indexes
    createIndex(keyName) {
        this.index[keyName] = {};
        return keyName;
    }
    useIndex(uuid, indexName, data) {
        if (this.index[indexName][data[indexName]]) {
            this.index[indexName][data[indexName]].push(uuid);
        }
        else {
            this.index[indexName][data[indexName]] = [uuid];
        }
    }
    getIndex() {
        return this.index;
    }
    getByCustomIndex(indexName, indexValue) {
        let value = [];
        this.index[indexName][indexValue].forEach(uuid => {
            value.push(this.value[uuid]);
        });
        return value;
    }
    deleteByCustomIndex(indexName, indexValue) {
        this.index[indexName][indexValue].forEach(uuid => {
            this.delete(uuid);
        });
    }
    update(uuid, value, key) {
        if (key)
            this.value[uuid][key] = value;
        else
            this.value[uuid] = value;
    }
    updateByIndex(index, value, key) {
        if (key)
            this.value[this.uuid[index]][key] = value;
        else
            this.value[this.uuid[index]] = value;
    }
    updateAllOf(searchKey, searchValue, valuetoupdate, updatingKey) {
        for (let i of Object.keys(this.value)) {
            if (JSON.stringify(this.value[i][searchKey]) === JSON.stringify(searchValue)) {
                if (!updatingKey)
                    this.value[i] = valuetoupdate;
                else
                    this.value[i][updatingKey] = valuetoupdate;
            }
        }
    }
    updateByCustomIndex(indexName, indexValue, valuetoupdate, updatingKey) {
        this.index[indexName][indexValue].forEach(uuid => {
            if (updatingKey) {
                this.value[uuid][updatingKey] = valuetoupdate;
                this.useIndex(uuid, indexName, this.value[uuid]);
                console.log(this.index[indexName][indexValue]);
            }
            else {
                this.value[uuid] = valuetoupdate;
                this.useIndex(uuid, indexName, valuetoupdate);
            }
        });
        delete this.index[indexName][indexValue];
    }
    forEach(func) {
        let ans = [];
        this.uuid.forEach((value, i) => {
            ans.push(func(this.value[value], i, value));
        });
        return ans;
    }
    toString() {
        return JSON.stringify(this.value);
    }
    allUuid() {
        return this.uuid;
    }
    arrayToIndex(array, keyName, schema) {
        if (schema)
            this.makeSchema(schema);
        if (keyName)
            this.createIndex(keyName);
        let Mvalue = [];
        array.forEach((value) => {
            Mvalue.push(this.insert(value));
        });
        return Mvalue;
    }
    objectToIndex(object, keyName, schema) {
        if (schema)
            this.makeSchema(schema);
        if (keyName)
            this.createIndex(keyName);
        let Mvalue = [];
        for (let key in object) {
            Mvalue.push(this.insert(object[key]));
        }
        return Mvalue;
    }
}
;
//# sourceMappingURL=index.js.map
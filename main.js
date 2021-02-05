var Index = /** @class */ (function () {
    function Index(schema) {
        this.value = {};
        this.uuid = [];
        this.index = {};
        if (schema) {
            this.schema = schema;
        }
    }
    Index.prototype.makeSchema = function (schema) {
        this.schema = schema;
        return this.schema;
    };
    Index.prototype.insert = function (data) {
        var _this = this;
        if (this.schema) {
            if (this.schemaCheck(data)) {
                var uuid_1 = this.create_UUID();
                this.value[uuid_1] = data;
                this.uuid.push(uuid_1);
                Object.keys(this.index).forEach(function (indexName) { _this.useIndex(uuid_1, indexName, data); });
                return uuid_1;
            }
            else {
                console.error('provided data wont match to provided schema');
                return 'provided data wont match to provided schema';
            }
        }
        else {
            var uuid_2 = this.create_UUID();
            this.value[uuid_2] = data;
            this.uuid.push(uuid_2);
            Object.keys(this.index).forEach(function (indexName) { _this.useIndex(uuid_2, indexName, data); });
            return uuid_2;
        }
    };
    Index.prototype.schemaCheck = function (data) {
        if (JSON.stringify(Object.keys(data)) === JSON.stringify(this.schema)) {
            return true;
        }
        else
            return false;
    };
    Index.prototype.noSchema = function () {
        this.schema = undefined;
    };
    Index.prototype.create_UUID = function () {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Index.prototype["delete"] = function (uuid) {
        delete this.value[uuid];
        var index = this.uuid.indexOf(uuid);
        this.uuid.splice(index, 1);
        return this.value;
    };
    Index.prototype.deleteByIndex = function (index) {
        var uuid = this.uuid[index];
        delete this.value[uuid];
        this.uuid.splice(index, 1);
        return this.value;
    };
    Index.prototype.getByIndex = function (index) {
        var uuid = this.uuid[index];
        return this.value[uuid];
    };
    Index.prototype.get = function (uuid) {
        return this.value[uuid];
    };
    Index.prototype.getByValue = function (key2, value) {
        var obj = this.value;
        return obj[Object.keys(obj).find(function (key) { return JSON.stringify(obj[key][key2]) === JSON.stringify(value); })];
    };
    Index.prototype.getId = function (value) {
        var obj = this.value;
        return Object.keys(obj).find(function (key) { return JSON.stringify(obj[key]) === JSON.stringify(value); });
    };
    Index.prototype.getAllOf = function (key2, value) {
        var obj = this.value;
        var key = Object.keys(obj);
        var main = [];
        for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
            var i = key_1[_i];
            if (JSON.stringify(obj[i][key2]) === JSON.stringify(value)) {
                main.push(obj[i]);
            }
        }
        return main;
    };
    Index.prototype.getAll = function () {
        return this.value;
    };
    Index.prototype.getAllOrdered = function () {
        var _this = this;
        var ar = [];
        this.uuid.forEach(function (value) {
            ar.push(_this.value[value]);
        });
        return ar;
    };
    Index.prototype.length = function () {
        var key = Object.keys(this.value);
        return key.length;
    };
    Index.prototype.getIdByIndex = function (index) {
        return this.uuid[index];
    };
    //*custum indexes
    Index.prototype.createIndex = function (keyName) {
        this.index[keyName] = {};
        return keyName;
    };
    Index.prototype.useIndex = function (uuid, indexName, data) {
        if (this.index[indexName][data[indexName]]) {
            this.index[indexName][data[indexName]].push(uuid);
        }
        else {
            this.index[indexName][data[indexName]] = [uuid];
        }
    };
    Index.prototype.getIndex = function () {
        return this.index;
    };
    Index.prototype.getByCustomIndex = function (indexName, indexValue) {
        var _this = this;
        var value = [];
        this.index[indexName][indexValue].forEach(function (uuid) {
            value.push(_this.value[uuid]);
        });
        return value;
    };
    Index.prototype.deleteByCustomIndex = function (indexName, indexValue) {
        var _this = this;
        this.index[indexName][indexValue].forEach(function (uuid) {
            _this["delete"](uuid);
        });
    };
    Index.prototype.update = function (uuid, value, key) {
        if (key)
            this.value[uuid][key] = value;
        else
            this.value[uuid] = value;
    };
    Index.prototype.updateByIndex = function (index, value, key) {
        if (key)
            this.value[this.uuid[index]][key] = value;
        else
            this.value[this.uuid[index]] = value;
    };
    Index.prototype.updateAllOf = function (searchKey, searchValue, valuetoupdate, updatingKey) {
        for (var _i = 0, _a = Object.keys(this.value); _i < _a.length; _i++) {
            var i = _a[_i];
            if (JSON.stringify(this.value[i][searchKey]) === JSON.stringify(searchValue)) {
                if (!updatingKey)
                    this.value[i] = valuetoupdate;
                else
                    this.value[i][updatingKey] = valuetoupdate;
            }
        }
    };
    Index.prototype.updateByCustomIndex = function (indexName, indexValue, valuetoupdate, updatingKey) {
        var _this = this;
        this.index[indexName][indexValue].forEach(function (uuid) {
            if (updatingKey)
                _this.value[uuid][updatingKey] = valuetoupdate;
            else
                _this.value[uuid] = valuetoupdate;
        });
    };
    return Index;
}());

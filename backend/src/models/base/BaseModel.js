const mongoose = require('mongoose');

class BaseModel {
    static get schema() {
        throw new Error('Schema must be defined in child class');
    }

    static get modelName() {
        throw new Error('Model name must be defined in child class');
    }

    static getModel() {
        if (!this._model) {
            this._model = mongoose.model(this.modelName, this.schema);
        }
        return this._model;
    }
}

module.exports = BaseModel;
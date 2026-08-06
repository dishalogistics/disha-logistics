class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async findById(id, select = '') {
        return this.model.findById(id).select(select);
    }

    async findOne(filter, select = '') {
        return this.model.findOne(filter).select(select);
    }

    async find(filter = {}, select = '', options = {}) {
        return this.model.find(filter).select(select).setOptions(options);
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }

    async exists(filter) {
        return this.model.exists(filter);
    }

    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }
}

module.exports = BaseRepository;
const User = require('../models/auth/User');
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this.findOne({ email }, '+password');
    }

    async findByIdWithPassword(id) {
        return this.findById(id, '+password');
    }
}

module.exports = new UserRepository();
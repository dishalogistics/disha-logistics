const RefreshToken = require('../models/auth/RefreshToken');
const BaseRepository = require('./base.repository');

class RefreshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshToken);
    }

    async findByHash(hash) {
        return this.findOne({ tokenHash: hash, isRevoked: false });
    }

    async revoke(id) {
        return this.update(id, { isRevoked: true });
    }
}

module.exports = new RefreshTokenRepository();
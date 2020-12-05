const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnivSchema = new Schema({
    univId: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('univ', UnivSchema);
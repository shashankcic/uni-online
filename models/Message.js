const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('message', MessageSchema);
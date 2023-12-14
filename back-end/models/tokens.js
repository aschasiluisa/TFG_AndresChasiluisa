const mongoose = require('mongoose')
Schema = mongoose.Schema

const TokensSchema = new Schema({
    Usuario: {
        type: String,
        required: true,
        unique: true,
        index: true,
        max: 100
    },
    Token: {
        type: String,
        required: true,
    }
}, {collection: "tokens"});

module.exports = mongoose.model('tokensSchema', TokensSchema);
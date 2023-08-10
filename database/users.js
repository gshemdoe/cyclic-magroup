const mongoose = require('mongoose')
const Schema = mongoose.Schema

const botUsersSchema = new Schema({
    chatid: {type: Number},
    first_name: {type: String},
    botname: {type: String}
}, {timestamps: true, strict: false})

const model = mongoose.model('botusers', botUsersSchema)
module.exports = model
const mongoose = require("mongoose");
const { Schema } = mongoose
const articSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    credit:String,
    thumbnail: String,
    author: String,
})

const Profile = mongoose.model('Profile', articSchema)

module.exports = Profile;
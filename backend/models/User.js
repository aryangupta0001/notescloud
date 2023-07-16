const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // unique: true                                                         // It will set email as a unique id & it will be added to indexes.
    },

    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
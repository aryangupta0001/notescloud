const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        default: null
    },
    
    tags: {
        type: String,
        default: "general"
    },
    
    user: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

    
})


module.exports = mongoose.model("notes", NotesSchema);
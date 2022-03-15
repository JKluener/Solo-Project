const mongoose = require("mongoose");


const GameSchema = new mongoose.Schema({
    opponent:{
        type: String,
        required: [true, "Name is required in this field!"],
        minLength: [3, "Name must be at least 3 characters long!"]
    },
    homeBoolean:{
        type: Boolean,
        required: [true],
    },
    score:{
        type: String,
    },
    scorers: {
        type: Array
    },
    roster: {
        type: Array,
        maxLength: [23]
    }

}, {timestamps: true})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
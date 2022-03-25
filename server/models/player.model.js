const mongoose = require("mongoose");


const PlayerSchema = new mongoose.Schema({
    name:{
        type: Object,
        required: [true, "Name is required in this field!"],
        minLength: [3, "Name must be at least 3 characters long"]
    },
    year:{
        type: Object,
        required: [true, "You must select a year"],
    },
    positionGroup:{
        type: Object,
        required: [true, "You must select a position group"]
    },
    preferredPositions: {
        type: Array,
        of: Object,
        required: [true]
    },
    gamesPlayed: {
        type: []
    }

}, {timestamps: true})

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
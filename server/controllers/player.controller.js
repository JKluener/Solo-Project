const { redirect } = require('express/lib/response');
const Player = require('../models/player.model');

module.exports = {
    createPlayer: (req, res)=>{
        Player.create(req.body)
            .then((newPlayer)=>{
                res.json(newPlayer);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getOnePlayer: (req, res)=>{
        Player.findById({_id: req.params.id})
            .then((player)=>{
                res.json(player);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getAllPlayers: (req, res)=>{
        Player.find({}).collation({locale:'en',strength: 2}).sort({name: 1})
        .then((allPlayers)=>{
            res.json(allPlayers);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    getAllForwardPlayers: (req, res)=>{
        Player.find({positionGroup: "Forward"}).collation({locale:'en',strength: 2}).sort({})
        .then((allPlayers)=>{
            res.json(allPlayers);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    getAllBackPlayers: (req, res)=>{
        Player.find({positionGroup: "Back"}).collation({locale:'en',strength: 2}).sort({})
        .then((allPlayers)=>{
            res.json(allPlayers);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    deletePlayer: (req, res)=>{
        Player.deleteOne({_id: req.params.id})
        .then((deletedPlayer)=>{
            res.json(deletedPlayer);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    editPlayer: (req, res)=>{
        Player.findByIdAndUpdate({_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedPlayer)=>{
                res.json(updatedPlayer);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getByName: (req, res)=>{
        Player.find({name: req.params.name})
            .then((player)=>{
                res.json(player);
                res.redirect('/players/:id')
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },
}
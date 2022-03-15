const Game = require('../models/game.model');
const PlayerController = require("../controllers/player.controller");


module.exports = {
    createGame: (req, res)=>{
        Game.create(req.body)
            .then((newGame)=>{
                res.json(newGame);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
        PlayerController.editPlayer;
    },

    getOneGame: (req, res)=>{
        Game.findById({_id: req.params.id})
            .then((game)=>{
                res.json(game);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getAllGames: (req, res)=>{
        Game.find({}).collation({locale:'en',strength: 2}).sort()
        .then((allGames)=>{
            res.json(allGames);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    deleteGame: (req, res)=>{
        Game.deleteOne({_id: req.params.id})
        .then((deletedGame)=>{
            res.json(deletedGame);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    editGame: (req, res)=>{
        Game.findByIdAndUpdate({_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedGame)=>{
                res.json(updatedGame);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
        PlayerController.editPlayer;
    },
}
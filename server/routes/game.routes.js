const GameController = require("../controllers/game.controller");

module.exports = (app) =>{
    app.get('/api/games', GameController.getAllGames);
    app.post('/api/games', GameController.createGame);
    app.put('/api/games/:id', GameController.editGame);
    app.delete('/api/games/:id', GameController.deleteGame);
    app.get('/api/games/:id', GameController.getOneGame);
}
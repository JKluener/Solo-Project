const PlayerController = require("../controllers/player.controller");

module.exports = (app) =>{
    app.get('/api/players', PlayerController.getAllPlayers);
    app.get('/api/players/backs', PlayerController.getAllBackPlayers);
    app.get('/api/players/forwards', PlayerController.getAllForwardPlayers);
    app.post('/api/players', PlayerController.createPlayer);
    app.put('/api/players/:id', PlayerController.editPlayer);
    app.delete('/api/players/:id', PlayerController.deletePlayer);
    app.get('/api/players/:id', PlayerController.getOnePlayer);
}
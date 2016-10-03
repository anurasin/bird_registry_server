var birdController = require("../controllers/birds");

var routesAPI = function(app){
	app.get('/birds', birdController.getAllBirds);
	app.get('/birds/:birdid', birdController.getOneBird);
	app.post('/birds', birdController.addBird);
    app.delete('/birds/:birdid', birdController.deleteBirdById);
}

module.exports = routesAPI;
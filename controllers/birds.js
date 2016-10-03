var birdsModel = require('../models/birds');

var birdsController = {};

birdsController.getAllBirds = function(req, res){
    var birdsData = birdsModel.getAllBirds();
    birdsData.then(function(data){
        var response = {};
        response.status='success';
        response.data=data;
        res.send(response);
    }, function(err){
        res.send(err);
    });
};

birdsController.getOneBird = function(req, res){
    var birdid = req.params.birdid;
    var birdData = birdsModel.getOne(birdid);

    birdData.then(function(data){
        var response = {};
        response.status='success';
        response.data=data;
        res.send(response);
    }, function(err){
        res.status(400);
        res.send(err);
    });
};

birdsController.addBird = function(req, res){
    var requestBody = req.body;
    console.log(requestBody);
    var birdData = birdsModel.addBird(requestBody);
    birdData.then(function(data){
        var response = {};
            response.status='success';
            response.data=data;
            res.send(response);
        }, function(err){
            res.status(400);
            res.send(err);
    });
};

birdsController.deleteBirdById = function(req, res){
    var birdid = req.params.birdid;
    var birdData = birdsModel.deleteBirdById(birdid);

    birdData.then(function(data){
        var response = {};
        response.status='success';
        response.data=data;
        res.send(response);
    }, function(err){
        res.status(400);
        res.send(err);
    });
};

module.exports = birdsController;
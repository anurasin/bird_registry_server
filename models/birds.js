var mongoose = require('mongoose');
var uuid = require('node-uuid');
var q = require('q');

//defining schema for bird table
var birdSchema = new mongoose.Schema({
	  id: { type: String, required: true },
	  name: { type: String, required: true },
	  continents: { type: String, required: true },
	  added: { type: String, required: true },
	  visible: { type: Boolean, required: true },
	  family: { type: String, required: true },
	  continents: { type: [String], required: true }
});

var BirdDBModel = mongoose.model('Birds', birdSchema);

var birdsModel = {};

//function to get all birds
birdsModel.getAllBirds = function(){
	var results = q.defer();

	BirdDBModel.find(function(err, bird_result) {
		if (err){
			results.reject(err);
		}

		results.resolve(bird_result);
	});

	return results.promise;
}

//function to get single bird by its id.
birdsModel.getOne = function(id){
	var results = q.defer();

	if(!id){
		results.reject({status:'error', error:'bird Id is missing.'});
	}

	BirdDBModel.findOne({id:id},function(err, bird_result) {
		if (err){
			results.reject(err);
		}

		if(bird_result){
			results.resolve(bird_result);
		} else{
			results.reject({status:'error', error:'Invalid bird ID.'});
		}

	});

	return results.promise;
}

//function to add a single bird.
birdsModel.addBird= function(inputData){
    var results = q.defer();
    console.log(inputData);
    inputData = validateBirdData(inputData);

    if(!inputData){
        results.reject({status:'error', error:'bird data is not valid.'});
    }

    console.log(inputData);
    var newBird = new BirdDBModel(inputData);
    newBird.save(function(err, bird) {
      if(err){
        console.dir(err + ' error occurred while creating a new bird');
        results.reject(err);
      }
      if(bird){
        results.resolve(bird);
      } else{
        results.reject({status:'error', error:'Invalid bird schema'});
      }

    });

    return results.promise;
}

//function to delete bird by id
birdsModel.deleteBirdById = function(birdId){
    var results = q.defer();

    if(!birdId){
        results.reject({status:'error', error:'bird Id is missing.'});
    }

    BirdDBModel.remove({ id: birdId }, function(err) {
        if (!err) {
            results.resolve({});
        }
        else {
            results.reject({status:'error', error:'Invalid bird ID.'});
        }
    });

    return results.promise;
}

function validateBirdData(birdData){
    if(!birdData.hasOwnProperty("name") || !birdData.hasOwnProperty("continents") || !birdData.hasOwnProperty("family")){
        return false;
    }

    if(Array.isArray(birdData.continents) && typeof birdData["name"] === "string" && typeof birdData["family"] === "string")
    {
        if(!birdData.hasOwnProperty("visible")){
            birdData["visible"] = false;
        }

        var currentDate = new Date();
        var dateString = currentDate.toISOString();
        birdData["added"] = dateString.substr(0, dateString.indexOf("T"));
    }

    birdData["id"] = uuid.v1();
    return birdData;
}

function arrayLengthGreaterOne(val) {
  return val.length > 1;
}

module.exports = birdsModel;
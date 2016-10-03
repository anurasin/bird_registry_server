var apis = require("./apis");

var routes = function(app){
    // initializing routes
    apis(app);
}

module.exports = routes;
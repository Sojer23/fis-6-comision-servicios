var server = require('./srcApi/server.js');
var mongoose = require('mongoose');
var ApiKey = require('./srcApi/models/apikeys.js');
var Comision = require('./srcApi/models/comisiones.js');
var port = (process.env.PORT || 3000);
var dbUrl = (process.env.DB || 'mongodb://admin6:comision_servicios6@ds137404.mlab.com:37404/fis-6-comision-servicios'
|| 'mongodb://localhost:27017');

console.log("Starting API server...");
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    server.app.listen(port);

    if(dbUrl === process.env.DB){
        console.log("Coneccted to Database! (REMOTE)")
    }else{
        console.log("Coneccted to Database! (LOCAL)")
    }
    

    console.log("Server ready!");

    if (ApiKey.find((err, apikeys) => {
        if (apikeys.length == 0) {
            var testUser = new ApiKey({user: "fis06", password: "asdf"});
            testUser.save(function(err, user) {
                if(err) {
                    console.log(err);
                  } else {
                    console.log('user: ' + user.user + ", "+ user.apikey + " saved.");
                  }
            });        
        }

    }));
});

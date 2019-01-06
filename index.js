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
        console.log("DB: "+ dbUrl)
        console.log("APIKEY: "+process.env.APIKEY);
        console.log("Connected to Database! (REMOTE)")
    }else{
        console.log("Connected to Database! (LOCAL)")
    }
    

    console.log("Server ready!");

    // Borra todas las API key en la base de datos
    ApiKey.deleteMany({}, (err, numRemoved)=>{
        console.log("APIKEYS eliminadas:"+ numRemoved.n)
    });

    // Aqui creamos un usuario propio con nuestra API key en una variable de entorno.
    // TODO: me parece una solucion algo cutre. (Esto ya estaba puesto de antes con un user de test)
    if (ApiKey.find((err, apikeys) => {
        console.log("Número de APIKEYS guardadas: "+apikeys.length)
        if (apikeys.length == 0) {
            var testUser = new ApiKey({user: "app", password: "app_pass",apikey:process.env.APIKEY});
            testUser.save(function(err, user) {
                if(err) {
                    console.log(err);
                  } else {
                    console.log('Usuario añadido ==> user: ' + user.user + ", "+ user.apikey + " saved.");
                  }
            });        
        }

    }));
});

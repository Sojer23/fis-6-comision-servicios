var server = require('./srcApi/server.js');
var mongoose = require('mongoose');
var ApiKey = require('./srcApi/models/apikeys.js');
var Comision = require('./srcApi/models/comisiones.js');
var port = (process.env.PORT || 3000);
var dbUrl = (process.env.DB || 'mongodb://localhost/test');

console.log("Starting API server...");
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    server.app.listen(port);

    if(dbUrl === process.env.DB){
        console.log("DB: "+ dbUrl)
        console.log("APIKEY: "+process.env.APIKEY);
        console.log("Conectado a la base de datos! (REMOTE)")
    }else{
        console.log("Conectado a la base de datos! (LOCAL)")
    }
    

    console.log(Date()+" - Servidor en funcionamiento!");

    // Borra todas las API key en la base de datos
    ApiKey.deleteMany({}, (err, numRemoved)=>{
        console.log(Date()+" - APIKEYS eliminadas:"+ numRemoved.n);
    });

    // Aqui creamos un usuario propio con nuestra API key en una variable de entorno.
    // TODO: me parece una solucion algo cutre. (Esto ya estaba puesto de antes con un user de test)
    if (ApiKey.find((err, apikeys) => {
        if (apikeys.length == 0) {
            var testUser = new ApiKey({user: "app", password: "app_pass",apikey:process.env.APIKEY});
            testUser.save(function(err, user) {
                if(err) {
                    console.log(err);
                  } else {
                    console.log(Date()+' - Usuario añadido ==> user: ' + user.user + ", "+ user.apikey);
                  }
            });        
        }

    }));
});

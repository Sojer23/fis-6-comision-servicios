var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var researchersResource = require('./researchersResource.js');

var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get(baseAPI + "/researchers", (req, response) => {
    console.log("GET /researchers"); 

    researchersResource.getAllResearchers()
        .then((body) => {
            response.send(body);
        }).catch((error) => {
            console.log('error:'+error);
            response.sendStatus(500);
        });

});

app.listen(port, () => {
    console.log("Server up and running!!");
});
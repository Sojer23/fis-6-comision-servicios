var urljoin = require('url-join');
var request = require('request-promise-native').defaults({json: true});
var CommandFactory = require('hystrixjs').commandFactory;
var researchersServer = (process.env.RESEARCHERS_URL || 'http://localhost:3000/api/v1/'); // TODO: check url is right.
var researchersKey = (process.env.RESEARCHERS_APIKEY || '9806869c-22f0-4834-8025-77607ad275f6-52ad-41ae-887c-34c029d48242'); // Using heroku apikey as given by that group.

function researchersResource(url) {
    return urljoin(researchersServer, url, '?apikey='+researchersKey);
}

function getAllResearchersBase() {
    var url = researchersResource("/researchers");
    console.log(url);
    return request.get(url);
}

function getResearcherByDNIBase(){
    var url = researchersResource("/researchers/00000001A")
    console.log(url);
    return request.get(url);
}


var getAllResearchersCommand = CommandFactory.getOrCreate("Get Researchers")
    .run(getAllResearchersBase)
    .timeout(1000)
    .build()

var getResearcherByDNICommand = CommandFactory.getOrCreate("Get Researcher by DNI")
    .run(getResearcherByDNIBase)
    .timeout(1000)
    .build()

function getAllResearchers() {
    return getAllResearchersCommand.execute();
}

function getResearcherByDNI(){
    return getResearcherByDNICommand.execute();
}


module.exports = {
    getAllResearchers,
    getResearcherByDNI
}

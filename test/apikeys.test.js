var chai = require('chai');
var mongoose = require('mongoose');
var ApiKeyDB = require('../srcApi/models/apikeys');
var expect = chai.expect;


describe('ApiKey DB Tests', () => {

    before((done) => {
        var dbUrl = (process.env.DB || 'mongodb://localhost/test');
        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            done();
        });          
    });

    beforeEach((done) => {
        // Code to repeat before each test here...
        ApiKeyDB.deleteMany({}, (err) => {
            done();
        });      
    });

    it('write an apikey in the DB', (done) => {
        var mApikey = new ApiKeyDB(
            {user:"prueba",pasword:"prueba"}
        );
        mApikey.save((err, apikey) => {
            expect(err).is.null;
            ApiKeyDB.find({}, (err, apikeys) => {
                expect(err).is.null;
                expect(apikeys).to.have.lengthOf(1);
                done();
            });
        });
    });

   it('check apikey generation',(done) => {
    var mApikey = new ApiKeyDB(
        {user:"prueba",pasword:"prueba"}
    );
        mApikey.save((err, apikey) => {
            expect(err).is.null;
            ApiKeyDB.findOne({"user": apikey.user},(err,apikey)=>{
                expect(err).is.null;
                expect(apikey).not.null;
                expect(apikey.apikey).not.null;
                done();
            });
         });
    });

    it('delete an apikey from the DB',(done) => {
        var mApikey = new ApiKeyDB(
            {user:"prueba",pasword:"prueba"}
        );

        mApikey.save((err, apikey) => {
            expect(err).is.null;
            ApiKeyDB.deleteOne({"user": apikey.user},(err)=>{
                expect(err).is.null;
                ApiKeyDB.find({}, (err, apikeys) => {
                    expect(err).is.null;
                    expect(apikeys).to.have.lengthOf(0);
                    done();
                });
            });
         });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {

            ApiKeyDB.find((err, apikeys) => {
                console.log("Número de APIKEYS guardadas: "+apikeys.length)
                if (apikeys.length == 0) {
                    var testUser = new ApiKeyDB({user: "app", password: "app_pass",apikey:process.env.APIKEY});
                    testUser.save(function(err, user) {
                        if(err) {
                            console.log(err);
                          } else {
                            console.log('Usuario añadido después de test ==> user: ' + user.user + ", "+ user.apikey + " saved.");
                            mongoose.connection.close(done);
                          }
                    });        
                }
        
            })
        });
    });   
});

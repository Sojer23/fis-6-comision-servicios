var chai = require('chai');
var mongoose = require('mongoose');
var Comision = require('../srcApi/models/comisiones');
var ComisionDB = Comision.Comision;
var expect = chai.expect;


describe('Comision DB Tests', () => {

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
        ComisionDB.deleteMany({}, (err) => {
            done();
        });      
    });

    it('write a comision in the DB', (done) => {
        var comision = new Comision(
            {investigadorID: "00000001A",
                destino: "Cádiz",
                fechaInicio: "2018/10/29",
                fechaFin: "2018/10/31",
                sustitutoID: "00000002B",
                razon: "Beca de Movilidad",
                coste: 200,
                proyectoID: "TB-001",
                estado: "SOLICITADA"
            }
        );
        ComisionDB.save((err, comision) => {
            expect(err).is.null;
            ComisionDB.find({}, (err, comisiones) => {
                expect(err).is.null;
                expect(comisiones).to.have.lengthOf(1);
                // More "expects" could be done
                done();
            });
        });
    });

   it('update a comision in the DB',(done) => {
        var comision = new Comision(
            {investigadorID: "00000001A",
                destino: "Cádiz",
                fechaInicio: "2018/10/29",
                fechaFin: "2018/10/31",
                sustitutoID: "00000002B",
                razon: "Beca de Movilidad",
                coste: 200,
                proyectoID: "TB-001",
                estado: "SOLICITADA"
            }
        );

        ComisionDB.save((err, comision) => {
            expect(err).is.null;
            // Update comision
            comision.destino = "Malaga";
            ComisionDB.findOneAndUpdate({"investigadorID": comision.investigadorID},comision,(err,updatedComision)=>{
                expect(err).is.null;
                expect(updatedComision).not.null;
                expect(updatedComision.destino).equals("Malaga");
                done();
            });
         });
    });

    it('delete a comision from the DB',(done) => {
        var comision = new Comision(
            {investigadorID: "00000001A",
                destino: "Cádiz",
                fechaInicio: "2018/10/29",
                fechaFin: "2018/10/31",
                sustitutoID: "00000002B",
                razon: "Beca de Movilidad",
                coste: 200,
                proyectoID: "TB-001",
                estado: "SOLICITADA"
            }
        );

        ComisionDB.save((err, comision) => {
            expect(err).is.null;
            ComisionDB.deleteOne({"investigadorID": comision.investigadorID},(err)=>{
                expect(err).is.null;
                ComisionDB.find({}, (err, comisiones) => {
                    expect(err).is.null;
                    expect(comisiones).to.have.lengthOf(0);
                    done();
                });
            });
         });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });    
})

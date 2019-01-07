var server = require('../srcApi/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var Comision = require('../srcApi/models/comisiones').Comision;
//var ApiKey = require('../apikeys');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Comisions API', () => {

    before(() => {
        //var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
        //ApiKeyStub.yields(null, new ApiKey({user: "test"}));
        process.env.APIKEY = 'C6DFA0B215B2CF24EF04794F718A3FC8'
    })

    it('hola mundo de prueba', (done) => {
        var x = 3;
        var y = 5;

        var resultado = x + y;

        expect(resultado).to.equal(8);
        done();
    });


    describe('GET /', () => {
        it('should return HTML', (done) => {
            chai.request(server.app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });

    //TODO: // Get comision unica por su ID

    // Para el administrador puede solicitar todo
    describe('GET /comisiones', () => {
        var apikey = process.env.APIKEY;
        //console.log(apikey);
        var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "15/10/2019", fechaFin: "15/09/2020", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
        var comisionMock = sinon.mock(comision);
        comisionMock.expects('cleanup').returns({"investigadorID": 0, "destino": "Londres", "fechaInicio": "15/10/2019", "fechaFin": "15/09/2020", "sustitutoID": 1, "razon" : "Ninguna", "coste":1000, "proyectoID" : 1, "estado":"SOLICITADA" });

        var ComisionStub = sinon.stub(Comision, 'find');
        ComisionStub.yields(null, [comision]);

        it('should return all comisiones', (done) => {
            chai.request(server.app)
                .get('/api/v1/comisiones')
                .query({apikey: apikey})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    comisionMock.verify();
                    done();
                });
        });

    });

    //TODO: // Para cada investigador le damos sus comisiones

    //TODO: // Comisiones de cada proyecto
    /*describe('GET /comisiones proyecto', () => {
        var apikey = process.env.APIKEY;
        var proyectoID = 1
        //console.log(apikey);
        var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "15/10/2019", fechaFin: "15/09/2020", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
        var comisionMock = sinon.mock(comision);
        comisionMock.expects('cleanup').returns({"investigadorID": 0, "destino": "Londres", "fechaInicio": "15/10/2019", "fechaFin": "15/09/2020", "sustitutoID": 1, "razon" : "Ninguna", "coste":1000, "proyectoID" : 1, "estado":"SOLICITADA" });
        var ComisionStub = sinon.stub(Comision, 'find');
        ComisionStub.yields(null, [comision]);

        it('should return all comisiones', (done) => {
            chai.request(server.app)
                .get('/api/v1/comisiones')
                .query({apikey: apikey, proyectoID: proyectoID })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    comisionMock.verify();
                    done();
                });
        });
    });*/

    // POST
    describe('POST /comisiones', () => {
        var apikey = process.env.APIKEY;
        after(function(){
          Comision.create.restore();
        });
        it('should create a new comision', (done) => {
            var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "15/10/2019", fechaFin: "15/09/2020", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').withArgs(comision).yields(null);

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: apikey})
                .send(comision)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    dbMock.verify();
                    done();
                });

        });
    });
  describe('POST /comisiones', () => {
        var apikey = process.env.APIKEY;
        it('should return 500 if fails', (done) => {
            var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "15/10/2019", fechaFin: "15/09/2018", sustitutoID: 1, razon : "Ninguna", coste:-2,proyectoID : 1, estado:"estadomal" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').withArgs(comision).yields(true);

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: apikey})
                .send(comision)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });

        });
    });

    //TODO: //LOAD a bunch of comisiones

    //TODO: // Put para que el administrador cambie el estado

    //TODO: //Remove all comisiones

    //TODO: // deleteComisionById

});

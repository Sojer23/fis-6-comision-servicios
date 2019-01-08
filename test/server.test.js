var server = require('../srcApi/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var Comision = require('../srcApi/models/comisiones').Comision;
var ApiKey = require('../srcApi/models/apikeys');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Comisions API', () => {

    before(() => {
        var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
        ApiKeyStub.yields(null, new ApiKey({user: "test"}));
    })

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

    describe('GET /comisiones', () => {

        var fechaInicio = '2019-10-15';
        var fechaFin = '2020-10-15';
        var comision = new Comision({"investigadorID": 0, "destino": "Londres", "fechaInicio": fechaInicio, "fechaFin": fechaFin, "sustitutoID": 1, "razon" : "Ninguna", "coste":1000, "proyectoID" : 1, "estado":"SOLICITADA" });

        // Para el administrador puede solicitar todo
        it('should return all comisiones', (done) => {
          var comisionMock = sinon.mock(comision);
          comisionMock.expects('cleanup').returns(comision);

          var ComisionStub = sinon.stub(Comision, 'find');
          ComisionStub.yields(null, [comision]);
            chai.request(server.app)
                .get('/api/v1/comisiones')
                .query({apikey: "test"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    comisionMock.verify();
                    done();
                });
        });

        // Get comision unica por su ID
        it('Should return one comision', (done) => {
          chai.request(server.app)
              .get('/api/v1/comisiones')
              .query({apikey: "test"})
              .send({_id:1})
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                done();
              });

        });

    });


    // POST
    describe('POST /comisiones', () => {
        after(function(){
          Comision.create.restore();
        });
        it('should create a new comision', (done) => {
            var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "2019-10-15", fechaFin: "2020-10-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });

            var ComisionStub = sinon.stub(Comision, 'create');
            ComisionStub.yields(null, null);

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(comision)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });

        });
    });
  describe('POST /comisiones WRONG', () => {
        it('(wrong comision.investigadorID) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({ destino: "Londres", fechaInicio: "2019-10-15", fechaFin: "2018-09-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.fechaInicio) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, destino: "Londres", fechaFin: "2018-09-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.fechaFin) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, destino: "Londres", fechaInicio: "2018-09-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.destino) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, fechaInicio: "2018-09-15", fechaFin: "2019-09-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.razon) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, destino: "Londres", fechaInicio: "2018-09-15", fechaFin: "2019-09-15", sustitutoID: 1, coste:1000,proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.coste) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, destino: "Londres", fechaInicio: "2018-09-15", fechaFin: "2019-09-15", razon: "ninguna", sustitutoID: 1, proyectoID : 1, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
        it('(wrong comision.proyectoID) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({investigadorID: 1, destino: "Londres", fechaInicio: "2018-09-15", fechaFin: "2019-09-15", razon: "ninguna", sustitutoID: 1, coste:1000, estado:"SOLICITADA" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('create').never();

            chai.request(server.app)
                .post('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
    });

    // PUT
    //TODO: // Put para que el administrador cambie el estado
    describe('PUT /comisiones', () => {
        after(function(){
          Comision.update.restore();
        });
        it('should change the state of a comision', (done) => {
            var comision = new Comision({investigadorID: 0, destino: "Londres", fechaInicio: "2019-10-15", fechaFin: "2020-10-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"SOLICITADA" });

            var ComisionStub = sinon.stub(Comision, 'update');
            ComisionStub.yields(null, null);

            chai.request(server.app)
                .put('/api/v1/comisiones')
                .query({apikey: "test"})
                .send( comision)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });
    describe('PUT /comisiones WRONG', () => {
        it('(wrong comision.estado) should return 422 if wrong comision ', (done) => {
            var badComision = new Comision({ destino: "Londres", fechaInicio: "2019-10-15", fechaFin: "2018-09-15", sustitutoID: 1, razon : "Ninguna", coste:1000,proyectoID : 1, estado:"wrongEstado" });
            var dbMock = sinon.mock(Comision);
            dbMock.expects('update').never();

            chai.request(server.app)
                .put('/api/v1/comisiones')
                .query({apikey: "test"})
                .send(badComision)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    dbMock.verify();
                    done();
                });

        });
    });

    // DELETE
    // deleteComisionById
    describe('DELETE /comisiones by id', () => {
        after(function(){
          Comision.remove.restore();
        });
        it('should return 200 and delete every comision ', (done) => {
            var ComisionStub = sinon.stub(Comision, 'remove');
            ComisionStub.yields(null, null);

            chai.request(server.app)
                .delete('/api/v1/comisiones/0')
                .query({apikey: "test"})
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });
    describe('DELETE /comisiones by id [NO REMOVED]', () => {
      after(function(){
        Comision.remove.restore();
      });
        it('should return 404  ', (done) => {
            var ComisionStub = sinon.stub(Comision, 'remove');
            ComisionStub.yields(null, 0);

            chai.request(server.app)
                .delete('/api/v1/comisiones/0')
                .query({apikey: "test"})
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });

        });
    });
    describe('DELETE /comisiones by id [WITH ERROR]', () => {
      after(function(){
        Comision.remove.restore();
      });
        it('should return 500  ', (done) => {
            var ComisionStub = sinon.stub(Comision, 'remove');
            ComisionStub.yields(true,null);

            chai.request(server.app)
                .delete('/api/v1/comisiones/0')
                .query({apikey: "test"})
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });

        });
    });

});


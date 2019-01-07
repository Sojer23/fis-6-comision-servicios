const chai = require('chai')
chai.use(require('chai-things'));
const provider = require('./mockServer/provider')
const researchersResource = require('./researchersResource')
const interactions = require('./mockServer/interactions');

const expect = chai.expect

describe('researchers api', () => {
    before(() => provider.setup());

    after(() => provider.finalize());
    
    afterEach(() => provider.verify());

    describe('#getAllResearchers', () => {
        before(done => {
            provider.addInteraction(interactions.getResearcherList)
                .then(() => {
                    done();
                })
        });

        it('should get researcher list from server', (done) => {
            researchersResource.getAllResearchers()
              .then((researchers) => {
                expect(researchers).to.have.lengthOf(3);
                expect(researchers).to.contain.an.item.with.property('name', 'Miguel');
                expect(researchers).to.contain.an.item.with.property('name', 'Manuel');
                expect(researchers).to.contain.an.item.with.property('name', 'José');
                done();
              }, done);
        }) 
    });

    describe('#getResearcherByDNI', () => {
        before(done => {
            provider.addInteraction(interactions.getResearcherByDNI)
                .then(() => {
                    done();
                })
        });

        it('should get a specific researcher by dni from server', (done) => {
            researchersResource.getResearcherByDNI()
              .then((researchers) => {
                expect(researchers).to.have.lengthOf(1);
                expect(researchers).to.contain.an.item.with.property('name', 'Manuel');
                expect(researchers).to.contain.an.item.with.property('dni','00000001A')
                done();
              }, done);
        }) 
    });
})
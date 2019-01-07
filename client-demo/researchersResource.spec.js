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
            provider.addInteraction(interactions.getContactList)
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
    })

    // TODO: hace run test con un get por dni
})
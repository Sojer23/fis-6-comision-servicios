const chai = require('chai')
chai.use(require('chai-things'));
const provider = require('./mockServer/provider')
const contactsResource = require('./contactsResource')
const interactions = require('./mockServer/interactions');

const expect = chai.expect

describe('contacts api', () => {
    before((done) => {
        provider.setup().then(() => done());
    })

    after((done) => {
        provider.finalize().then(() => done());        
    })

    describe('#getAllContacts', () => {
        it('should get contact list from server', (done) => {
            provider.addInteraction(interactions.getContactList)
              .then(() => {
                  return contactsResource.getAllContacts();
              })
              .then((contacts) => {
                expect(contacts).to.have.lengthOf(1);
                expect(contacts).to.contain.an.item.with.property('name', 'Foo');
                expect(contacts).to.contain.an.item.with.property('phone', 777);
              })
              .then(() => {
                  provider.verify();
                  done();
              })
              .catch((error) => {
                  done(error);
              })
              
        }) 
    })
})
require('../helper');

const path = require('path');
const artefactor = require('../../../artefact');

const expect = require('chai').expect;

const mock = require('mock-fs');
const mocks = require('../../mocks');

describe('Artefact', () => {  
  describe('filesFor', () => {
    before(() => {
      console.log()
      mock(mocks.artefacts.contacts);    
    });

    after(() => {
      mock.restore();
    })    
    
    // TODO: use mock-fs to mock file system of artefact   
    let rootPath = 'contacts';
    let type = 'ui';
    let lib = 'bootstrap'; 
    let version = '2.3.1';

    it('should return entryObj', async () => {
      let artefact = await artefactor.load(rootPath);
      let result = await artefact.filesFor({type, lib, version});

      // TODO: fix pickBy in entryObj(), should return result wrapped by type key?
      // { ui: { path: './ui/bootstrap' } }

      // Current results: 
      // pickBy { '^2.0.0': { path: './ui/bootstrap' } }
      // reduce { 'bootstrap': { path: './ui/bootstrap' } }
      console.log('result', result)
      expect(result.bootstrap.path).to.eql('./ui/bootstrap');       
    });
  });
});

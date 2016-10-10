require('./helper');

const path = require('path');
const artefactor = require('../../artefact');

const expect = require('chai').expect;

require('./helper');

// const Bluebird = require('bluebird');
// const Promise = Bluebird;
// const fs = require('fs-promise');
// let fsp = Promise.promisifyAll(require('fs'));

const mock = require('mock-fs');
const mocks = require('./mocks');

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
      // const fs = require('fs-promise');
      // let mapFile = await fs.readJson('contacts/ui/map.json');
      // console.log('mapFile', mapFile);

      let artefact = await artefactor.load(rootPath);
      // console.log('artefact', artefact);

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

require('./helper');

const path = require('path');
const pipeline = require('../../pipeline');

const expect = require('chai').expect;

const mock = require('mock-fs');
const mocks = require('./mocks');

describe('Pipeline', () => {  
  describe('transform', () => {
    before(() => {
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
      const fs = require('fs-promise');
      let mapFile = await fs.readJson('contacts/ui/map.json');

      console.log('mapFile', mapFile);

      let artefact = await artefactor.load(rootPath);
      console.log('artefact', artefact);

      let result = await artefact.filesFor({type, lib, version});
      console.log('result', result)
      // expect(result.app).to.eql({vue: '2.0.1'});       
    });
  });
});

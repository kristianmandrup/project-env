require('../../helper');

const path = require('path');
const actions = require('../../../../pipeline/file/actions');

const expect = require('chai').expect;

const mock = require('mock-fs');
const mocks = require('../../../mocks');

describe('File actions', () => {  
  before(() => {
    // mock the contacts component
    mock(mocks.artefacts.contacts);

    // mock the vue app
    mock(mocks.projects.vueApp);
  });

  after(() => {
    mock.restore();
  })    

  describe('write using descriptor', () => {
    it('should ask to overwrite, then write a file if confirmed', async () => {
      let result = await actions.write(descriptor)
      expect(result).to.eql(descriptor.content);    
    });
  });

  describe('overwrite using descriptor with overwrite set', () => {
    it('should write a file, no questions asked', async () => {
      let result = await actions.write(descriptor)
      expect(result).to.eql(descriptor.content);        
    });
  });
});
    

require('../../helper');

const path = require('path');
const { actions, createDescriptor } = require('../../../../pipeline/file');

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

  // TODO: make it a class
  let config = {
    action: 'move',
    paths: {
      content: 'Hello world',
      dest: 'vueApp/client/components/Hello.vue'
    }    
  }
  
  let descriptor = createDescriptor(config);

  describe('write using descriptor', async () => {
    it('should ask to overwrite, then write a file if confirmed', async () => {
      let writeAction = await actions.write(descriptor);
      expect(writeAction.config).to.eql(config);

      let result = await writeAction.excute();
      expect(result).to.eql(true);    
    });
  });
});
    

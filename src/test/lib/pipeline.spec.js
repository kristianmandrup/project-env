require('./helper');

const path = require('path');
const Pipeline = require('../../pipeline');

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

    let fileMap = {
      'view-models': {
        lib: 'vue',
        rootPath: 'view-models',
        files: [
          'item.js',
          'details.js', 
          'list.js'
        ]
      },
      ui: {
        lib: 'bootstrap',
        rootPath: 'ui/bootstrap'
        files: [
          'details.html',
          'item.html',
          'list.html'
        ]        
      }
    };

    let projectEnv = {
      app: {
        vue: '2.0.1'
      },
      viewModels: {
        vue: '2.0.1'
      },
      ui: {
        bootstrap: '3.2.1'
      }
    };
    
    const pipeline = new Pipeline(projectEnv, fileMap);

    it('should return output fileMap', async () => {
      let result = await pipeline.transform();
      console.log('result', result)       
    });
  });
});

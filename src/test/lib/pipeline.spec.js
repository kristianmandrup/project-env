require('./helper');

const path = require('path');
const Pipeline = require('../../pipeline');

const expect = require('chai').expect;

const mock = require('mock-fs');
const mocks = require('./mocks');

describe('Pipeline', () => {  
  describe('transform', () => {
    before(() => {
      // mock the contacts component
      mock(mocks.artefacts.contacts);

      // mock the vue app
      mock(mocks.projects.vueApp);
    });

    after(() => {
      mock.restore();
    })    

    // TODO:
    // Use schema generator to generate/test different configurations based on schema rules 
    // https://www.npmjs.com/package/json-schema-generator

    let fileMap = mocks.fileMaps.contacts;

    let projectEnv = {
      app: {
        vue: '2.0.1'
      },
      viewModels: {
        vue: '2.0.1'
      },
      views: {
        vue: '2.0.1'
      },
      store: {
        vuex: '2.0.1'
      },
      ui: {
        bootstrap: '3.2.1'
      }
    };

    let project = {
      rootPath: 'vueApp',
      env: projectEnv
    }
    
    const pipeline = new Pipeline({project, fileMap});

    // the pipeline should take the viewModels, views (in ui) and styles and put them in .vue files

    it('should return output fileMap', async () => {
      let result = await pipeline.execute();
      console.log('result', result)       
    });
  });
});

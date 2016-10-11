require('../helper');

const path = require('path');
const PathMapper = require('../../../semantic').PathMapper;

const expect = require('chai').expect;

const mock = require('mock-fs');
const mocks = require('../../mocks');

describe('SemanticPathMapper', () => {  
  describe('create', () => {
    before(() => {
      // mock the contacts component
      mock(mocks.artefacts.contacts);

      // mock the vue app
      mock(mocks.projects.vueApp);
    });

    after(() => {
      mock.restore();
    })    

    let fileMap = mocks.fileMaps.contacts;

    let projectEnv = {
      app: {
        vue: '2.0.1'
      },
      viewModels: {
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
    
    const pathMapper = new SemanticPathMapper({project, fileMap});

    // Expected result:
    // {
    //   paths: {
    //     './components' {
    //       category: components,
    //       files: [
    //         'Paginater.vue': {
    //           type: 'extension',
    //           use: 'pagination'
    //         }
    //       ]
    //     },
    //     './views': {
    //       category: 'views',
    //       files: {
    //         'App.vue': {
    //           place: 'root',
    //           type: 'container',
    //           contains: [
    //             'Contacts.vue',
    //             'TopeMenu.vue'
    //           ]
    //         },
    //         'TopMenu.vue': {
    //           type: 'menu',
    //           belongsTo: ['App.vue']
    //         }
    //         'Contacts.vue': {
    //           type: 'list',
    //           belongsTo: ['App.vue'] 
    //         }
    //       }
    //     },
    //     './store': {
    //       category: 'store',
    //       files: {
    //         'index.js': {
    //           place: 'root',
    //           contains: [
    //             'actions.js',
    //             'mutations.js'
    //           ]
    //         },
    //         'actions.js': {
    //           type: 'actions',
    //           belongsTo: ['index.js']
    //         },
    //         'mutations.js': {
    //           type: 'mutations'
    //           belongsTo: ['index.js']
    //         }
    //       }            
    //     }
    //     // ...
    //   },
    //   categories: {
    //     components: './components',
    //     views: './views'
    //     store: './store',
    //     // ...
    //   }
    // }

    it('should return map of project paths with their semantics', async () => {
      let result = await pathMapper.map();
      console.log('result', result)       
    });
  });
});

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

describe('Artefact', () => {  
  describe('filesFor', () => {
    before(() => {
      mock({
        'contacts':  {
          'artefact.json': `
            {
              "name": "my-project",
              "env": {
                "ui": {
                  "bootstrap": "2.0.1"
                }
              }
            }
          `,
          'map.json': `
            {
              "ui": {
                "vue": {
                  "versions": {
                    "^2.0.0": {
                      "path": "./ui/vue"
                    }                    
                  }                  
                }            
              }
            }
          `,
          'ui': {
            'vue': {
              'details.html': `<template><h1>{{message}}</h1></template>`
            }            
          }
        }          
      });    
    });

    after(() => {
      mock.restore();
    })    
    
    // TODO: use mock-fs to mock file system of artefact   
    let rootPath = 'contacts';
    let type = 'ui', 
        lib = 'bootstrap', 
        version = '2.3.1';

    it('should return entryObj', async () => {
      const fs = require('fs-promise');
      let mapFile = await fs.readJson('contacts/map.json');

      console.log('mapFile', mapFile);

      let artefact = await artefactor.load(rootPath)
      console.log('artefact', artefact);

      let result = artefact.filesFor({type, lib, version});
      console.log('result', result)
      // expect(result.app).to.eql({vue: '2.0.1'});       
    });
  });
});

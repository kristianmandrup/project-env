require('./helper');

const Bluebird = require('bluebird');
const Promise = Bluebird;

const fs = require('fs-promise');
const readFile = require('fs-readfile-promise');
let fsa = require('fs-extra-promise');
fsa.usePromise(Bluebird);
let fsp = Promise.promisifyAll(require('fs'));

const path = require('path');
const mock = require('mock-fs');

const expect = require('chai').expect;

describe('FileIO', () => {
  before(() => {
    mock({
      'map.json': `
        {
          "ui": {
            "vue": {
              "path": "./ui/vue"
            }            
          }
        }
      `,
      'details.html': `<template><h1>{{message}}</h1></template>`
    });    
  })

  after(() => {
    mock.restore();
  })    

  describe('map.json', () => {            
    it('should contain path to ui files', async () => {   
      let result = await fs.readJson('./map.json');          
      console.log('result', result);             
      expect(result.ui.vue.path).to.eql('./ui/vue');
    });
  });

  describe('ui template file', () => {            
    it('should contain template', () => {   
      let result = fs.readFileSync('./details.html', 'utf8');          
      console.log('result', result);             
      expect(result).to.match(/message/);
    });
  });

  describe('ui template file - async', () => {            
    it('should contain template', async () => {   
      let result = await fsp.readFileAsync('./details.html', 'utf8');          
      console.log('result', result);             
      expect(result).to.match(/message/);
    });
  });
});

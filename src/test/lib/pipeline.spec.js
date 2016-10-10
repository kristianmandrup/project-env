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

    };

    let projectEnv = {

    };
    
    const pipeline = new Pipeline(projectEnv, fileMap);

    it('should return output fileMap', async () => {
      let result = await pipeline.transform();
      console.log('result', result)       
    });
  });
});

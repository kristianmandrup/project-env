require('./helper');
const path = require('path');
const prj = require('../../project');

const expect = require('chai').expect;

describe('Project', () => {
  describe('filter', () => {  
    let project = {
      package: require('../../../fixtures/my-project/package.json'),
      rootPath: path.resolve(path.join(__dirname, '../../../fixtures/my-project'))
    }

    it('should return project app env', async () => {
      let result = await prj.filter(project);
      console.log('result', result)
      expect(result.app).to.eql({vue: '2.0.1'});       
    });
  });
});


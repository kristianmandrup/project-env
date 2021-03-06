require('../helper');
const path = require('path');
const { buildEnv } = require('../../../project');

const expect = require('chai').expect;
const fixtures = '../../../../fixtures';

describe('Project', () => {
  describe('filter', () => {  
    let project = {
      package: require(`${fixtures}/my-project/package.json`),
      rootPath: path.resolve(path.join(__dirname, fixtures, 'my-project'))
    }

    it('should return project app env', async () => {
      let result = await buildEnv(project);
      console.log('result', result)
      expect(result.app).to.eql({vue: '2.0.1'});       
    });
  });
});


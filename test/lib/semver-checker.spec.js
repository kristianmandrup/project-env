const SemverChecker = require('../../lib/semver-checker');

const env = require('../env/vue-app.json');
const package = require('../../my-project/package.json');

const expect = require('chai').expect;

console.log('package', package);

describe('SemVer', () => {
  describe('satisfies("vue", 0.1.1)', () => {
    let semVer = new SemverChecker(env)

    it('should be false', () => {   
      let result = semVer.satisfies('vue', '1.1.1');   
      console.log('result', result);      
      expect(result).to.eql(true);       
    });
  });

  describe('satisfiesAll(projectEnv)', () => {
    let projectEnv = {
      // load from file!?
    };

    it('should return satisfy map', () => {   
      let result = semVer.satisfiesAll(projectEnv);   
      console.log('result', result);      
      expect(result).to.eql(true);       
    });
  });    
});

require('./helper');
const SemverChecker = require('../../semver-checker');

const fixtures = require('../../../fixtures');

console.log('fixtures', fixtures);

// TODO: generate project env from real project with package.json
// const package = require('../../my-project/package.json');
// console.log('package', package);

const expect = require('chai').expect;

describe('SemVer', () => {
  describe('satisfies("vue", 0.1.1)', () => {
    let artefactEnv = fixtures.artefacts.components.contacts.env;
    let projectEnv = fixtures.projects.vueApp.env;

    let semVerChecker = new SemverChecker(artefactEnv);
    // console.log('artefactEnv', artefactEnv)
    // console.log('projectEnv', projectEnv)

    it('should return satisfy map', () => {   
      let result = semVerChecker.satisfies(projectEnv);   
      console.log('result', result); 
      //  { app: { vue: false }, test: { mocha: false }, ui: { bootstrap: true }, styling: {} }     
      expect(result.app.vue).to.eql(false);
      expect(result.test.mocha).to.eql(false);
      expect(result.ui.bootstrap).to.eql(true);
      expect(result.styling).to.eql({});       
    });
  });
});

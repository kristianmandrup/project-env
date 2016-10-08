const semver = require('semver');
// const libMap = require('./lib-map.json');
// const filter = require('./filter');
const { pick } = require('lodash');

export default class SemverChecker {
  // the environment of the component
  constructor(artefactEnv) {
    this.artefactEnv = artefactEnv;
  }

  satisfies(key, version) {
    return semver.satisfies(version, this.artefactEnv[key]);
  }

  satisfiesAll(projectEnv) {
    // for (let type of Object.keys(libMap)) {
    //   pick(projectEnv[type], (key, version) => {
    //     return semver.satisfies(version, this.artefactEnv[key]);
    //   })    
    // }
  }
}

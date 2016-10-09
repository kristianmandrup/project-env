const semver = require('semver');
const libMap = require('./library/map.json');
// const filter = require('./filter');
const { pick } = require('lodash');

class ArtefactTypeChecker {
  // the environment of the component
  constructor(artefactTypeEnv) {
    this.artefactTypeEnv = artefactTypeEnv;
  }

  satisfies(key, version) {
    // console.log('Artefact satisfies?', key, version);
    let artefactLibVersionRange = this.artefactTypeEnv[key];
    if (!artefactLibVersionRange) {
      return false;
    }
    // console.log('test vs. version range', artefactLibVersionRange);
    return semver.satisfies(version, artefactLibVersionRange);
  }
}

class EnvChecker {
  // the environment of the component
  constructor(projectEnv, artefactEnv) {
    this.projectEnv = projectEnv;
    this.artefactEnv = artefactEnv;
  }

  satisfyType(type) {
    try {
      let projectEnvType = this.projectEnv[type];
      let artefactEnvType = this.artefactEnv[type];

      // console.log('satisfy::', type, projectEnvType, artefactEnvType)
      if (!projectEnvType || !artefactEnvType) {
        return {};
      }

      return Object.keys(projectEnvType).reduce( (satisfyMap, key) => {
        let version = projectEnvType[key];
        
        // console.log('artefactEnvType::', artefactEnvType);
        let satisfies = new ArtefactTypeChecker(artefactEnvType).satisfies(key, version);
        // console.log('satisfies', satisfies);
        satisfyMap[key] = satisfies;
        return satisfyMap;
      }, {});    
    } catch (err) {
      console.error(err);
    }
  }
}

export default class SemverChecker {
  // the environment of the component
  constructor(artefactEnv) {
    this.artefactEnv = artefactEnv;
  }

  satisfies(projectEnv) {
    return Object.keys(libMap).reduce( (satisfyMap, type) => {
      let typeSatisfyMap = new EnvChecker(projectEnv, this.artefactEnv).satisfyType(type);
      satisfyMap[type] = satisfyMap[type] || {};
      satisfyMap[type] = typeSatisfyMap;
      return satisfyMap;
    }, {});
  }
}

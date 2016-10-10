// ```
// /ui
//   - map.json
//   - UI.md
//   /default
//     - list.html
//     - item.html
// ``

// The `map.json` file will be used to identify a matching UI framework.

// ```json
// {
//   "bootstrap": {
//     "site": "getbootstrap.com",
//     "versions": {
//       "default": {
//         "status": "stable",
//         "paths": {
//           "main": "bootstrap/v1",
//           "views": "bootstrap/v1/stable/views",
//         },
//         "dependencies": {
//         }
//       },

const path = require('path');
const semver = require('semver');
const ArtefactMap = require('./map');
const _ = require('lodash');

class LibVersion {
  constructor(artefactType, {lib, version}) {
    this.artefactType = artefactType;
    this.map = artefactType.map;
    this.type = artefactType.type;
    this.lib = lib;
    this.version = version;
  }

  get entryObj() {
    let lib = this.map[this.lib];
    let versions = this.map[this.lib].versions
    // return _.pickBy(versions, (obj, versionRange) => {
    //   return semver.satisfies(this.version, versionRange)
    // });  

    return Object.keys(versions).reduce( (res, versionRange) => {
      // res[this.lib] = res[this.lib] || {}
      if (semver.satisfies(this.version, versionRange)) {
        res[this.lib] = versions[versionRange];         
      } 
      return res;
    }, {});  

  }
}

export default class ArtefactType {
  constructor({type, rootPath, env}) {
    this.type = type;
    this.rootPath = rootPath;
    this.env = env;
  }

  get typeEnv() {
    return this.env[this.type];
  }

  get typePath() {
    return path.join(this.rootPath, this.type);
  }

  // load map.json
  async read() {
    let mapped = await new ArtefactMap({type: this.type, path: this.rootPath}).read();
    this.map = mapped.map;
    return this;
  }

  // lib and version of project environment
  // TODO: make async when returning files
  filesFor({lib, version}) {
    return new LibVersion(this, {lib, version}).entryObj;  
  }
}
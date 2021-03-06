const fs = require('fs-promise');
const path = require('path');
const ArtefactMap = require('./type/map');
const ArtefactType = require('./type');

class Artefact {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  async read() {
    this.config = await this.readConfig();
    return this;
  }

  get artefactPath() {
    return path.join(this.rootPath, 'artefact.json');
  }

  // load artefact.json
  async readConfig() {
    return await fs.readJson(this.artefactPath)
  }

  get types() {
    return Object.keys(this.env);   
  }

  get env() {
    return this.config.env;  
  }

  async filesFor({type, lib, version}) {
    let artefactType = new ArtefactType({type: type, env: this.env, rootPath: this.rootPath});
    artefactType = await artefactType.read();
    // console.log('read artefactType', artefactType);
    return artefactType.filesFor({lib, version});    
  }
}

export default {
  clazz: Artefact,
  load: async function(rootPath) {
    try {    
      let artefact = new Artefact(rootPath);
      return await artefact.read();
    } catch (err) {
      console.error('ERROR', err);
    }
  }
}
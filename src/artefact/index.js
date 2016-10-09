const fs = require('fs-promise');
const path = require('path');
const ArtefactMap = require('./map');

class Artefact {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  async read() {
    this.config = await this.readConfig();
    this.map = await new ArtefactMap(this.rootPath).read().map;
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

  env() {
    return this.config.env;  
  }

  filesFor({type, lib, version}) {
    let artefactType = new ArtefactType({type: type, env: this.env, rootPath: this.rootPath)
    return artefactType.filesFor({lib, version});    
  }
}

export default {
  clazz: Artefact,
  load: async function(rootPath) {
    return await new Artefact(rootPath).read();
  }
}
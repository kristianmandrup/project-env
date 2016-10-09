const fs = require('fs-promise');
const path = require('path');

class Artefact {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  async read() {
    this.config = await this.readConfig();
    this.map = await this.readMap();
    return this;     
  }

  get artefactPath() {
    return path.join(this.rootPath, 'artefact.json');
  }

  get mapPath() {
    return path.join(this.rootPath, 'map.json');
  }

  // load artefact.json
  async readConfig() {
    return await fs.readJson(this.artefactPath)
  }

  env() {
    return this.config.env;  
  }

  // load map.json
  async readMap() {
    return await fs.readJson(this.mapPath)
  }

  filesFor({type, lib, version}) {
    this.env[type]    
  }
}

export default {
  clazz: Artefact,
  load: async function(rootPath) {
    return await new Artefact(rootPath).read();
  }
}
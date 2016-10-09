const path = require('path');
const fs = require('fs-promise');

// base class for any class which uses map.json
export default class ArtefactMap {
  constructor({type, path}) {
    this.path = path;
    this.type = type;
  }

  async read() {
    try {
      this.map = await this.readMap();
      return this;     
    } catch (err) {
      console.error(err);
      return this;
    }
  }

  get mapPath() {
    return path.join(this.path, this.type, 'map.json');
  }  

  // load map.json
  async readMap() {
    console.log('read map path:', this.mapPath);
    return await fs.readJson(this.mapPath);
  }  
}
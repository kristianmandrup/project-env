const path = require('path');
const fs = require('fs-promise');

// base class for any class which uses map.json
export default class ArtefactMap {
  constructor(rootPath) {
    this.rootPath = rootPath;
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
    return path.join(this.rootPath, 'map.json');
  }  

  // load map.json
  async readMap() {
    console.log('read map file', this.mapPath);
    let obj = await fs.readJson(this.mapPath);
    console.log('obj', obj);
    return obj;
  }  
}
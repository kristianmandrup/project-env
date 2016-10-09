// base class for any class which uses map.json
export default class ArtefactMap {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  async read() {
    this.map = await this.readMap();
    return this;     
  }

  get mapPath() {
    return path.join(this.rootPath, 'map.json');
  }  

  // load map.json
  async readMap() {
    return await fs.readJson(this.mapPath)
  }  
}
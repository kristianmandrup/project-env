// Filters a project model
const libMap = require('./lib-map.json');

export default class Library {
  constructor(project, name) {
    this.name = name;    
  }

  get packagePath() {
    return path.join(project.rootPath, 'node_modules', name, 'package.json');
  }

  async get package() {
    return await fs.readJson(this.packagePath);
  }

  get nameAndversion() {
    return {name: package.name, version: package.version};
  }  

  get version() {
    return package.version;
  }  
}



// Filters a project model
const libMap = require('./lib-map.json');

class Lib {
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

class Project {
  constructor(project, {type = 'app'}) {
    this.project = project;   
    this.type = type;
  }

  get typedLibMap() {
    return libMap[this.type];
  }

  get libsOfType() {
    return Object.keys(typedLibMap);
  }

  get projectLibs() {
    return Object.keys(project.libMap);
  }
    
  filteredLibs() {
    return _.filter(projectLibs, (lib) => return this.libsOfType.includes(lib));
  }
  

  get libNameAndVersionMap() {
    return this.filteredLibs.reduce( (res, libName) => {
      res[libName] = new Lib(project, libName).version;
      return res;
    }, {});
  }  
}

export default class LibFilter {
  constructor(project, opts = {depKey = 'dependencies', type = 'app'}) {
    project.libMap = project.env[depKey];    
    this.project = new Project(project, {type: type}); 
  }

  // walk through all lib dependencies in projectLibMap
  // find version via node_modules/[lib]/package.json 
  get libNameAndVersionMap() {
    return this.project.libNameAndVersionMap;
  }
}
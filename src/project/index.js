const Library = require('../library');

export default class Project {
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
      res[libName] = new Library(project, libName).version;
      return res;
    }, {});
  }  
}

function filter(project, opts = {depKey = 'dependencies', type = 'app'}) {
    project.libMap = project.env[depKey];    
    this.project = new Project(project, {type: type});
    return this.project.libNameAndVersionMap; 
  }
}

export default {
  filter: filter,
  clazz: Project 
}
const Library = require('../library');
const _ = require('lodash');
const libMap = require('../library/map');

class Project {
  constructor(project, {type = 'app'}) {
    this.project = project;   
    this.type = type;
  }

  get libsOfType() {
    return libMap[this.type];
  }

  get projectLibs() {
    return Object.keys(this.project.libMap);
  }
    
  get filteredLibs() {
    console.log('project libs', this.projectLibs, this.libsOfType);
    return _.filter(this.projectLibs, (lib) => this.libsOfType.includes(lib));
  }


  async version(libName) {
    let lib = await new Library(this.project, libName).read();
    console.log('version lib', lib.conf, lib.version);
    return lib.version;
  }

  async reducer(res, libName) {
    console.log('lib:', libName);
    res[this.type] = res[this.type] || {};
    res[this.type][libName] = await this.version(libName);
    return res;
  }

  async libNameAndVersionMap() {
    console.log('libs', this.filteredLibs);
    try {
      return await this.filteredLibs.reduce(this.reducer.bind(this), {});
    } catch (err) {
      console.error(err);
      return {};
    }    
  }  
}

async function buildEnv(project, opts = {depKey: 'dependencies', type: 'app'}) {
  // console.log('filter project', project);

  project.libMap = project.package[opts.depKey || 'dependencies'];   
  let prj = new Project(project, {type: opts.type || 'app'});
  return await prj.libNameAndVersionMap();
}

export default {
  buildEnv: buildEnv,
  clazz: Project 
}
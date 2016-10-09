// Filters a project model
const fs = require('fs-promise');
const path = require('path');
const libMap = require('./map');

export default class Library {
  constructor(project, name) {
    this.name = name;
    this.project = project;    
    this.package = project.package;
  }

  async read() { 
    this.config = await this.packageConfig(); 
    return this;
  }

  get packagePath() {
    return path.join(this.project.rootPath, 'node_modules', this.name, 'package.json');
  }

  async packageConfig() {
    try {
      console.log('packagePath', this.packagePath);
      return await fs.readJson(this.packagePath);
    } catch (err) {
      console.error('ERROR', err);
      return {};
    }    
  }

  get nameAndversion() {
    return {name: this.config.name, version: this.version};
  }  

  get version() {
    return this.config.version;
  }  
}



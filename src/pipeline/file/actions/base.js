// TODO: Perhaps use inquirer-promise when it is updated
const inquirer = require('inquirer');

class Base {
  constructor(descriptor) {
    this.descriptor = descriptor;
    this.srcPath = descriptor.srcPath;
    this.destPath = descriptor.destPath;
    this.ask = inquirer.prompt;     
    this.fs = require('fs-promise');
    this.exists = {};
  }

  async init() {    
    this.exists.srcPath = await this.exists(this.srcPath);
    if (this.destPath)
      this.exists.destPath = await this.exists(this.destPath);      
  }

  // single question object
  async question(q) {
    return await this.ask([q]);
  }

  async exists(path) {
    try {
      await fs.stat(path);
      return true;  
    } catch (err) {
      return false;
    }          
  }
}

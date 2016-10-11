// TODO: Perhaps use inquirer-promise when it is updated
const inquirer = require('inquirer');

// For inspiration:
// See https://github.com/kristianmandrup/ai-core/blob/master/lib/utils/io.js

class Base {
  constructor(descriptor) {
    this.descriptor = descriptor;
    this.paths = descriptor.paths;
    this.srcPath = descriptor.srcPath || descriptor.paths.src;
    this.destPath = descriptor.destPath || descriptor.paths.dest;
    this.ask = inquirer.prompt;     
    this.fs = require('fs-promise');
    this.exists = {};
  }

  async init() {    
    this.exists.srcPath = await this.exists(this.srcPath);
    if (this.destPath)
      this.exists.destPath = await this.exists(this.destPath);

    return this;      
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

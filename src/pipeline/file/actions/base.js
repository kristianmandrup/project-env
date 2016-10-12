// TODO: Perhaps use inquirer-promise when it is updated
const inquirer = require('inquirer');
const fs = require('fs-promise');

// For inspiration:
// See https://github.com/kristianmandrup/ai-core/blob/master/lib/utils/io.js

export default class Base {
  // use validated config object of descriptor
  constructor({config}) {
    this.config = config;
    this.paths = config.paths || {};
    // TODO: clean up?
    this.srcPath = this.paths.src;
    this.destPath = this.paths.dest;

    this.ask = inquirer.prompt;     
    this.fs = fs;
    this.exists = {};
  }

  async init() {    
    this.exists.srcPath = await this.fileExists(this.srcPath);
    if (this.destPath)
      this.exists.destPath = await this.fileExists(this.destPath);

    return this;      
  }

  async perform(fun) {
    try {
      await fun();
      return true;
    } catch (err) {
      return false;
    }
  }        

  // pose a single question
  async question(q) {
    return await this.ask([q(this)]);
  }

  async fileExists(path) {
    try {
      await fs.stat(path);
      return true;  
    } catch (err) {
      return false;
    }          
  }
}

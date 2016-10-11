// TODO: Perhaps use inquirer-promise when it is updated
const inquirer = require('inquirer');

// For inspiration:
// See https://github.com/kristianmandrup/ai-core/blob/master/lib/utils/io.js

export default class Base {
  // use validated config object of descriptor
  constructor({config}) {
    this.config = config;
    this.paths = config.paths;
    // TODO: clean up?
    this.srcPath = config.paths.src;
    this.destPath = config.paths.dest;

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

  // pose a single question
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

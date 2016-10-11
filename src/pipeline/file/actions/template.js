const Base = require('./base');
const { overwrite } = require('./questions')
const { templator } = require('./utils');

class Template extends Base {
  // templator is a factory function({destination, template, data, render}) which can create a template
  // - destination contains info on the destination, ie. where to generate the output file
  // - template contains info on where to find the template
  // - data is the data object sent to the template
  // - render is optional (ejs by default)
  constructor(descriptor, {templator = templator}) {
    super(descriptor);
    this.data = descriptor.data;
    this.template = descriptor.template; // TODO: we should have a template registry and find by name! 
    this.createTemplator(templator);
  }

  createTemplator() {
    let destination = {
      fullPath: this.destPath
    };

    this.templator = templator({
      destination, 
      template: this.template, 
      data: this.template.data
    });
  }

  async generate() {
    return await this.templator.generate();
  }

  async execute() {
    if (!this.exists.srcPath) return;

    if (this.exists.destPath) {
      let { doOverwrite } = await this.question(overwrite);
      if (!doOverwrite) return;
    }

    return await this.generate();    
  }  
}

async function create(descriptor) {
  let action = new Template(descriptor)
  return await action.init(); 
}

export default create;
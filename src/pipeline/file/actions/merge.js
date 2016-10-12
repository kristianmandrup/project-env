const Base = require('./base');

class Merge extends Base {
  constructor(descriptor) {
    super(descriptor);
  }

  // use json-path, see ai-core
  async merge() {
  }

  async execute() {
    if (!this.exists.srcPath) return;
    if (!this.exists.destPath) return;

    await this.merge({
      paths: this.paths,
      mergePath: this.mergePath // json-path ie. point to merge
    });    
  }  
}

async function create(descriptor) {
  let action = new Merge(descriptor)
  return await action.init(); 
}

export default create;
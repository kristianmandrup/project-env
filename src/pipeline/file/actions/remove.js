const Base = require('./base');
const { remove } = require('./questions')

class Remove extends Base {
  constructor(descriptor) {
    super(descriptor);
  }

  async execute() {
    if (!this.fileExists) return;

    // Are you sure?
    let { doRemove } = await this.question(remove);
    if (!doRemove) return;

    return await this.perform(this.removeFile);        
  }

  async removeFile() {
    await fs.removeFile(this.path);
  }    
}

async function create(descriptor) {
  let action = new Remove(descriptor)
  return await action.init(); 
}

export default create;
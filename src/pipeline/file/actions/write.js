const Base = require('./base');
const { overwrite } = require('./questions')

class Write extends Base {
  constructor(descriptor) {
    super(descriptor);
  }

  async execute() {
    if (!this.exists.srcPath) return;

    if (this.exists.destPath) {
      let { doOverwrite } = await this.question(overwrite);
      if (!doOverwrite) return;
    }

    await fs.writeFile(this.target, this.content, 'utf8');    
  }  
}

async function create(descriptor) {
  let action = new Write(descriptor)
  return await action.init(); 
}

export default create;
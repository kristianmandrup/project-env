const Base = require('./base');
const { remove, overwrite } = require('./questions')

class Move extends Base {
  constructor(descriptor) {
    super(descriptor);
  }

  async execute() {
    if (!this.exists.srcPath) return;

    // Are you sure?
    let { doMove } = await this.question(move);
    if (!doRemove) return;

    if (this.exists.destPath) {
      let { doOverwrite} await this.question(overwrite);
      if (!doOverwrite) return;
    }

    await fs.move(this.path, this.target);    
  }  
}

async function create(descriptor) {
  let action = new Move(descriptor)
  return await action.init(); 
}

export default create;
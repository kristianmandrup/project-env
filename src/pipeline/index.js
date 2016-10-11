const Registry = require('./registry');
const {StepRegistry} = require('./step');

export default class Pipeline {
  constructor({project, fileMap}) {
    this.conf = {
      fileRegistry: new Registry(),
      project: project, // includes rootPath and env  
      fileMap: fileMap,
      stepRegistry: new StepRegistry({config: this.conf})
    }
  }

  execute() {
    stepRegistry
      .activate('read')
      .activate('write');
  }
}

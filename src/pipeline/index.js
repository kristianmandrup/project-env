const Registry = require('./registry');

export default class Pipeline {
  constructor({project, fileMap}) {
    this.registry = new Registry();
    this.project = project; // includes rootPath and env  
    this.fileMap = fileMap; 
  }

  registerStep(type, step) {
    let stepContainer = this.steps[type];
    if (stepContainer)
      this.steps[type].push(step);
  }

  activateStep(step) {
    step.activate({
      project: this.project, 
      registry: this.registry
    })
  }

  execute() {
  }
}

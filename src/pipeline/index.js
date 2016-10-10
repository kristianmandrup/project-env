const Registry = require('./registry');

export default class Pipeline {
  constructor(projectEnv, fileMap) {
    this.registry = new Registry();
    this.projectEnv = projectEnv;
    this.fileMap = fileMap; 
  }

  registerStep(type, step) {
    let stepContainer = this.steps[type];
    if (stepContainer)
      this.steps[type].push(step);
  }

  activateStep(step) {
    step.activate({
      projectEnv: this.projectEnv, 
      registry: this.registry
    })
  }

  transform() {
  }
}

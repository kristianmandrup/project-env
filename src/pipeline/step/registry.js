const _ = require('lodash');

export default class StepRegistry {
  constructor({readSteps, writeSteps, identity}) {
    // enable override of step identity function
    this.identity = identity || this.identity; 

    // set up initial empty step containers
    this.steps = {
      read: readSteps || [],
      write: writeSteps || []
    }    
  }

  identity(entry) {
    return entry.id === step.id;    
  }

  container(type) {
    return this.steps[type] || this.noSuchContainer(type);
  } 

  noSuchContainer(type) {
    throw `no such step container ${type}`;
  }
  
  register(type, step) {    
    this.container(type).push(step);
  }

  unregister(type, step) {    
    _.remove(this.container(type), this.identity); 
  }

  find(type, step) {    
    _.find(this.container(type), this.identity); 
  }
} 

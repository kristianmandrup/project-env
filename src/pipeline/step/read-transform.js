// User can build pipeline from one or more steps
const BaseStep = require('./base');

// Has access to original file map, the file descriptor and file content.
// Can define the name of the registry entry and what to store there.    

export default class ReadTransformStep extends BaseStep {
  constructor(descriptor, content) {
    this.descriptor = descriptor;
    this.content = content; 
  }

  transform() {    
  }  
}
// User can build pipeline from one or more steps
const BaseStep = require('./base');
const file = require('../file');

// Has access to original file map, the file descriptor and file content.
// Can define the name of the registry entry and what to store there.    

export default class TransformStep extends BaseStep {
  constructor(descriptor, {Transformer = file.Transformer, Reader = file.Reader}) {
    super();
    this.descriptor = descriptor;
    this.transformer = new Transformer();
    this.reader = new Reader(); // to read/parse as json etc          
  }

  async init() {
    this.srcCode = await reader.readFile(descriptor);
  }    

  javascripter() {
    return new file.JavaScripter(this.srcCode);
  }

  transform() {    
  }  
}
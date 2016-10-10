// User can build pipeline from one or more steps
const BaseStep = require('./base');
const file = require('../file');

// Has access to the full registry and the registry entry.
// Can build a valid output file descriptor to store in file map to be output.

export default class FileActionStep extends BaseStep {
  constructor(entry, registry, {Writer = file.Writer}) {
    super();
    this.entry = entry;
    this.registry = registry;
  }
 
  fileActionDescriptor() {
    return {
      action: 'write',
      onConflict: 'overwrite',
      content: this.entry.content
      targetPath: this.entry.path
    }    
  }
}

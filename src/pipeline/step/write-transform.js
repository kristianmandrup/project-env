// User can build pipeline from one or more steps
const BaseStep = require('./base');

// Has access to the full registry and the registry entry.
// Can build a valid output file descriptor to store in file map to be output.

export default class WriteTransformStep extends BaseStep {
  constructor(entry, registry) {
    this.entry = entry;
    this.registry = registry;
  }

  transform() {    
  }
}
const Validator = require('jsonschema').Validator;

// TODO: perhaps use json-schema !?
class FileDescriptor {
  constructor({
    mergePath, // place in json sructure to merge
    filePath, // obj includes src and dest
    content, // file content of src file
    template, // obj includes path and data
    action, // File action to perform
    meta // any extra meta data
  }) {

    // filtering only relevant properties
    this.config = {
      action,
      mergePath, 
      filePath, 
      content,
      template, 
      meta
    };
  } 

  // TODO: use decorator
  get validator() {
    return this._v = this._v || new Validator();    
  }

  get schema() {
    return this._s = this._s || require('./schema');
  }

  // validate props
  validate() { 
    let errors = this.doValidation().errors; 
    return errors.length > 0 ? this.format(errors) : true;
  } 

  format(errors) {
    let messages = errors.map(error => {
      let indx = error.property.indexOf('.');
      return [error.property.slice(indx + 1), error.message].join(' ');
    });

    return  {
      messages,
      result: false
    };    
  }

  doValidation() {
    return this.validator.validate(this.config, this.schema);
  }
}

function create(props = {}) {
  return new FileDescriptor(props);
}

export default create; 

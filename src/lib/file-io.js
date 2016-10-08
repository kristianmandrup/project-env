const fs = require('fs-promise');
 
// TODO: Use readJson/writeJson directly from json-io
// https://www.npmjs.com/package/fs-extra#readjsonfile-options-callback
class FileIo {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // return single .json file for that entity
  // See: https://www.npmjs.com/package/fs-promise
  async item() {
    console.log('item path', filePath);
    return await fs.readFile(filePath, 'utf8');
  }
}

module.exports = {
  clazz: FileIo,
  create: function(filePath) {
    return new FileIo(filePath);
  }
}
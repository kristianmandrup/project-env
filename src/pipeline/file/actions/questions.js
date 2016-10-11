export default {
  remove: {
    name: 'doRemove',
    message: `remove ${this.path}`
    type: 'confirm',
    default: true
  },
  overwrite: {
    name: 'doOverwrite',
    message: `overwrite ${this.path}`
    type: 'confirm',
    default: true
  }   
}
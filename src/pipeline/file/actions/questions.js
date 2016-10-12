export default {
  remove: function (action) {
    return {
      name: 'doRemove',
      message: `remove ${action.path}`,
      type: 'confirm',
      default: true
    }
  },
  overwrite: function (action) {
    return {
      name: 'doOverwrite',
      message: `overwrite ${action.path}`,
      type: 'confirm',
      default: true
    }
  }   
}
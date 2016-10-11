export default {
  contacts: {
    name: 'contacts',
    viewModels: {
      lib: 'vue',
      rootPath: 'view-models',
      files: [
        'item.js',
        'details.js', 
        'list.js'
      ]
    },
    config: {
      lib: 'vue',
      rootPath: 'config',
      files: [
        {path: 'state.js', type: 'state'},
    },
    services: {
      lib: 'vue',
      rootPath: 'services',
      files: [
        'contacts-api.js'
      ]
    },
    store: {
      lib: 'vuex',
      rootPath: 'store',
      files: [
        {path: 'state.js', type: 'state'},
        {path: 'actions.js', type: 'actions'},
        {path: 'mutations.js', type: 'mutations'}
      ]
    }
    ui: {
      lib: 'bootstrap',
      rootPath: 'ui/bootstrap',
      files: [
        'details.html',
        'item.html',
        'list.html'
      ]        
    }
  }  
}

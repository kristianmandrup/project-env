export default {
  vueApp: {
    'project.env.json': `
    `,
    client: {
      components: {
        // App.vue
        'App.vue': `
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  font-size: 2rem;
}
</style>  
        `
      },
      router: {
        // index.js
        'index.js': `
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
        `
      },
      store: {
        // index.js
        'index.js': `
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state';
import mutations from './mutations';
import actions from './actions';

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
        `
      },
      views: {
      },
      // app.js
      'app.js': `
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export {app, router, store}      
      `,
      // index.js
      'index.js': `
import {app} from './app'
app.$mount('#app')
      `      
    },
    'package.json': `
    `
  }
}


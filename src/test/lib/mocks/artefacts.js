export default {
  contacts: {
    'contacts':  {
      'artefact.json': `
        {
          "name": "my-project",
          "env": {
            "ui": {
              "bootstrap": "2.0.1"
            }
          }
        }
      `,
      'view-models': {
        'map.json': `
          {
            "vue": {
              "versions": {
                "^2.0.0": {
                  "path": "./view-models/vue"
                }                    
              }                  
            }
          }
        `,
        'vue': {
          'details.js': `
            export default class Details {};
          `,
          'item.js': `
            export default class Item {};
          `,
          'list.js': `
            export default class List {};
          `,          
        }
      }
      'ui': {
        'map.json': `
          {
            "bootstrap": {
              "versions": {
                "^2.0.0": {
                  "path": "./ui/bootstrap"
                }                    
              }                  
            }
          }
        `,
        'bootstrap': {
          'details.html': `<template><h1>{{title}}</h1></template>`,
          'item.html': `<template><h3>{{name}}</h3></template>`,
          'list.html': `<template><ul v-for="item in items"><contact-item contact="{{contact}}"></contact-item></ul></template>`
        }            
      }
    }          
  }  
}
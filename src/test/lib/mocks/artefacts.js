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
          'details.html': `<template><h1>{{message}}</h1></template>`
        }            
      }
    }          
  }  
}
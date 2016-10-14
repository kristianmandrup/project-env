# project-env

Project environment library for node projects. Can be used to collect stats on the project 
and compare with artefact environment requirements. This can be used to determine if a given artefact is suitable for the project.

The project uses the [semver](https://github.com/npm/node-semver) library to determine if the project environment 
satisfies the artefact requirements.

See [ES6 with babel 6 and webpack](http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/)

## Usage
- install/configure
- test

### Troubleshoot

Try re-installing *babel-cli*: `npm install --save-dev babel-cli`

### Install

- clone this repo
- `npm install` - install dependencies 

## Usage

Current this library includes the following:
- Create project environment config
- Semantic version environment check

### Semantic version environment check

Project environment

```js
{
  "name": "my-vue-app",
  "env": {
    "app": {
      "vue": "2.0.1"
    },
    "test": {
      "mocha": "2.8.9"
    },
    "ui": {
      "bootstrap": "3.2.1"
    }
  }
}
```

Artefact environment requirements

```js
{
  "name": "contacts",
  "env": {
    "app": {
      "vue": "^1.0.0"
    },
    "test": {
      "mocha": "^3.0.0",
      "nightwatch": "^0.8.0"
    },
    "ui": {
      "bootstrap": "^3.2.0"
    },
    "styling": {
      "css": "^3",
      "less": "^2.0.1",
      "sass": "^3.4.0"
    }    
  }  
}
```

```js
{ 
  app: { vue: false }, 
  test: { mocha: false }, 
  ui: { bootstrap: true }, 
  styling: {} 
}
```

We can then pass these environments to the `SemverChecker` and have it match the artefact on the project, to
see how well the artefact would fit in the project environment.  

```js
const SemverChecker = require('project-env').SemverChecker;

let artefactEnv = fixtures.artefacts.components.contacts.env;
let projectEnv = fixtures.projects.vueApp.env;

let semVerChecker = new SemverChecker(artefactEnv);

// { app: { vue: false }, test: { mocha: false }, ui: { bootstrap: true }, styling: {} }
let result = semVerChecker.satisfies(projectEnv);
```

### Create Project environment config

We create a project configuration with the project `rootPath` and the `package.json` object.   

```js
let prjPath = path.join(__dirname, 'my-project');
let project = {
  config: {
    rootPath: path.resolve(prjPath)
    package: require('./my-project/package.json'),
  }
}

const { buildEnv } = require('project-env').project;
// { app: { vue: '2.0.1' } }

// build project environment config from package.json and installed module versions
let project.env = await buildEnv(project.config);
```

### Artefact project matcher

See in `src/artefact`

```js
let artefact = await artefactor.load(rootPath);
// { '^2.0.0': { path: './ui/bootstrap' } }
let matchingUi = await artefact.filesFor({type: 'ui', lib: 'bootstrap', version: '2.3.1'});
```

### Pipeline

The pipeline takes a `fileMap` and a `project` configuration. 
It then uses pre-registered *read steps* to map the file map into a `registry` with *file descriptors*. 
The pipeline then traverses the `registry`. For each entry, it performs *write steps* to map an entry into a *file action descriptor*. 
These actions are then performed on the target destination, usually an application project on disk.  

Pipeline example:  

```js
let fileMap = {
  'view-models': {
    lib: 'vue',
    rootPath: 'view-models',
    files: [
      'item.js',
      'details.js', 
      'list.js'
    ]
  },
  ui: {
    lib: 'bootstrap',
    rootPath: 'ui/bootstrap'
    files: [
      'details.html',
      'item.html',
      'list.html'
    ]        
  }
}

let project = {
  rootPath: 'vueApp',
  env: {
    app: {
      vue: '2.0.1'
    },
    viewModels: {
      vue: '2.0.1'
    },
    ui: {
      bootstrap: '3.2.1'
    }
  }
}

const pipeline = new Pipeline({project, fileMap});
pipeline.execute();
```

### Mock file system

See `src/test/lib/file-mock.spec.js` on how to simulate files in a file system for testing.

### Build

`npm run build` - builds `/src` folder and puts resulting ES5 `.js` files in `/dist`

### Auto build

`npm run watch` - builds `/src` and watches for changes to `/src` files for auto-build!

### Run Test or Test suite

To run the tests, the Koa server app must be running...

`npm test` (runs test command in `Makefile`)

## License

MIT
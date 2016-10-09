# project-env

Project environment library for node projects. Can be used to collect stats on the project 
and compare with artefact environment requirements. This can be used to determine if a given artefact is suitable for the project.

The project uses the [semver](https://github.com/npm/node-semver) library to determine if the project environment 
satisfies the artefact requirements.

## Usage
- install/configure
- test

### Install

- clone this repo
- `npm install` - install dependencies 

## Usage

Assuming we have the following project environment:

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

And the following artefact environment requirements:

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

We can then pass these environments to the `SemverChecker` and have it match the artefact on the project, to
see how well the artefact would fit in the project environment.  

```js
let artefactEnv = fixtures.artefacts.components.contacts.env;
let projectEnv = fixtures.projects.vueApp.env;

let semVerChecker = new SemverChecker(artefactEnv);

// { app: { vue: false }, test: { mocha: false }, ui: { bootstrap: true }, styling: {} }
let result = semVerChecker.satisfies(projectEnv);
```

### Build

`npm run build` - builds `/src` folder and puts resulting ES5 `.js` files in `/dist`

### Auto build

`npm run watch` - builds `/src` and watches for changes to `/src` files for auto-build!

### Run Test or Test suite

To run the tests, the Koa server app must be running...

`npm test` (runs test command in `Makefile`)

## License

MIT
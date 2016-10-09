# Creating and registering artefacts
All the above looks nice and convenient in theory, but how do we go about creating and registering artefacts without this becoming a huge burden for the developer.
We want to make this as easy and simple as possible. Let’s go through some examples and see what we can do.

### Create and register component
Let’s imagine we have the following Vue2 component:

```
/contacts
  section.vue
  list.vue

The component is currently being used in a project using:

```
UI: bootstrap 3.x
Services: Horizon
Tests
  Unit: mocha 2.x
  E2E: Nightwatch 1.x
```

We would like to use these project configurations for our initial registration.

```
map.json
/components
/vue
  section.js
  section.html
  list.js
  list.html
/tests
/preview
/docs
```

The components registration will require that the .vue files are split into multiple files. This is essentially the reverse of the file aggregation customisation, shown for Custom Install transformations.
The local vue component generator needs to understand how to take local artefact files and the project model and turn them into components ready for registration. Each App platform thus needs a suitable adapter. The generator also needs to be intelligent enough to aggregate tests, docs etc. related to the component. The simplest case is when the tests are co-located with the component itself. This will be the recommended approach in the future. 

```
/contacts
  section.vue
  list.vue
/services
/tests
/unit
/e2e
/docs
```

If `tests` etc. are not co-located, we need to aggregate them from global (root) folders for each file type, ie. essentially the reverse of the installation.

### Project model

The project model is similar to the "environment" entry in the artefact.json and they are intended to be matched to see if the artefact is suitable for installation in the given project. 

```js
{
  "app": {
    "vue": "^2.0"
  },
  "test": {
    "unit": {
      "mocha": "^2.0",
      "qunit": "^1.0"
    },
    "e2e": {
      "nightwatch": "^1.0"
    }
  }
}
```

Notice that this project uses two different unit test libaries, `mocha` and `qunit`. Perhaps it is being transitioned 
from one to the other or perhaps the team has allowed for multiple preferences. 

In order for the registration process to work correctly, it needs to determine which files are which. 

We need a file analyser which is used to determine the file type of each file processed. 
The file analyser can use either the file path, the file content or a combination.
We then use a similar *pipeline* as used for installation, with a virtual registry etc. 

By convention we could use *metadata* in the files to make it clear or use *regexp* to scan for 
*keywords* such as the library name:

file: `tests/contacts/list.spec.js`

```js
// type: test/mocha
const expect = chai.expect;
…
```

file: `tests/contacts/item-test.js`

```js
// type: test/qunit

require(‘qunit’);
…
```

The registration should go through 2 phases. First we generate a full component layout for registration 
in a special folder such as `/registration/components/contacts`. 

```
> artefactor generate -C contacts
> artefactor generate component ./components/contacts
```

The generator can ask a number of questions such as the description, author etc. using defaults for whatever can 
be gathered from the project, such as the package.json file, project model etc.
The developer can choose to git ignore the registration folder since it is not part of the project, 
but gives him/her a chance to do final edits before publishing it to a repo.

```
/registration
  - /components
    - /contacts
      artefact.json
      map.json
      /ui
        /bootstrap
          - section.html
      /view-models
        - section.js
      /tests
      …
  - /plugins
```

## Generate/export component

The generator needs to work as follows: Determine which libraries are used for the:

```
app
ui
tests/unit
tests/e2e
…
```

For javascript projects this info should be available via the `package.json` and then looking up the exact version 
in the `node_modules/[library name]/package.json`

Only a few (most popular) app, ui and test libraries will be supported initially.
The generator should have a standard strategy for each app library, which the developer can further customise as 
needed to generate the correct component export for registration.
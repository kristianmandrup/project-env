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

### Build

`npm run build` - builds `/src` folder and puts resulting ES5 `.js` files in `/dist`

### Auto build

`npm run watch` - builds `/src` and watches for changes to `/src` files for auto-build!

### Run Test or Test suite

To run the tests, the Koa server app must be running...

`npm test` (runs test command in `Makefile`)

## License

MIT
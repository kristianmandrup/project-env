const semver = require('semver');

export default class SemverChecker {
  constructor(environment) {
    this.environment = environment;
  }

  satisfies(key, version) {
    return semver.satisfies(version, environment[key]);
  }
}

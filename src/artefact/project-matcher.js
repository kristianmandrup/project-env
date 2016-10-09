export default class ProjectMatcher {
  constructor(artefact, projectEnv) {
    this.projectEnv = projectEnv;
    this.artefactEnv = artefact.env;    
  }

  get semverChecker() {
    return new SemverChecker(this.artefactEnv);
  }

  // uses SemVerChecker class to perform match
  // determines how well the artefact env matches the project env
  // returns map
  matches() {
    return this.semverChecker.satisfies(this.projectEnv);
  }

  // uses matches map
  // returns the files suitable for the project environment
  filesFor() {
    // this.matches
  }
}

// use Javascript AST
// https://blog.redradix.com/working-with-javascript-ast/

const acorn = require('acorn');  
const esrecurse = require('esrecurse');    
const escodegen = require('escodegen');  

// Use http://astexplorer.net/
export default class JavaScripter {
  constructor(srcCode, traverser, opts = {}) {
    this.srcCode = srcCode;
    this.ast = acorn.parse(this.code.source);
    this.traverser = traverser;
  }

  traverse() {
    esrecurse.visit(this.ast, this.traverser);    
  }

  transform() {
    return escodegen.generate(this.ast);
  }
}
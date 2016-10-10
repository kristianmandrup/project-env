// http://jsonpath.com/
// https://www.npmjs.com/package/json-path

// var p = jpath.create("#/store/book[*][@lt10][@format]");

// var res = p.resolve(data, {
//     lt10: function(obj, accum) {
//         if (typeof obj.price === 'number' && obj.price < 10)
//             accum.push(obj);
//         return accum;
//     },

//     format: function(obj, accum) {
//         accum.push(obj.title.concat(
//             ": $", obj.price
//             ));
//         return accum;
//     }

// });
// expect(res).to.contain("Sayings of the Century: $8.95");
// expect(res).to.contain("Moby Dick: $8.99");

// Identify indentation: https://www.npmjs.com/package/identify-indent

// Perhaps use Javascript AST
// https://blog.redradix.com/working-with-javascript-ast/
// var acorn = require('acorn');  
// var esrecurse = require('esrecurse');  
// var t = require('ast-types').builders;  
// var escodegen = require('escodegen');  

export default class Transformer {
  constructor(descriptor) {
    this.descriptor = descriptor;    
  }

  write() {
  }  
}

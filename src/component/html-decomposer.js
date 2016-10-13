const createParser = require('./parser/index');

let v = function (x) {
}

console.log('createParser', createParser, 'V:', v)

export default function parsePage(page, opts = {}) {
  return new Promise((resolve, reject) => {
    const parser = createParser(resolve, reject, opts);
    parser.write(page);
    parser.end();
  })
}

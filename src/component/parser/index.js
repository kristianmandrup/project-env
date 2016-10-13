const htmlparser = require('htmlparser2');
const onEvent = require('./on');

let defaultCtx = {
  node: {}, 
  components: {},
  children: 0,
  currentLv: 0,
  lastLv: 0,
  opened: false, 
  maxLevel: 0,
  startComponent: false,
  ignoreTags: ['head', 'meta', 'link', 'title']
}

export default function(resolve, reject, opts = {}) {
  opts.on = opts.on || {}; 
  let ctx = Object.assign(defaultCtx, opts.ctx || {});
  let parserOpts = opts.parserOpts || {decodeEntities: true};

  // TODO: add for other events...
  let on = {
    openTag: opts.on.openTag || onEvent.openTag,
    closeTag: opts.on.closeTag || onEvent.closeTag,
    attribute: opts.on.attribute || onEvent.attribute
  } 

  return new htmlparser.Parser({
      onopentag: on.openTag(ctx),
      onattribute: on.attribute(ctx),
      onclosetag: on.closeTag(ctx),
      ontext: (text) => {
        ctx.node.text = text;
      },
      onerror: (err) => {
        console.log('ERROR', err)
        reject(err);
      },
      onend: () => {
        console.log('MAX level', ctx.maxLevel);
        console.log('return', ctx.components);
        resolve(ctx.components);
      }
  }, parserOpts);
}

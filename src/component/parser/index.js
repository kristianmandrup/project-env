const htmlparser = require('htmlparser2');
const onEvent = require('./on');

let defaultCtx = {
  node: {}, 
  parent: {},
  components: {},
  children: 0,
  currentLv: 0,
  maxLvAllowed: 20,
  lastLv: 0,
  opened: false, 
  maxLevelFound: 0,
  startComponent: false,
  ignoreTags: ['head', 'meta', 'link', 'title']
}

// TODO: wrap in higher level Object with more/better event handlers:
// - onIncLevel(currentlevel)
// - onDecLevel(currentlevel)
// - onSibling(name, attribs)
// - onFirstChild(name, attribs)

export default function(resolve, reject, opts = {}) {
  opts.on = opts.on || {}; 
  let ctx = Object.assign(defaultCtx, opts.ctx || {});
  let parserOpts = opts.parserOpts || {decodeEntities: true};

  // TODO: generate this map!
  let on = {
    openTag: opts.on.openTag || onEvent.openTag,
    closeTag: opts.on.closeTag || onEvent.closeTag,
    attribute: opts.on.attribute || onEvent.attribute,
    text: opts.on.text || onEvent.text,
    error: opts.on.error || onEvent.error,
    end: opts.on.end || onEvent.end
  } 

  return new htmlparser.Parser({
      onopentag: on.openTag(ctx),
      onattribute: on.attribute(ctx),
      onclosetag: on.closeTag(ctx),
      ontext: on.text(ctx),
      onerror: on.error(ctx, reject),
      onend: on.end(ctx, resolve)
  }, parserOpts);
}
